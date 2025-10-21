const mongoose = require("mongoose");
require("dotenv").config();
const Recipe = require("../models/Recipe");
const oldRecipes = require("../data/recipes");

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    await Recipe.deleteMany({});
    console.log("Cleared existing recipes");

    const recipesToInsert = [];

    for (const season in oldRecipes) {
      oldRecipes[season].recipes.forEach((recipe) => {
        recipesToInsert.push({
          name: recipe.name,
          description: recipe.description,
          meta: recipe.meta,
          season: season,
        });
      });
    }
    await Recipe.insertMany(recipesToInsert);
    console.log(`Inserted ${recipesToInsert.length} recipes`);

    mongoose.connection.close();
    console.log("Database connection closed");
  } catch (error) {
    console.error("Error seeding database:", error);
    mongoose.connection.close();
  }
}

seedDatabase();
