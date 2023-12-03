import express from "express"
import expressLayouts from "express-ejs-layouts"
import mongoose from "mongoose"
import { config } from "dotenv"; config();
import morgan from "morgan";
const app = express()
mongoose.connect(process.env.DB_URL, { dbName: process.env.DB_NAME }).then(() => {
    console.log("connected to database");
})

// Setup Application
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan("dev"))
// Setup Layouts
app.use(expressLayouts)
app.set("view engine", "ejs")
app.set("layout", "./layout/main.ejs")

// Setup Session


// Setup Passport

const port = process.env.PORT
// Routers
app.listen(port, () => {
    console.log(`Server Is Running On http://localhost:${port}`);
})