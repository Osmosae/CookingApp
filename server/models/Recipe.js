const mongoose = require("mongoose")
// cloudinary
// const recipeSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: "This field is required",
//     },
//     image: {
//         type: String,
//         required: "This field is required",
//     },
//     ingredients: {
//         type: Array,
//         require: "This field is required",
//     },
//     directions: {
//         type: String,
//         require: "This field is required",
//     },
//     category: {
//         type: String,
//         enum: ["American", "Chinese", "Indian", "Mexican", "Spanish", "Thai"],
//         require: "This field is required",
//     },
// })

const recipeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    ingredients: {
        type: Array,
        required: true,
    },
    category: {
        type: String,
        enum: ["Thai", "American", "Chinese", "Mexican", "Indian"],
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    course: {
        type: String,
        enum: ["Breakfast", "Lunch", "Dinner", "Dessert", "Misc"],
        required: true,
    },
    video: {
        type: String,
        required: false,
    },
})

recipeSchema.index({ name: "text", category: "text", course: "text" })
// WildCard Indexing
//recipeSchema.index({ "$**" : 'text' });

module.exports = mongoose.model("Recipe", recipeSchema)
