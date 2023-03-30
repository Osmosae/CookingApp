const express = require("express")
const expressLayouts = require("express-ejs-layouts")
const session = require("express-session")
const cookieParser = require("cookie-parser")
const flash = require("connect-flash")
const passport = require("passport")
const MongoStore = require("connect-mongo")

const app = express()

require("dotenv").config({ path: "./config/.env" })

app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))
app.use(expressLayouts)

app.use(cookieParser("CookingAppCookieNice"))
app.use(
    session({
        secret: "You Wouldnt Download A Cookie",
        saveUninitialized: true,
        resave: false,
        store: MongoStore.create({
            mongoUrl: process.env.MONGODB_URI,
        }),
    })
)
app.use(flash())

app.use(passport.initialize())
app.use(passport.session())

app.set("layout", "./layouts/main")
app.set("view engine", "ejs")

app.use("/", require("./server/routes/auth.js"))
app.use("/", require("./server/routes/recipeRoutes.js"))

app.listen(process.env.PORT, () => {
    console.log(`Server is running on :${process.env.PORT}, you better catch it!`)
})
