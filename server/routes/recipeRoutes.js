const express = require("express")
const router = express.Router()
const recipeController = require("../controllers/recipeController")

// App Routes
router.get("/", recipeController.homepage)
router.get("/recipe/:url", recipeController.exploreRecipe)
router.get("/categories", recipeController.exploreCategories)
router.get("/categories/:url", recipeController.exploreCategoriesById)
router.get("/explore-latest", recipeController.exploreLatest)
router.get("/explore-random", recipeController.exploreRandom)
router.get("/random-recipe", recipeController.randomRecipe)
router.post("/search", recipeController.searchRecipe)

module.exports = router
