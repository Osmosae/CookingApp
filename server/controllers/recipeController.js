require("../models/database")
const Category = require("../models/Category")
// GET Homepage
exports.homepage = async (req, res) => {
    res.render("index", { title: "Homepage" })
}

// async function insertDummyCategoryData() {
//     try {
//         await Category.insertMany()
//     } catch (error) {
//         console.log("err", +error)
//     }
// }

// insertDummyCategoryData()
