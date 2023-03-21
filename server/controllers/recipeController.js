require("../models/database")
const Category = require("../models/Category")
const Recipe = require("../models/Recipe")

// GET Homepage
exports.homepage = async (req, res) => {
    try {
        const itemNumber = 6
        const categories = await Category.aggregate([{ $sample: { size: itemNumber - 1 } }])
        // const randomRecipe = await Recipe.find({}).sort({ _id: -1 }).limit(itemNumber) // sort decending instead of random
        const randomRecipe = await Recipe.aggregate([{ $sample: { size: itemNumber } }])
        const breakfastRecipe = await Recipe.find({ course: "Breakfast" }).limit(itemNumber)
        const lunchRecipe = await Recipe.find({ course: "Lunch" }).limit(itemNumber)
        const dinnerRecipe = await Recipe.find({ course: "Dinner" }).limit(itemNumber)
        const dessertRecipe = await Recipe.find({ course: "Dessert" }).limit(itemNumber)
        const food = { randomRecipe }
        const breakfast = { breakfastRecipe }
        const lunch = { lunchRecipe }
        const dinner = { dinnerRecipe }
        const dessert = { dessertRecipe }
        res.render("home", { title: "Homepage", categories, food, breakfast, lunch, dinner, dessert })
    } catch (error) {
        res.status(500).send({ message: error.message || "Error Occured" })
    }
}
// GET /categories
exports.exploreCategories = async (req, res) => {
    try {
        const limitNumber = 20
        const categories = await Category.find({}).limit(limitNumber)
        const food = ""
        res.render("categories", { title: "Categories", categories, food })
    } catch (error) {
        res.status(500).send({ message: error.message || "Error Occured" })
    }
}
// GET /categories/:url
exports.exploreCategoriesByUrl = async (req, res) => {
    try {
        let categoryUrl = req.params.url
        const limitNumber = 12
        const categoryByUrl = await Recipe.find({ category: categoryUrl }).limit(limitNumber)
        const food = { categoryByUrl }
        res.render("categories", { title: "Categories", food, categoryUrl })
    } catch (error) {
        res.satus(500).send({ message: error.message || "Error Occured" })
    }
}
// GET /recipe/:id
exports.exploreRecipe = async (req, res) => {
    try {
        let recipeUrl = req.params.url
        const recipe = await Recipe.findOne({ url: recipeUrl })
        res.render("recipe", { title: "Recipe", recipe, recipeUrl })
    } catch (error) {
        res.status(500).send({ message: error.message || "Error Occurred" })
    }
}
// GET /explore-latest
exports.exploreLatest = async (req, res) => {
    try {
        const limitNumber = 12
        const recipe = await Recipe.find({}).sort({ _id: -1 }).limit(limitNumber)
        res.render("explore-latest", { title: "Explore the Latest Recipe's", recipe })
    } catch (error) {
        res.status(500).send({ message: error.message || "Error Occured" })
    }
}
// GET /explore-random
exports.exploreRandom = async (req, res) => {
    try {
        const itemNumber = 12
        const randomRecipe = await Recipe.aggregate([{ $sample: { size: itemNumber } }])
        const food = { randomRecipe }
        // res.json(food)
        res.render("explore-random", { title: "Explore the Latest Recipe's", food })
    } catch (error) {
        res.status(500).send({ message: error.message || "Error Occured" })
    }
}
// GET /random-recipe
exports.randomRecipe = async (req, res) => {
    try {
        let count = await Recipe.find().countDocuments()
        let random = Math.floor(Math.random() * count)
        let recipe = await Recipe.findOne().skip(random).exec()
        res.render("random-recipe", { title: "Explore A Random Recipe", recipe })
    } catch (error) {
        res.status(500).send({ message: error.message || "Error Occured" })
    }
}
// GET /breakfast
exports.exploreBreakfast = async (req, res) => {
    try {
        const itemNumber = 12
        const breakfastRecipe = await Recipe.find({ course: "Breakfast" }).limit(itemNumber)
        const food = { breakfastRecipe }
        // res.json(food)
        res.render("breakfast", { title: "Explore Breakfast Recipe's", food })
    } catch (error) {
        res.status(500).send({ message: error.message || "Error Occured" })
    }
}
// GET /lunches
exports.exploreLunch = async (req, res) => {
    try {
        const itemNumber = 12
        const lunchRecipe = await Recipe.find({ course: "Lunch" }).limit(itemNumber)
        const food = { lunchRecipe }
        // res.json(food)
        res.render("lunches", { title: "Explore Lunch Recipe's", food })
    } catch (error) {
        res.status(500).send({ message: error.message || "Error Occured" })
    }
}
// GET /dinners
exports.exploreDinner = async (req, res) => {
    try {
        const itemNumber = 12
        const dinnerRecipe = await Recipe.find({ course: "Dinner" }).limit(itemNumber)
        const food = { dinnerRecipe }
        // res.json(food)
        res.render("dinners", { title: "Explore Dinner Recipe's", food })
    } catch (error) {
        res.status(500).send({ message: error.message || "Error Occured" })
    }
}
// GET /desserts
exports.exploreDessert = async (req, res) => {
    try {
        const itemNumber = 12
        const dessertRecipe = await Recipe.find({ course: "Dessert" }).limit(itemNumber)
        const food = { dessertRecipe }
        // res.json(food)
        res.render("desserts", { title: "Explore Dessert Recipe's", food })
    } catch (error) {
        res.status(500).send({ message: error.message || "Error Occured" })
    }
}

// GET /submit-recipe
exports.submitRecipe = async (req, res) => {
    try {
        const infoErrorsObj = req.flash("infoErrors")
        const infoSubmitObj = req.flash("infoSubmit")
        res.render("submit-recipe", { title: "Submit A New Recipe", infoErrorsObj, infoSubmitObj })
    } catch (error) {
        res.status(500).send({ message: error.message || "Error Occured" })
    }
}

// POST /submit-recipe
exports.submitRecipeOnPost = async (req, res) => {
    try {
        req.flash("infoSubmit", "Great Success! Your Recipe has been added")
        res.redirect("submit-recipe")
    } catch (error) {
        req.flash("infoErrors", error)
        res.redirect("submit-recipe")
    }
}

//  POST /search
exports.searchRecipe = async (req, res) => {
    try {
        let userSearch = req.body.search
        let recipe = await Recipe.find({ $text: { $search: userSearch, $diacriticSensitive: true } })
        // res.json(recipe)
        res.render("search", { title: "Search", recipe, userSearch })
    } catch (error) {
        res.status(500).send({ message: error.message || "Error Occurred" })
    }
}
