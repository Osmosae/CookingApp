const express = require("express")
const router = express.Router()
const upload = require("../middleware/multer")
const recipeController = require("../controllers/recipeController")

// App Routes
router.get("/", recipeController.homepage)
router.get("/home", recipeController.homepage)
router.get("/recipe/:url", recipeController.exploreRecipe)
router.get("/categories", recipeController.exploreCategories)
router.get("/categories/:url", recipeController.exploreCategoriesByUrl)
router.get("/explore-latest", recipeController.exploreLatest)
router.get("/explore-random", recipeController.exploreRandom)
router.get("/random-recipe", recipeController.randomRecipe)
router.get("/breakfast", recipeController.exploreBreakfast)
router.get("/lunches", recipeController.exploreLunch)
router.get("/dinners", recipeController.exploreDinner)
router.get("/desserts", recipeController.exploreDessert)
router.get("/submit-recipe", recipeController.submitRecipe)
router.post("/submit-recipe", upload.single("file"), recipeController.submitRecipeOnPost)
router.post("/search", recipeController.searchRecipe)

module.exports = router
