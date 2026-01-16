import mongoose from "mongoose";

// Variant sub-schema for product options
const variantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Variant name is required"],
    trim: true,
    maxlength: 100,
  },
  value: {
    type: String,
    required: [true, "Variant value is required"],
    trim: true,
    maxlength: 100,
  },
  priceModifier: {
    type: Number,
    default: 0,
    min: [0, "Price modifier cannot be negative"],
  },
  isDefault: {
    type: Boolean,
    default: false,
  },
});

// Nutrition information sub-schema (for food products)
const nutritionSchema = new mongoose.Schema({
  calories: {
    type: Number,
    min: 0,
  },
  protein: {
    type: Number,
    min: 0,
  },
  carbohydrates: {
    type: Number,
    min: 0,
  },
  fat: {
    type: Number,
    min: 0,
  },
  fiber: {
    type: Number,
    min: 0,
  },
  sugar: {
    type: Number,
    min: 0,
  },
  sodium: {
    type: Number,
    min: 0,
  },
  servingSize: {
    type: String,
    trim: true,
    maxlength: 50,
  },
  servingsPerContainer: {
    type: Number,
    min: 1,
  },
});

// Product specifications sub-schema (for non-food products)
const specificationsSchema = new mongoose.Schema({
  brand: {
    type: String,
    trim: true,
    maxlength: 100,
  },
  model: {
    type: String,
    trim: true,
    maxlength: 100,
  },
  color: {
    type: String,
    trim: true,
    maxlength: 50,
  },
  size: {
    type: String,
    trim: true,
    maxlength: 50,
  },
  weight: {
    type: Number,
    min: 0,
  },
  dimensions: {
    length: Number,
    width: Number,
    height: Number,
    unit: {
      type: String,
      enum: ["cm", "inch", "m"],
      default: "cm",
    },
  },
  material: {
    type: String,
    trim: true,
    maxlength: 100,
  },
  warranty: {
    type: String,
    trim: true,
    maxlength: 100,
  },
});

// Inventory tracking sub-schema
const inventorySchema = new mongoose.Schema({
  quantity: {
    type: Number,
    required: [true, "Quantity is required"],
    min: [0, "Quantity cannot be negative"],
    default: 0,
  },
  lowStockThreshold: {
    type: Number,
    default: 10,
    min: [0, "Low stock threshold cannot be negative"],
  },
  sku: {
    type: String,
    trim: true,
    uppercase: true,
    index: true,
  },
  barcode: {
    type: String,
    trim: true,
    index: true,
  },
  batchNumber: {
    type: String,
    trim: true,
  },
  expiryDate: {
    type: Date,
  },
  supplier: {
    type: String,
    trim: true,
    maxlength: 200,
  },
});

// Main product schema
const productSchema = new mongoose.Schema(
  {
    // Basic Information
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
      maxlength: 200,
      index: true,
    },
    description: {
      type: String,
      required: [true, "Product description is required"],
      trim: true,
      maxlength: 2000,
    },
    shortDescription: {
      type: String,
      trim: true,
      maxlength: 500,
    },

    // Store Reference
    storeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Store",
      required: [true, "Store ID is required"],
      index: true,
    },

    // Categorization
    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
      maxlength: 100,
      index: true,
    },
    subcategory: {
      type: String,
      trim: true,
      maxlength: 100,
      index: true,
    },
    tags: [
      {
        type: String,
        trim: true,
        lowercase: true,
        maxlength: 50,
      },
    ],

    // Pricing
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
      index: true,
    },
    originalPrice: {
      type: Number,
      min: [0, "Original price cannot be negative"],
    },
    discount: {
      type: Number,
      default: 0,
      min: [0, "Discount cannot be negative"],
      max: [100, "Discount cannot exceed 100%"],
    },
    currency: {
      type: String,
      default: "USD",
      uppercase: true,
      maxlength: 3,
    },
    taxRate: {
      type: Number,
      default: 0,
      min: [0, "Tax rate cannot be negative"],
      max: [50, "Tax rate cannot exceed 50%"],
    },

    // Product Media
    images: [
      {
        url: {
          type: String,
          required: [true, "Image URL is required"],
          trim: true,
        },
        alt: {
          type: String,
          trim: true,
          maxlength: 200,
        },
        isPrimary: {
          type: Boolean,
          default: false,
        },
      },
    ],
    video: {
      type: String,
      trim: true,
    },

    // Product Variants
    variants: [variantSchema],

    // Product Details
    nutrition: nutritionSchema,
    specifications: specificationsSchema,

    // Inventory Management
    inventory: inventorySchema,

    // Product Attributes
    isVegetarian: {
      type: Boolean,
      default: false,
    },
    isVegan: {
      type: Boolean,
      default: false,
    },
    isGlutenFree: {
      type: Boolean,
      default: false,
    },
    isOrganic: {
      type: Boolean,
      default: false,
    },
    isHalal: {
      type: Boolean,
      default: false,
    },
    isKosher: {
      type: Boolean,
      default: false,
    },
    isDairyFree: {
      type: Boolean,
      default: false,
    },
    isNutFree: {
      type: Boolean,
      default: false,
    },

    // Age and Safety
    minimumAge: {
      type: Number,
      min: 0,
      max: 100,
    },
    requiresIDVerification: {
      type: Boolean,
      default: false,
    },
    isPrescriptionRequired: {
      type: Boolean,
      default: false,
    },
    isFragile: {
      type: Boolean,
      default: false,
    },

    // Availability
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
    isAvailable: {
      type: Boolean,
      default: true,
      index: true,
    },
    availableFrom: {
      type: Date,
      default: Date.now,
    },
    availableTo: {
      type: Date,
    },

    // Preparation and Delivery
    preparationTime: {
      type: Number, // in minutes
      default: 15,
      min: [1, "Preparation time must be at least 1 minute"],
      max: [240, "Preparation time cannot exceed 240 minutes"],
    },

    // Ratings and Reviews
    averageRating: {
      type: Number,
      min: 1,
      max: 5,
      index: true,
    },
    totalReviews: {
      type: Number,
      default: 0,
      min: 0,
    },

    // Sales Statistics
    totalSold: {
      type: Number,
      default: 0,
      min: 0,
    },
    totalRevenue: {
      type: Number,
      default: 0,
      min: 0,
    },

    // SEO
    slug: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    metaTitle: {
      type: String,
      trim: true,
      maxlength: 100,
    },
    metaDescription: {
      type: String,
      trim: true,
      maxlength: 300,
    },

    // Special Offers
    isFeatured: {
      type: Boolean,
      default: false,
      index: true,
    },
    isOnSale: {
      type: Boolean,
      default: false,
      index: true,
    },
    saleStartDate: {
      type: Date,
    },
    saleEndDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// Compound indexes for performance
productSchema.index({ storeId: 1, isActive: 1, isAvailable: 1 });
productSchema.index({ categoryId: 1, subcategoryId: 1, isActive: 1 });
productSchema.index({ price: 1, isActive: 1 });
productSchema.index({ averageRating: -1, totalReviews: -1 });
productSchema.index({ totalSold: -1, isActive: 1 });
productSchema.index({ createdAt: -1, isActive: 1 });
productSchema.index({ isFeatured: 1, isActive: 1 });
productSchema.index({ isOnSale: 1, isActive: 1 });

// Text search index
productSchema.index({
  name: "text",
  description: "text",
  shortDescription: "text",
  tags: "text",
  category: "text",
  subcategory: "text",
});

// Sparse indexes for optional fields
productSchema.index({ "inventory.sku": 1 }, { sparse: true });
productSchema.index({ "inventory.barcode": 1 }, { sparse: true });

// Pre-save middleware
productSchema.pre("save", function (next) {
  // Generate slug from name if not provided
  if (!this.slug) {
    this.slug =
      this.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "") +
      "-" +
      this._id.toString().slice(-6);
  }

  // Calculate discount if original price is set
  if (this.originalPrice && this.originalPrice > this.price) {
    this.discount = Math.round(
      ((this.originalPrice - this.price) / this.originalPrice) * 100
    );
  }

  // Set sale status based on dates
  const now = new Date();
  if (this.saleStartDate && this.saleEndDate) {
    this.isOnSale = now >= this.saleStartDate && now <= this.saleEndDate;
  }

  // Ensure only one primary image
  if (this.images && this.images.length > 0) {
    const primaryImages = this.images.filter((img) => img.isPrimary);
    if (primaryImages.length > 1) {
      this.images.forEach((img, index) => {
        if (index > 0) img.isPrimary = false;
      });
    } else if (primaryImages.length === 0) {
      this.images[0].isPrimary = true;
    }
  }

  next();
});

// Instance methods
productSchema.methods.isInStock = function () {
  return this.inventory.quantity > 0 && this.isAvailable && this.isActive;
};

productSchema.methods.isLowStock = function () {
  return this.inventory.quantity <= this.inventory.lowStockThreshold;
};

productSchema.methods.updateInventory = function (
  quantityChange,
  operation = "subtract"
) {
  if (operation === "add") {
    this.inventory.quantity += quantityChange;
  } else {
    this.inventory.quantity = Math.max(
      0,
      this.inventory.quantity - quantityChange
    );
  }
  return this.save();
};

productSchema.methods.updateRating = function (newRating) {
  if (this.averageRating && this.totalReviews > 0) {
    this.averageRating =
      (this.averageRating * this.totalReviews + newRating) /
      (this.totalReviews + 1);
  } else {
    this.averageRating = newRating;
  }
  this.totalReviews += 1;
  return this.save();
};

productSchema.methods.updateSalesStats = function (quantity, amount) {
  this.totalSold += quantity;
  this.totalRevenue += amount;
  return this.save();
};

productSchema.methods.setFeatured = function (featured = true) {
  this.isFeatured = featured;
  return this.save();
};

productSchema.methods.setOnSale = function (
  startDate,
  endDate,
  salePrice = null
) {
  this.saleStartDate = startDate;
  this.saleEndDate = endDate;
  if (salePrice) {
    this.originalPrice = this.price;
    this.price = salePrice;
  }
  return this.save();
};

// Static methods
productSchema.statics.findByStore = function (storeId, page = 1, limit = 20) {
  const skip = (page - 1) * limit;
  return this.find({
    storeId,
    isActive: true,
    isAvailable: true,
  })
    .sort({ isFeatured: -1, createdAt: -1 })
    .skip(skip)
    .limit(limit);
};

productSchema.statics.findByCategory = function (
  categoryId,
  page = 1,
  limit = 20
) {
  const skip = (page - 1) * limit;
  return this.find({
    categoryId,
    isActive: true,
    isAvailable: true,
  })
    .populate("categoryId", "name path")
    .sort({ averageRating: -1, totalSold: -1 })
    .skip(skip)
    .limit(limit);
};

productSchema.statics.searchProducts = function (
  searchTerm,
  filters = {},
  page = 1,
  limit = 20
) {
  const skip = (page - 1) * limit;

  let query = {
    $text: { $search: searchTerm },
    isActive: true,
    isAvailable: true,
    ...filters,
  };

  return this.find(query, { score: { $meta: "textScore" } })
    .sort({
      score: { $meta: "textScore" },
      averageRating: -1,
      totalSold: -1,
    })
    .skip(skip)
    .limit(limit);
};

productSchema.statics.getFeaturedProducts = function (limit = 10) {
  return this.find({
    isFeatured: true,
    isActive: true,
    isAvailable: true,
  })
    .sort({ averageRating: -1, totalSold: -1 })
    .limit(limit);
};

productSchema.statics.getTopSellingProducts = function (
  storeId = null,
  limit = 10
) {
  const query = { isActive: true, isAvailable: true };
  if (storeId) query.storeId = storeId;

  return this.find(query)
    .sort({ totalSold: -1, averageRating: -1 })
    .limit(limit);
};

productSchema.statics.getProductsOnSale = function (
  storeId = null,
  limit = 20
) {
  const query = {
    isOnSale: true,
    isActive: true,
    isAvailable: true,
  };
  if (storeId) query.storeId = storeId;

  return this.find(query)
    .sort({ discount: -1, averageRating: -1 })
    .limit(limit);
};

productSchema.statics.getLowStockProducts = function (storeId) {
  return this.find({
    storeId,
    isActive: true,
    $expr: { $lte: ["$inventory.quantity", "$inventory.lowStockThreshold"] },
  }).sort({ "inventory.quantity": 1 });
};

productSchema.statics.getProductAnalytics = function (
  productId,
  startDate,
  endDate
) {
  return this.aggregate([
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
};

const Product = mongoose.model("Product", productSchema);

export default Product;
