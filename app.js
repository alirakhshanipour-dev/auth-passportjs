import express from "express";
import expressLayouts from "express-ejs-layouts";
import mongoose from "mongoose";
import { config } from "dotenv";
import morgan from "morgan";
import { allRoutes } from "./routes/index.router.js";
import serveFavicon from "serve-favicon";
import path from "path";
import flash from "express-flash";
import session from "express-session";

config();

const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);

const app = express();
// Config MongoDB Database
mongoose.connect(process.env.DB_URL, { dbName: process.env.DB_NAME }).then(() => {
    console.log("Connected to the database");
});

// Setup Application
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(morgan("dev"));
app.use(flash())
app.use(session({
    secret: "secret key",
    resave: false,
    saveUninitialized: false
}))

// Specify the path to your favicon.ico file
const faviconPath = path.join(__dirname, "public", "img", "pass.jpeg");
// Serve the favicon using the serve-favicon middleware
app.use(serveFavicon(faviconPath));

// Setup Layouts
app.use(expressLayouts);
app.use(allRoutes);
app.set("view engine", "ejs");
app.set("layout", "./layouts/main.ejs");

// Setup Session

// Setup Passport

const port = process.env.PORT;

// Routers
app.listen(port, () => {
    console.log(`Server Is Running On http://localhost:${port}`);
});
