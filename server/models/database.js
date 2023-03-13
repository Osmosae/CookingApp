const mongoose = require("mongoose")
require("dotenv").config({ path: "./config/.env" })
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection
db.on("error", console.error.bind(console, "connection error"))
db.once("open", function () {
    console.log("Connected to MongoDB")
})

// const mongoose = require("mongoose")

// const connectDB = async () => {
//     try {
//         const conn = await mongoose.connect(process.env.DB_STRING, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//             useFindAndModify: false,
//             useCreateIndex: true,
//         })

//         console.log(`MongoDB Connected: ${conn.connection.host}`)
//     } catch (err) {
//         console.error(err)
//         process.exit(1)
//     }
// }

//  Models
require("./Category")

// module.exports = connectDB
