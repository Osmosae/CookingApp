require("../models/database")
const Category = require("../models/Category")
const Recipe = require("../models/Recipe")

// GET Homepage
exports.homepage = async (req, res) => {
    try {
        const categoryNumber = 5
        const randomNumber = 4
        const categories = await Category.aggregate([{ $sample: { size: categoryNumber } }])
        // const randomRecipe = await Recipe.find({}).sort({ _id: -1 }).limit(randomNumber) // sort decending instead of random
        const randomRecipe = await Recipe.aggregate([{ $sample: { size: randomNumber } }])
        const food = { randomRecipe }
        res.render("index", { title: "Homepage", categories: categories, food: food })
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
        res.render("categories", { title: "Categories", categories: categories, food: food })
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
        res.render("categories", { title: "Cooking Blog - Categoreis", food: food, categoryId: categoryId })
    } catch (error) {
        res.satus(500).send({ message: error.message || "Error Occured" })
    }
}

// GET /recipe/:id
exports.exploreRecipe = async (req, res) => {
    try {
        let recipeUrl = req.params.url
        const recipe = await Recipe.findOne({ url: recipeUrl })
        res.render("recipe", { title: "Recipe", recipe: recipe, recipeUrl })
    } catch (error) {
        res.status(500).send({ message: error.message || "Error Occurred" })
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
