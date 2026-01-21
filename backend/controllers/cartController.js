import Cart from "../models/Cart.js";
import Product from "../models/Product.js";
import Store from "../models/Store.js";

/**
 * Get user's active cart
 * GET /api/cart
 */
export const getCart = async (req, res) => {
  try {
    const userId = req.user.id;

    // Use findOneAndUpdate with upsert to avoid duplicate key errors
    let cart = await Cart.findOneAndUpdate(
      { userId },
      { $setOnInsert: { userId, status: "active" } },
      { upsert: true, new: true, setDefaultsOnInsert: true },
    )
      .populate("items.productId", "name images price discount isAvailable")
      .populate("items.storeId", "name slug")
      .populate("storeId", "name logo address");

    res.json({
      success: true,
      data: cart,
    });
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch cart",
      error: error.message,
    });
  }
};

/**
 * Add item to cart
 * POST /api/cart/items
 */
export const addToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const {
      productId,
      storeId,
      quantity = 1,
      selectedVariant,
      customizations,
      specialInstructions,
    } = req.body;

    // Validate required fields
    if (!productId || !storeId) {
      return res.status(400).json({
        success: false,
        message: "Product ID and Store ID are required",
      });
    }

    // Get product details
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    if (!product.isAvailable || !product.isActive) {
      return res.status(400).json({
        success: false,
        message: "Product is not available",
      });
    }

    // Get store details
    const store = await Store.findById(storeId);
    if (!store) {
      return res.status(404).json({
        success: false,
        message: "Store not found",
      });
    }

    // Calculate price
    let unitPrice = product.price;
    let discountedPrice = null;

    if (product.discount > 0 && product.originalPrice) {
      discountedPrice = unitPrice;
    }

    // Add variant price modifier if applicable
    if (selectedVariant && selectedVariant.priceModifier) {
      unitPrice += selectedVariant.priceModifier;
      if (discountedPrice) {
        discountedPrice += selectedVariant.priceModifier;
      }
    }

    // Add customizations cost
    let customizationsCost = 0;
    if (customizations && customizations.length > 0) {
      customizationsCost = customizations.reduce(
        (sum, custom) => sum + (custom.additionalCost || 0),
        0,
      );
      unitPrice += customizationsCost;
      if (discountedPrice) {
        discountedPrice += customizationsCost;
      }
    }

    // Find or create cart
    let cart = await Cart.findOne({ userId, status: "active" });

    if (!cart) {
      cart = new Cart({ userId });
    }

    try {
      // Add item to cart (this will handle single-store validation)
      await cart.addItem({
        productId: product._id,
        storeId: store._id,
        storeName: store.name,
        name: product.name,
        description: product.shortDescription || product.description,
        image: product.images[0]?.url || "",
        quantity,
        unitPrice,
        discountedPrice,
        selectedVariant,
        customizations,
        specialInstructions,
        isAvailable: product.isAvailable,
        stockQuantity: product.inventory?.quantity || 0,
      });

      await cart.save();

      // Populate cart for response
      await cart.populate("items.productId", "name images price isAvailable");
      await cart.populate("items.storeId", "name slug");
      await cart.populate("storeId", "name logo address");

      res.status(200).json({
        success: true,
        message: "Item added to cart successfully",
        data: cart,
      });
    } catch (error) {
      // Handle single-store constraint error
      if (error.message.includes("different stores")) {
        return res.status(400).json({
          success: false,
          message: error.message,
          code: "DIFFERENT_STORE",
        });
      }
      throw error;
    }
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({
      success: false,
      message: "Failed to add item to cart",
      error: error.message,
    });
  }
};

/**
 * Update cart item quantity
 * PUT /api/cart/items/:itemId
 */
export const updateCartItem = async (req, res) => {
  try {
    const userId = req.user.id;
    const { itemId } = req.params;
    const { quantity } = req.body;

    if (!quantity || quantity < 1) {
      return res.status(400).json({
        success: false,
        message: "Valid quantity is required",
      });
    }

    const cart = await Cart.findOne({ userId, status: "active" });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    await cart.updateItemQuantity(itemId, quantity);
    await cart.save();

    await cart.populate("items.productId", "name images price isAvailable");
    await cart.populate("items.storeId", "name slug");
    await cart.populate("storeId", "name logo address");

    res.json({
      success: true,
      message: "Cart item updated successfully",
      data: cart,
    });
  } catch (error) {
    console.error("Error updating cart item:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update cart item",
      error: error.message,
    });
  }
};

/**
 * Remove item from cart
 * DELETE /api/cart/items/:itemId
 */
export const removeFromCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { itemId } = req.params;

    const cart = await Cart.findOne({ userId, status: "active" });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    await cart.removeItem(itemId);
    await cart.save();

    await cart.populate("items.productId", "name images price isAvailable");
    await cart.populate("items.storeId", "name slug");
    await cart.populate("storeId", "name logo address");

    res.json({
      success: true,
      message: "Item removed from cart successfully",
      data: cart,
    });
  } catch (error) {
    console.error("Error removing from cart:", error);
    res.status(500).json({
      success: false,
      message: "Failed to remove item from cart",
      error: error.message,
    });
  }
};

/**
 * Clear cart
 * DELETE /api/cart
 */
export const clearCart = async (req, res) => {
  try {
    const userId = req.user.id;

    const cart = await Cart.findOne({ userId, status: "active" });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    await cart.clearCart();
    await cart.save();

    res.json({
      success: true,
      message: "Cart cleared successfully",
      data: cart,
    });
  } catch (error) {
    console.error("Error clearing cart:", error);
    res.status(500).json({
      success: false,
      message: "Failed to clear cart",
      error: error.message,
    });
  }
};

/**
 * Apply coupon to cart
 * POST /api/cart/coupon
 */
export const applyCoupon = async (req, res) => {
  try {
    const userId = req.user.id;
    const { couponCode } = req.body;

    if (!couponCode) {
      return res.status(400).json({
        success: false,
        message: "Coupon code is required",
      });
    }

    const cart = await Cart.findOne({ userId, status: "active" });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    // TODO: Implement coupon validation with Coupon model
    // For now, apply a simple discount
    const discountAmount = Math.round(cart.subtotal * 0.1); // 10% discount

    cart.coupon = {
      code: couponCode,
      discountAmount,
      appliedAt: new Date(),
    };
    cart.discount = discountAmount;
    cart.total = cart.subtotal - discountAmount;

    await cart.save();

    await cart.populate("items.productId", "name images price isAvailable");
    await cart.populate("storeId", "name logo address");

    res.json({
      success: true,
      message: "Coupon applied successfully",
      data: cart,
    });
  } catch (error) {
    console.error("Error applying coupon:", error);
    res.status(500).json({
      success: false,
      message: "Failed to apply coupon",
      error: error.message,
    });
  }
};

/**
 * Remove coupon from cart
 * DELETE /api/cart/coupon
 */
export const removeCoupon = async (req, res) => {
  try {
    const userId = req.user.id;

    const cart = await Cart.findOne({ userId, status: "active" });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    cart.coupon = undefined;
    cart.discount = 0;
    cart.total = cart.subtotal;

    await cart.save();

    await cart.populate("items.productId", "name images price isAvailable");
    await cart.populate("storeId", "name logo address");

    res.json({
      success: true,
      message: "Coupon removed successfully",
      data: cart,
    });
  } catch (error) {
    console.error("Error removing coupon:", error);
    res.status(500).json({
      success: false,
      message: "Failed to remove coupon",
      error: error.message,
    });
  }
};
