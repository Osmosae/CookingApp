const express = require("express")
const expressLayouts = require("express-ejs-layouts")
const session = require("express-session")
const cookieParser = require("cookie-parser")
const flash = require("connect-flash")

const app = express()
const routes = require("./server/routes/recipeRoutes.js")

require("dotenv").config({ path: "./config/.env" })

app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))
app.use(expressLayouts)

app.use(cookieParser("CookingAppCookieNice"))
app.use(
    session({
        secret: "You Wouldnt Download A Cookie",
        saveUninitialized: true,
        resave: true,
    })
)
app.use(flash())

app.set("layout", "./layouts/main")
app.set("view engine", "ejs")

app.use("/", routes)

app.listen(process.env.PORT, () => {
    console.log(`Server is running on :${process.env.PORT}, you better catch it!`)
})
