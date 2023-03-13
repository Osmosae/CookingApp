const express = require("express")
const expressLayouts = require("express-ejs-layouts")

const app = express()

require("dotenv").config({ path: "./config/.env" })

app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))
app.use(expressLayouts)

app.set("layout", "./layouts/main")

const routes = require("./server/route/recipeRoutes.js")
app.use("/", routes)

app.listen(process.env.PORT, () => {
    console.log(`Server is running on :${process.env.PORT}, you better catch it!`)
})
