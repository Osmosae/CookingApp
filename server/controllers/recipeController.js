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
        res.status(500).send({ message: error.message || "Error Occured" })
    }
}

// // Manual insertion to database
// async function insertDummyCategoryData() {
//     try {
//         await Category.insertMany([
//             {
//                 name: "American",
//                 image: "https://res.cloudinary.com/dnkjraw2p/image/upload/v1678804994/categories/american-food_aole66.jpg",
//                 cloudinaryId: "american-food_aole66",
//             },
//             {
//                 name: "Chinese",
//                 image: "https://res.cloudinary.com/dnkjraw2p/image/upload/v1678804994/categories/chinese-food_goiq3q.jpg",
//                 cloudinaryId: "chinese-food_goiq3q",
//             },
//             {
//                 name: "Indian",
//                 image: "https://res.cloudinary.com/dnkjraw2p/image/upload/v1678804994/categories/indian-food_fodncq.jpg",
//                 cloudinaryId: "indian-food_fodncq",
//             },
//             {
//                 name: "Mexican",
//                 image: "https://res.cloudinary.com/dnkjraw2p/image/upload/v1678804994/categories/mexican-food_pxnddf.jpg",
//                 cloudinaryId: "mexican-food_pxnddf",
//             },
//             {
//                 name: "Spanish",
//                 image: "https://res.cloudinary.com/dnkjraw2p/image/upload/v1678804994/categories/spanish-food_c0z7y8.jpg",
//                 cloudinaryId: "spanish-food_c0z7y8",
//             },
//             {
//                 name: "Thai",
//                 image: "https://res.cloudinary.com/dnkjraw2p/image/upload/v1678804994/categories/thai-food_t60zmr.jpg",
//                 cloudinaryId: "thai-food_t60zmr",
//             },
//         ])
//     } catch (error) {
//         console.log("err", +error)
//     }
// }
