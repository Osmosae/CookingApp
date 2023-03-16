require("../models/database")
const Category = require("../models/Category")
const Recipe = require("../models/Recipe")

// GET Homepage
exports.homepage = async (req, res) => {
    try {
        const categoryNumber = 5
        const randomNumber = 6
        const categories = await Category.aggregate([{ $sample: { size: categoryNumber } }])
        // const randomRecipe = await Recipe.find({}).sort({ _id: -1 }).limit(randomNumber) // sort decending instead of random
        const randomRecipe = await Recipe.aggregate([{ $sample: { size: randomNumber } }])
        const food = { randomRecipe }
        res.render("index", { title: "Homepage", categories, food })
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
// GET /categories/:id
exports.exploreCategoriesById = async (req, res) => {
    try {
        let categoryId = req.params.url
        const limitNumber = 20
        const categoryById = await Recipe.find({ category: categoryId }).limit(limitNumber)
        const food = { categoryById }
        res.render("categories", { title: "Cooking Blog - Categoreis", food, categoryId })
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
        const limitNumber = 15
        const recipe = await Recipe.find({}).sort({ _id: -1 }).limit(limitNumber)
        res.render("explore-latest", { title: "Explore the Latest Recipe's", recipe })
    } catch (error) {
        res.status(500).send({ message: error.message || "Error Occured" })
    }
}
// GET /explore-random
exports.exploreRandom = async (req, res) => {
    try {
        const randomNumber = 15
        const randomRecipe = await Recipe.aggregate([{ $sample: { size: randomNumber } }])
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
