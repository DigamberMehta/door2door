import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

// Import models
import Store from "../models/Store.js";
import Product from "../models/Product.js";
import Category from "../models/Category.js";

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Seed the database with mock data from JSON file
 */
async function seedDatabase() {
  try {
    console.log("🌱 Starting database seeding process...");

    // Connect to MongoDB
    const mongoURI = process.env.MONGODB_URI || "mongodb://localhost:27017/door2door";
    await mongoose.connect(mongoURI);
    console.log("✅ Connected to MongoDB");

    // Read mock data from JSON file
    const mockDataPath = path.join(__dirname, "mockdata.json");
    const mockDataRaw = fs.readFileSync(mockDataPath, "utf8");
    const mockData = JSON.parse(mockDataRaw);

    console.log("📖 Mock data loaded from JSON file");

    // Clear existing data (optional - uncomment if you want to reset)
    const shouldClearData = process.argv.includes("--clear");
    if (shouldClearData) {
      console.log("🗑️  Clearing existing data...");
      await Category.deleteMany({});
      await Store.deleteMany({});
      await Product.deleteMany({});
      console.log("✅ Existing data cleared");
    }

    // Seed categories first (since products reference them)
    if (mockData.categories) {
      console.log("📂 Seeding categories...");
      for (const categoryData of mockData.categories) {
        // Convert string _id to ObjectId
        if (categoryData._id) {
          categoryData._id = new mongoose.Types.ObjectId(categoryData._id);
        }
        // Convert parentId string to ObjectId if exists
        if (categoryData.parentId) {
          categoryData.parentId = new mongoose.Types.ObjectId(categoryData.parentId);
        }
        // Convert date strings to Date objects
        if (categoryData.createdAt) {
          categoryData.createdAt = new Date(categoryData.createdAt);
        }
        if (categoryData.updatedAt) {
          categoryData.updatedAt = new Date(categoryData.updatedAt);
        }

        const category = await Category.findOneAndUpdate(
          { _id: categoryData._id },
          categoryData,
          { upsert: true, new: true, runValidators: true }
        );
        console.log(`  ✅ Category created/updated: ${category.name}`);
      }
    }

    // Seed stores
    console.log("🏪 Seeding stores...");
    for (const storeData of mockData.stores) {
      // Convert string _id to ObjectId
      if (storeData._id) {
        storeData._id = new mongoose.Types.ObjectId(storeData._id);
      }

      // Convert storeManagerId to ObjectId if exists
      if (storeData.storeManagerId) {
        storeData.storeManagerId = new mongoose.Types.ObjectId(storeData.storeManagerId);
      }

      const store = await Store.findOneAndUpdate(
        { _id: storeData._id },
        storeData,
        { upsert: true, new: true, runValidators: true }
      );
      console.log(`  ✅ Store created/updated: ${store.name}`);
    }

    // Seed products
    console.log("📦 Seeding products...");
    for (const productData of mockData.products) {
      // Convert storeId string to ObjectId
      if (productData.storeId) {
        productData.storeId = new mongoose.Types.ObjectId(productData.storeId);
      }

      // Convert categoryId string to ObjectId
      if (productData.categoryId) {
        productData.categoryId = new mongoose.Types.ObjectId(productData.categoryId);
      }

      // Convert date strings to Date objects
      if (productData.inventory?.expiryDate) {
        productData.inventory.expiryDate = new Date(productData.inventory.expiryDate);
      }
      if (productData.availableFrom) {
        productData.availableFrom = new Date(productData.availableFrom);
      }
      if (productData.availableTo) {
        productData.availableTo = new Date(productData.availableTo);
      }
      if (productData.saleStartDate) {
        productData.saleStartDate = new Date(productData.saleStartDate);
      }
      if (productData.saleEndDate) {
        productData.saleEndDate = new Date(productData.saleEndDate);
      }
      if (productData.createdAt) {
        productData.createdAt = new Date(productData.createdAt);
      }
      if (productData.updatedAt) {
        productData.updatedAt = new Date(productData.updatedAt);
      }

      const product = await Product.findOneAndUpdate(
        { 
          name: productData.name, 
          storeId: productData.storeId 
        },
        productData,
        { upsert: true, new: true, runValidators: true }
      );
      console.log(`  ✅ Product created/updated: ${product.name}`);
    }

    console.log("🎉 Database seeding completed successfully!");
    
    // Display summary
    const categoryCount = await Category.countDocuments();
    const storeCount = await Store.countDocuments();
    const productCount = await Product.countDocuments();
    
    console.log("\n📊 Database Summary:");
    console.log(`   Categories: ${categoryCount}`);
    console.log(`   Stores: ${storeCount}`);
    console.log(`   Products: ${productCount}`);

  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  } finally {
    // Close database connection
    await mongoose.disconnect();
    console.log("🔌 Disconnected from MongoDB");
    process.exit(0);
  }
}

/**
 * Clear all data from database
 */
async function clearDatabase() {
  try {
    console.log("🗑️  Starting database clearing process...");

    // Connect to MongoDB
    const mongoURI = process.env.MONGODB_URI || "mongodb://localhost:27017/door2door";
    await mongoose.connect(mongoURI);
    console.log("✅ Connected to MongoDB");

    // Clear all collections
    await Category.deleteMany({});
    await Store.deleteMany({});
    await Product.deleteMany({});

    console.log("✅ All data cleared from database");

  } catch (error) {
    console.error("❌ Error clearing database:", error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 Disconnected from MongoDB");
    process.exit(0);
  }
}

// Check command line arguments
const command = process.argv[2];

switch (command) {
  case "seed":
    seedDatabase();
    break;
  case "clear":
    clearDatabase();
    break;
  default:
    console.log("📖 Available commands:");
    console.log("  npm run seed        - Seed database with mock data");
    console.log("  npm run seed:clear  - Clear all data from database");
    console.log("  npm run seed:reset  - Clear and then seed database");
    console.log("\nOr run directly:");
    console.log("  node init/seed.js seed");
    console.log("  node init/seed.js clear");
    process.exit(0);
}

export { seedDatabase, clearDatabase };