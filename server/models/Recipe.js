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
        required: "This field is required.",
    },
    description: {
        type: String,
        required: "This field is required.",
    },
    email: {
        type: String,
        required: "This field is required.",
    },
    ingredients: {
        type: Array,
        required: "This field is required.",
    },
    category: {
        type: String,
        enum: ["Thai", "American", "Chinese", "Mexican", "Indian"],
        required: "This field is required.",
    },
    image: {
        type: String,
        required: "This field is required.",
    },
    url: {
        type: String,
        required: "This field is required.",
    },
    linkage: {
        type: String,
        required: "This field is required.",
    },
})

recipeSchema.index({ name: "text", category: "text" })
// WildCard Indexing
//recipeSchema.index({ "$**" : 'text' });

module.exports = mongoose.model("Recipe", recipeSchema)
