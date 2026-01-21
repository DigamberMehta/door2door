import mongoose from "mongoose";

// Category attributes sub-schema (for category-specific filters)
const attributeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Attribute name is required"],
      trim: true,
      maxlength: 50,
    },
    type: {
      type: String,
      enum: ["text", "number", "boolean", "select", "multiselect", "range"],
      required: [true, "Attribute type is required"],
    },
    options: [
      {
        value: {
          type: String,
          trim: true,
          maxlength: 100,
        },
        label: {
          type: String,
          trim: true,
          maxlength: 100,
        },
      },
    ],
    isRequired: {
      type: Boolean,
      default: false,
    },
    isFilterable: {
      type: Boolean,
      default: true,
    },
    displayOrder: {
      type: Number,
      default: 0,
    },
  },
  {
    _id: false,
  },
);

// Category SEO sub-schema
const seoSchema = new mongoose.Schema(
  {
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
    metaKeywords: [
      {
        type: String,
        trim: true,
        lowercase: true,
      },
    ],
    canonicalUrl: {
      type: String,
      trim: true,
    },
  },
  {
    _id: false,
  },
);

// Main category schema
const categorySchema = new mongoose.Schema(
  {
    // Basic Information
    name: {
      type: String,
      required: [true, "Category name is required"],
      trim: true,
      maxlength: 100,
      index: true,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 1000,
    },
    shortDescription: {
      type: String,
      trim: true,
      maxlength: 200,
    },

    // Hierarchy
    parentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      index: true,
    },
    level: {
      type: Number,
      default: 1,
      min: 1,
      max: 5,
      index: true,
    },
    path: {
      type: String,
      // e.g., "electronics/smartphones/android" or "food/pizza/italian"
    },

    // Business Type Association
    businessTypes: [
      {
        type: String,
        enum: [
          "restaurant",
          "grocery",
          "pharmacy",
          "electronics",
          "fashion",
          "books",
          "beauty",
          "home_garden",
          "sports",
          "toys",
          "automotive",
          "pet_supplies",
          "bakery",
          "meat_seafood",
          "dairy",
          "beverages",
          "snacks",
          "frozen_foods",
          "organic",
          "convenience_store",
          "supermarket",
          "specialty_store",
          "other",
        ],
        index: true,
      },
    ],

    // Visual Elements
    icon: {
      type: String,
      trim: true,
    },
    image: {
      type: String,
      trim: true,
    },
    banner: {
      type: String,
      trim: true,
    },
    color: {
      type: String,
      trim: true,
      validate: {
        validator: function (v) {
          return !v || /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(v);
        },
        message: "Color must be a valid hex color code",
      },
    },

    // Category-Specific Attributes
    attributes: [attributeSchema],

    // Status and Visibility
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
    isVisible: {
      type: Boolean,
      default: true,
      index: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
      index: true,
    },

    // Ordering and Display
    displayOrder: {
      type: Number,
      default: 0,
      index: true,
    },

    // SEO
    slug: {
      type: String,
      required: [true, "Slug is required"],
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    seo: seoSchema,

    // Statistics
    productCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    storeCount: {
      type: Number,
      default: 0,
      min: 0,
    },

    // Tags and Keywords
    tags: [
      {
        type: String,
        trim: true,
        lowercase: true,
        maxlength: 30,
      },
    ],
    searchKeywords: [
      {
        type: String,
        trim: true,
        lowercase: true,
      },
    ],

    // Commission and Business Rules
    commissionRate: {
      type: Number,
      min: 0,
      max: 50,
    },
    minimumOrderValue: {
      type: Number,
      min: 0,
    },

    // Special Properties
    requiresAgeVerification: {
      type: Boolean,
      default: false,
    },
    requiresPrescription: {
      type: Boolean,
      default: false,
    },
    isPerishable: {
      type: Boolean,
      default: false,
    },
    allowsReturns: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

// Indexes for performance
categorySchema.index({ parentId: 1, isActive: 1, displayOrder: 1 });
categorySchema.index({ level: 1, isActive: 1, displayOrder: 1 });
categorySchema.index({ businessTypes: 1, isActive: 1 });
categorySchema.index({ isFeatured: 1, isActive: 1, displayOrder: 1 });
categorySchema.index({ path: 1 });
categorySchema.index({ productCount: -1, isActive: 1 });

// Text search index
categorySchema.index({
  name: "text",
  description: "text",
  tags: "text",
  searchKeywords: "text",
});

// Pre-save middleware
categorySchema.pre("save", async function (next) {
  // Generate slug from name if not provided
  if (!this.slug || this.isModified("name")) {
    let baseSlug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    // Ensure unique slug
    let slug = baseSlug;
    let counter = 1;
    while (await this.constructor.findOne({ slug, _id: { $ne: this._id } })) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }
    this.slug = slug;
  }

  // Set level and path based on parent
  if (this.parentId) {
    const parent = await this.constructor.findById(this.parentId);
    if (parent) {
      this.level = parent.level + 1;
      this.path = parent.path ? `${parent.path}/${this.slug}` : this.slug;
    }
  } else {
    this.level = 1;
    this.path = this.slug;
  }

  // Set default SEO if not provided
  if (!this.seo.metaTitle) {
    this.seo.metaTitle = this.name;
  }
  if (!this.seo.metaDescription && this.description) {
    this.seo.metaDescription = this.description.substring(0, 300);
  }

  next();
});

// Post-save middleware to update parent category counts
categorySchema.post("save", async function (doc) {
  if (doc.parentId) {
    await doc.constructor.updateCategoryCounts(doc.parentId);
  }
});

// Instance methods
categorySchema.methods.getChildren = function (includeInactive = false) {
  const query = { parentId: this._id };
  if (!includeInactive) {
    query.isActive = true;
  }
  return this.constructor.find(query).sort({ displayOrder: 1, name: 1 });
};

categorySchema.methods.getParents = async function () {
  const parents = [];
  let current = this;

  while (current.parentId) {
    const parent = await this.constructor.findById(current.parentId);
    if (parent) {
      parents.unshift(parent);
      current = parent;
    } else {
      break;
    }
  }

  return parents;
};

categorySchema.methods.getFullPath = async function () {
  const parents = await this.getParents();
  return [...parents, this];
};

categorySchema.methods.getAllDescendants = async function () {
  const descendants = [];
  const queue = [this._id];

  while (queue.length > 0) {
    const currentId = queue.shift();
    const children = await this.constructor.find({ parentId: currentId });

    for (const child of children) {
      descendants.push(child);
      queue.push(child._id);
    }
  }

  return descendants;
};

categorySchema.methods.updateProductCount = async function () {
  const count = await mongoose.model("Product").countDocuments({
    categoryId: this._id,
    isActive: true,
    isAvailable: true,
  });

  this.productCount = count;
  return this.save();
};

categorySchema.methods.updateStoreCount = async function () {
  // Count stores that have products in this category
  const storeIds = await mongoose.model("Product").distinct("storeId", {
    categoryId: this._id,
    isActive: true,
    isAvailable: true,
  });

  this.storeCount = storeIds.length;
  return this.save();
};

// Static methods
categorySchema.statics.getRootCategories = function (businessType = null) {
  const query = {
    parentId: null,
    isActive: true,
    isVisible: true,
  };

  if (businessType) {
    query.businessTypes = businessType;
  }

  return this.find(query).sort({ displayOrder: 1, name: 1 });
};

categorySchema.statics.getCategoryTree = async function (
  businessType = null,
  maxDepth = 3,
) {
  const query = {
    isActive: true,
    isVisible: true,
    level: { $lte: maxDepth },
  };

  if (businessType) {
    query.businessTypes = businessType;
  }

  const categories = await this.find(query).sort({
    level: 1,
    displayOrder: 1,
    name: 1,
  });

  // Build tree structure
  const categoryMap = new Map();
  const rootCategories = [];

  categories.forEach((cat) => {
    categoryMap.set(cat._id.toString(), { ...cat.toObject(), children: [] });
  });

  categories.forEach((cat) => {
    if (cat.parentId) {
      const parent = categoryMap.get(cat.parentId.toString());
      if (parent) {
        parent.children.push(categoryMap.get(cat._id.toString()));
      }
    } else {
      rootCategories.push(categoryMap.get(cat._id.toString()));
    }
  });

  return rootCategories;
};

categorySchema.statics.getFeaturedCategories = function (
  businessType = null,
  limit = 10,
) {
  const query = {
    isFeatured: true,
    isActive: true,
    isVisible: true,
  };

  if (businessType) {
    query.businessTypes = businessType;
  }

  return this.find(query)
    .sort({ displayOrder: 1, productCount: -1 })
    .limit(limit);
};

categorySchema.statics.searchCategories = function (
  searchTerm,
  businessType = null,
  limit = 20,
) {
  const query = {
    $text: { $search: searchTerm },
    isActive: true,
    isVisible: true,
  };

  if (businessType) {
    query.businessTypes = businessType;
  }

  return this.find(query, { score: { $meta: "textScore" } })
    .sort({ score: { $meta: "textScore" }, productCount: -1 })
    .limit(limit);
};

categorySchema.statics.getCategoriesByBusinessType = function (businessType) {
  return this.find({
    businessTypes: businessType,
    isActive: true,
    isVisible: true,
  }).sort({ level: 1, displayOrder: 1, name: 1 });
};

categorySchema.statics.updateCategoryCounts = async function (categoryId) {
  const category = await this.findById(categoryId);
  if (category) {
    await category.updateProductCount();
    await category.updateStoreCount();

    // Update parent counts recursively
    if (category.parentId) {
      await this.updateCategoryCounts(category.parentId);
    }
  }
};

categorySchema.statics.getPopularCategories = function (
  businessType = null,
  limit = 10,
) {
  const query = {
    isActive: true,
    isVisible: true,
    productCount: { $gt: 0 },
  };

  if (businessType) {
    query.businessTypes = businessType;
  }

  return this.find(query)
    .sort({ productCount: -1, storeCount: -1 })
    .limit(limit);
};

categorySchema.statics.getCategoryStats = function (categoryId) {
  return this.aggregate([
    { $match: { _id: mongoose.Types.ObjectId(categoryId) } },
    {
      $lookup: {
        from: "products",
        localField: "name",
        foreignField: "category",
        pipeline: [{ $match: { isActive: true, isAvailable: true } }],
        as: "products",
      },
    },
    {
      $project: {
        name: 1,
        productCount: { $size: "$products" },
        averagePrice: { $avg: "$products.price" },
        priceRange: {
          min: { $min: "$products.price" },
          max: { $max: "$products.price" },
        },
        storeCount: { $size: { $setUnion: ["$products.storeId"] } },
      },
    },
  ]);
};

categorySchema.statics.getBreadcrumb = async function (categorySlug) {
  const category = await this.findOne({ slug: categorySlug });
  if (!category) return [];

  return await category.getFullPath();
};

// Instance method to get products in this category
categorySchema.methods.getProducts = function (options = {}) {
  const Product = mongoose.model("Product");
  return Product.find({
    categoryId: this._id,
    isActive: true,
    isAvailable: true,
    ...options,
  }).populate("storeId", "name averageRating deliveryFee");
};

// Static method to get category with products
categorySchema.statics.findWithProducts = function (filter = {}, options = {}) {
  const Product = mongoose.model("Product");
  return this.aggregate([
    { $match: { isActive: true, ...filter } },
    {
      $lookup: {
        from: "products",
        localField: "_id",
        foreignField: "categoryId",
        as: "products",
        pipeline: [
          { $match: { isActive: true, isAvailable: true } },
          { $limit: options.productLimit || 10 },
        ],
      },
    },
    {
      $addFields: {
        productCount: { $size: "$products" },
      },
    },
  ]);
};

const Category = mongoose.model("Category", categorySchema);

export default Category;
