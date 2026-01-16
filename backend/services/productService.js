import Product from "../models/Product.js";
import mongoose from "mongoose";

/**
 * Product Service
 * Contains all business logic for product operations
 */
class ProductService {
  /**
   * Check if a product is in stock
   * @param {Object} product - Product document
   * @returns {Boolean}
   */
  static isInStock(product) {
    return (
      product.inventory.quantity > 0 && product.isAvailable && product.isActive
    );
  }

  /**
   * Check if a product is low in stock
   * @param {Object} product - Product document
   * @returns {Boolean}
   */
  static isLowStock(product) {
    return product.inventory.quantity <= product.inventory.lowStockThreshold;
  }

  /**
   * Update product inventory
   * @param {String} productId - Product ID
   * @param {Number} quantityChange - Quantity to add/subtract
   * @param {String} operation - 'add' or 'subtract'
   * @returns {Promise<Object>}
   */
  static async updateInventory(
    productId,
    quantityChange,
    operation = "subtract"
  ) {
    const product = await Product.findById(productId);
    if (!product) {
      throw new Error("Product not found");
    }

    if (operation === "add") {
      product.inventory.quantity += quantityChange;
    } else {
      product.inventory.quantity = Math.max(
        0,
        product.inventory.quantity - quantityChange
      );
    }

    return await product.save();
  }

  /**
   * Update product rating
   * @param {String} productId - Product ID
   * @param {Number} newRating - New rating to add
   * @returns {Promise<Object>}
   */
  static async updateRating(productId, newRating) {
    const product = await Product.findById(productId);
    if (!product) {
      throw new Error("Product not found");
    }

    if (product.averageRating && product.totalReviews > 0) {
      product.averageRating =
        (product.averageRating * product.totalReviews + newRating) /
        (product.totalReviews + 1);
    } else {
      product.averageRating = newRating;
    }
    product.totalReviews += 1;

    return await product.save();
  }

  /**
   * Update sales statistics
   * @param {String} productId - Product ID
   * @param {Number} quantity - Quantity sold
   * @param {Number} amount - Revenue amount
   * @returns {Promise<Object>}
   */
  static async updateSalesStats(productId, quantity, amount) {
    const product = await Product.findById(productId);
    if (!product) {
      throw new Error("Product not found");
    }

    product.totalSold += quantity;
    product.totalRevenue += amount;

    return await product.save();
  }

  /**
   * Set product as featured
   * @param {String} productId - Product ID
   * @param {Boolean} featured - Featured status
   * @returns {Promise<Object>}
   */
  static async setFeatured(productId, featured = true) {
    const product = await Product.findById(productId);
    if (!product) {
      throw new Error("Product not found");
    }

    product.isFeatured = featured;
    return await product.save();
  }

  /**
   * Set product on sale
   * @param {String} productId - Product ID
   * @param {Date} startDate - Sale start date
   * @param {Date} endDate - Sale end date
   * @param {Number} salePrice - Optional sale price
   * @returns {Promise<Object>}
   */
  static async setOnSale(productId, startDate, endDate, salePrice = null) {
    const product = await Product.findById(productId);
    if (!product) {
      throw new Error("Product not found");
    }

    product.saleStartDate = startDate;
    product.saleEndDate = endDate;

    if (salePrice) {
      product.originalPrice = product.price;
      product.price = salePrice;
    }

    return await product.save();
  }

  /**
   * Find products by store
   * @param {String} storeId - Store ID
   * @param {Number} page - Page number
   * @param {Number} limit - Items per page
   * @returns {Promise<Array>}
   */
  static async findByStore(storeId, page = 1, limit = 20) {
    const skip = (page - 1) * limit;
    return await Product.find({
      storeId,
      isActive: true,
      isAvailable: true,
    })
      .sort({ isFeatured: -1, createdAt: -1 })
      .skip(skip)
      .limit(limit);
  }

  /**
   * Find products by category
   * @param {String} category - Category name
   * @param {Number} page - Page number
   * @param {Number} limit - Items per page
   * @returns {Promise<Array>}
   */
  static async findByCategory(category, page = 1, limit = 20) {
    const skip = (page - 1) * limit;
    return await Product.find({
      category,
      isActive: true,
      isAvailable: true,
    })
      .sort({ averageRating: -1, totalSold: -1 })
      .skip(skip)
      .limit(limit);
  }

  /**
   * Get featured products
   * @param {Number} limit - Number of products to return
   * @returns {Promise<Array>}
   */
  static async getFeaturedProducts(limit = 10) {
    return await Product.find({
      isFeatured: true,
      isActive: true,
      isAvailable: true,
    })
      .sort({ averageRating: -1, totalSold: -1 })
      .limit(limit);
  }

  /**
   * Get top selling products
   * @param {String} storeId - Optional store ID filter
   * @param {Number} limit - Number of products to return
   * @returns {Promise<Array>}
   */
  static async getTopSellingProducts(storeId = null, limit = 10) {
    const query = { isActive: true, isAvailable: true };
    if (storeId) query.storeId = storeId;

    return await Product.find(query)
      .sort({ totalSold: -1, averageRating: -1 })
      .limit(limit);
  }

  /**
   * Get products on sale
   * @param {String} storeId - Optional store ID filter
   * @param {Number} limit - Number of products to return
   * @returns {Promise<Array>}
   */
  static async getProductsOnSale(storeId = null, limit = 20) {
    const query = {
      isOnSale: true,
      isActive: true,
      isAvailable: true,
    };
    if (storeId) query.storeId = storeId;

    return await Product.find(query)
      .sort({ discount: -1, averageRating: -1 })
      .limit(limit);
  }

  /**
   * Get low stock products
   * @param {String} storeId - Store ID
   * @returns {Promise<Array>}
   */
  static async getLowStockProducts(storeId) {
    return await Product.find({
      storeId,
      isActive: true,
      $expr: { $lte: ["$inventory.quantity", "$inventory.lowStockThreshold"] },
    }).sort({ "inventory.quantity": 1 });
  }

  /**
   * Get product analytics
   * @param {String} productId - Product ID
   * @param {Date} startDate - Start date for analytics
   * @param {Date} endDate - End date for analytics
   * @returns {Promise<Object>}
   */
  static async getProductAnalytics(productId, startDate, endDate) {
    return await Product.aggregate([
      { $match: { _id: mongoose.Types.ObjectId(productId) } },
      {
        $lookup: {
          from: "orders",
          localField: "_id",
          foreignField: "items.productId",
          pipeline: [
            {
              $match: {
                createdAt: { $gte: startDate, $lte: endDate },
                status: "delivered",
              },
            },
            { $unwind: "$items" },
            {
              $match: {
                "items.productId": mongoose.Types.ObjectId(productId),
              },
            },
          ],
          as: "orderItems",
        },
      },
      {
        $project: {
          name: 1,
          category: 1,
          price: 1,
          totalOrders: { $size: "$orderItems" },
          totalQuantitySold: { $sum: "$orderItems.items.quantity" },
          totalRevenue: { $sum: "$orderItems.items.totalPrice" },
          averageRating: 1,
          totalReviews: 1,
        },
      },
    ]);
  }

  /**
   * Create a new product
   * @param {Object} productData - Product data
   * @returns {Promise<Object>}
   */
  static async createProduct(productData) {
    const product = new Product(productData);
    return await product.save();
  }

  /**
   * Update a product
   * @param {String} productId - Product ID
   * @param {Object} updateData - Data to update
   * @returns {Promise<Object>}
   */
  static async updateProduct(productId, updateData) {
    return await Product.findByIdAndUpdate(productId, updateData, {
      new: true,
      runValidators: true,
    });
  }

  /**
   * Delete a product (soft delete)
   * @param {String} productId - Product ID
   * @returns {Promise<Object>}
   */
  static async deleteProduct(productId) {
    return await Product.findByIdAndUpdate(
      productId,
      { isActive: false },
      { new: true }
    );
  }

  /**
   * Get product by ID with store information
   * @param {String} productId - Product ID
   * @returns {Promise<Object>}
   */
  static async getProductById(productId) {
    return await Product.findById(productId)
      .populate("storeId", "name address phone email")
      .populate("categoryId", "name path");
  }

  /**
   * Basic search products (without advanced features)
   * @param {String} searchTerm - Search term
   * @param {Object} filters - Additional filters
   * @param {Number} page - Page number
   * @param {Number} limit - Items per page
   * @returns {Promise<Array>}
   */
  static async searchProducts(searchTerm, filters = {}, page = 1, limit = 20) {
    const skip = (page - 1) * limit;

    let query = {
      $text: { $search: searchTerm },
      isActive: true,
      isAvailable: true,
      ...filters,
    };

    return await Product.find(query, { score: { $meta: "textScore" } })
      .sort({
        score: { $meta: "textScore" },
        averageRating: -1,
        totalSold: -1,
      })
      .skip(skip)
      .limit(limit);
  }
}

export default ProductService;
