const express = require("express");
const path = require("path");
const recipes = require("./data/recipes");

const app = express();
const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

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

app.get("/recipes/:season", (req, res) => {
  const season = req.params.season.toLowerCase();

  if (!recipes[season]) {
    return res.status(404).render("error", {
      title: "Season Not Found",
      season: season,
    });
  }

  const seasonData = recipes[season];

  res.render("season-recipes", {
    title: `${seasonData.title}`,
    pageTitle: seasonData.title,
    description: seasonData.description,
    recipes: seasonData.recipes,
    season: season,
    emoji: seasonData.emoji,
  });
});

app.use((req, res) => {
  res.status(404).render("error", {
    title: "Page Not Found",
    season: null,
  });
});

app.listen(PORT, () => {
});
