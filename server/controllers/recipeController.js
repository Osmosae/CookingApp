require("../models/database")
const Category = require("../models/Category")
const Recipe = require("../models/Recipe")
const cloudinary = require("../middleware/cloudinary")

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
        const perPage = 20
        let page = req.query.page || 1
        const categories = await Category.aggregate([{ $sort: { name: 1 } }])
            .skip(perPage * page - perPage)
            .limit(perPage)
            .exec()

        const count = await Category.count()
        const pageName = "categories"
        const food = ""
        res.render("categories", {
            title: "Categories",
            categories,
            food,
            currentPage: page,
            pages: Math.ceil(count / perPage),
            pageName,
        })
    } catch (error) {
        res.status(500).send({ message: error.message || "Error Occured" })
    }
}
// GET /categories/:url
exports.exploreCategoriesByUrl = async (req, res) => {
    try {
        const perPage = 12
        let page = req.query.page || 1
        let categoryUrl = req.params.url
        const categoryByUrl = await Recipe.aggregate([{ $sort: { name: 1 } }, { $match: { category: categoryUrl } }])
            .skip(perPage * page - perPage)
            .limit(perPage)
            .exec()

        const food = { categoryByUrl }
        const count = await Category.count()
        const pageName = "categories"
        res.render("categories", {
            title: "Categories",
            food,
            categoryUrl,
            currentPage: page,
            pages: Math.ceil(count / perPage),
            pageName,
        })
    } catch (error) {
        res.status(500).send({ message: error.message || "Error Occured" })
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
    let perPage = 12
    let page = req.query.page || 1
    let pageName = "explore-latest"
    try {
        const recipe = await Recipe.aggregate([{ $sort: { _id: -1 } }])
            .skip(perPage * page - perPage)
            .limit(perPage)
            .exec()

        const count = await Recipe.count()

        res.render("explore-latest", {
            title: "Explore the Latest Recipe's",
            recipe,
            currentPage: page,
            pages: Math.ceil(count / perPage),
            pageName,
        })
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
    let perPage = 12
    let page = req.query.page || 1
    let pageName = "breakfast"
    try {
        const food = await Recipe.aggregate([{ $sort: { _id: -1 } }, { $match: { course: "Breakfast" } }])
            .skip(perPage * page - perPage)
            .limit(perPage)
            .exec()

        const count = await Recipe.count({
            course: "Breakfast",
        })

        res.render("breakfast", {
            title: "Explore Breakfast Recipe's",
            food,
            currentPage: page,
            pages: Math.ceil(count / perPage),
            pageName,
        })
    } catch (error) {
        res.status(500).send({ message: error.message || "Error Occured" })
    }
}
// GET /lunches
exports.exploreLunch = async (req, res) => {
    let perPage = 12
    let page = req.query.page || 1
    let pageName = "lunches"
    try {
        const food = await Recipe.aggregate([{ $sort: { _id: -1 } }, { $match: { course: "Lunch" } }])
            .skip(perPage * page - perPage)
            .limit(perPage)
            .exec()

        const count = await Recipe.count({
            course: "Lunch",
        })

        res.render("lunches", {
            title: "Explore Lunch Recipe's",
            food,
            currentPage: page,
            pages: Math.ceil(count / perPage),
            pageName,
        })
    } catch (error) {
        res.status(500).send({ message: error.message || "Error Occured" })
    }
}
// GET /dinners
exports.exploreDinner = async (req, res) => {
    let perPage = 12
    let page = req.query.page || 1
    let pageName = "dinners"
    try {
        const food = await Recipe.aggregate([{ $sort: { _id: -1 } }, { $match: { course: "Dinner" } }])
            .skip(perPage * page - perPage)
            .limit(perPage)
            .exec()

        const count = await Recipe.count({
            course: "Dinner",
        })

        res.render("dinners", {
            title: "Explore Dinner Recipe's",
            food,
            currentPage: page,
            pages: Math.ceil(count / perPage),
            pageName,
        })
    } catch (error) {
        res.status(500).send({ message: error.message || "Error Occured" })
    }
}
// GET /desserts
exports.exploreDessert = async (req, res) => {
    let perPage = 12
    let page = req.query.page || 1
    let pageName = "desserts"
    try {
        const food = await Recipe.aggregate([{ $sort: { _id: -1 } }, { $match: { course: "Dessert" } }])
            .skip(perPage * page - perPage)
            .limit(perPage)
            .exec()

        const count = await Recipe.count()

        res.render("desserts", {
            title: "Explore Dessert Recipe's",
            food,
            currentPage: page,
            pages: Math.ceil(count / perPage),
            pageName,
        })
    } catch (error) {
        res.status(500).send({ message: error.message || "Error Occured" })
    }
}

// GET /submit-recipe
exports.submitRecipe = async (req, res) => {
    try {
        const infoErrorsObj = req.flash("infoErrors")
        const infoSubmitObj = req.flash("infoSubmit")
        const cuisineOptions = await Category.find({})
        // console.log(cuisineOptions)
        res.render("submit-recipe", { title: "Submit A New Recipe", infoErrorsObj, infoSubmitObj, cuisineOptions })
    } catch (error) {
        res.status(500).send({ message: error.message || "Error Occured" })
    }
}

// POST /submit-recipe
exports.submitRecipeOnPost = async (req, res) => {
    try {
        // const newRecipe = new Recipe({
        //     name: req.body.recipeName,
        //     servings: req.body.servings,
        //     prepTime: req.body.prepTime,
        //     cookTime: req.body.cookTime,
        //     direction: req.body.req.body.direction,
        //     ingredients: req.body.ingredientName,
        //     category: req.body.category,
        //     image: "photo-1612240498936-65f5101365d2.avif",
        //     url: "test-recipe",
        //     course: req.body.course,
        // })

        // await newRecipe.save()

        // Upload image to cloudinary
        const result = await cloudinary.uploader.upload(req.file.path)
        console.log(req.body)
        console.log(result)

        req.flash("infoSubmit", "Great Success! Your Recipe has been added")
        res.redirect("submit-recipe")
    } catch (error) {
        res.json({ error: error.message })
        // req.flash("infoErrors", error)
        // res.redirect("submit-recipe")
    }
}

//  POST /search
exports.searchRecipe = async (req, res) => {
    try {
        let userSearch = req.body.search
        //  $or searches through different fields, $regex allows for partial matches, and $options: i allow case-insensitive results
        let food = await Recipe.find({
            $or: [
                { name: { $regex: new RegExp(userSearch), $options: "i" } },
                { description: { $regex: new RegExp(userSearch), $options: "i" } },
                { ingredients: { $regex: new RegExp(userSearch), $options: "i" } },
                { category: { $regex: new RegExp(userSearch), $options: "i" } },
                { course: { $regex: new RegExp(userSearch), $options: "i" } },
            ],
        })

        res.render("search", {
            title: "Search Results",
            food,
            userSearch,
        })
    } catch (error) {
        res.status(500).send({ message: error.message || "Error Occurred" })
    }
}
