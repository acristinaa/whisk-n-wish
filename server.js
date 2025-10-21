const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
require("dotenv").config();

const Recipe = require("./models/Recipe");

const app = express();
const PORT = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to Mongo"))
  .catch((err) => console.error("Mongo connection error:", err));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.render("index", {
    title: "wisk 'n whish recipe book",
    pageTitle: "Welcome to my recipe book",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    pageTitle: "About me",
  });
});

app.get("/seasonal-recipes", (req, res) => {
  res.render("seasonal-recipes", {
    title: "Seasonal Recipes",
    pageTitle: "Seasonal Recipes",
  });
});

app.get("/recipes/:season", async (req, res) => {
  const season = req.params.season.toLowerCase();
  const validSeasons = ["fall", "winter", "spring", "summer"];

  if (!validSeasons.includes(season)) {
    return res.status(404).render("error", {
      title: "Season Not Found",
      season: season,
    });
  }

  try {
    const recipes = await Recipe.find({ season: season });

    const seasonInfo = {
      fall: {
        title: "🍁 Fall Recipes",
        description: "Cozy, warm, and a little cinnamon everywhere. Jadosi!!",
        emoji: "🍁",
      },
      winter: {
        title: "❄️ Winter Recipes",
        description: "Hearty, cheesy, and perfect for cold nights. Cou!",
        emoji: "❄️",
      },
      spring: {
        title: "🌷 Spring Recipes",
        description: "Fresh, light, and full of seasonal joy!",
        emoji: "🌷",
      },
      summer: {
        title: "🍉 Summer Recipes",
        description: "Cool, fresh recipes perfect for sunny days!",
        emoji: "🍉",
      },
    };

    res.render("season-recipes", {
      title: seasonInfo[season].title,
      pageTitle: seasonInfo[season].title,
      description: seasonInfo[season].description,
      recipes: recipes,
      season: season,
      emoji: seasonInfo[season].emoji,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching recipes");
  }
});

app.get("/recipes/:season/new", (req, res) => {
  const season = req.params.season.toLowerCase();
  res.render("recipe-form", {
    title: `Add New ${season.charAt(0).toUpperCase() + season.slice(1)} Recipe`,
    pageTitle: `Add New Recipe`,
    season: season,
    recipe: null,
  });
});

app.post("/recipes/:season", async (req, res) => {
  const season = req.params.season.toLowerCase();

  try {
    const newRecipe = new Recipe({
      name: req.body.name,
      description: req.body.description,
      meta: req.body.meta,
      season: season,
    });

    await newRecipe.save();
    res.redirect(`/recipes/${season}`);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating recipe");
  }
});

app.get("/recipes/:season/:id/edit", async (req, res) => {
  const { season, id } = req.params;

  try {
    const recipe = await Recipe.findById(id);

    if (!recipe) {
      return res.status(404).send("Recipe not found");
    }

    res.render("recipe-form", {
      title: `Edit ${recipe.name}`,
      pageTitle: `Edit Recipe`,
      season: season,
      recipe: recipe,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching recipe");
  }
});

app.post("/recipes/:season/:id", async (req, res) => {
  const { season, id } = req.params;

  try {
    await Recipe.findByIdAndUpdate(id, {
      name: req.body.name,
      description: req.body.description,
      meta: req.body.meta,
    });

    res.redirect(`/recipes/${season}`);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating recipe");
  }
});

app.post("/recipes/:season/:id/delete", async (req, res) => {
  const { season, id } = req.params;

  try {
    await Recipe.findByIdAndDelete(id);
    res.redirect(`/recipes/${season}`);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error deleting recipe");
  }
});

app.use((req, res) => {
  res.status(404).render("error", {
    title: "Page Not Found",
    season: null,
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
