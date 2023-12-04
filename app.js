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
import passport from "passport";
import { errorHandler } from "./utils/errorHandler.js";
import { passportInit } from "./utils/passport.config.js";

config();

const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);

const app = express();

// Config MongoDB Database
mongoose.connect(process.env.DB_URL, { dbName: process.env.DB_NAME }).then(() => {
    console.log("Connected to the database");
});

// Specify the path to your favicon.ico file
const faviconPath = path.join(__dirname, "public", "img", "pass.jpeg");

// Setup Application
app.use(morgan("dev"));

// Serve the favicon using the serve-favicon middleware
app.use(serveFavicon(faviconPath));

// Setup Session
app.use(session({
    secret: "secret key",
    resave: false,
    saveUninitialized: false
}));

// Setup Passport
passportInit(passport);
app.use(passport.initialize());
app.use(passport.session());

// Setup Flash
app.use(flash());

// Setup Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Setup Static Files
app.use(express.static("public"));

// Setup Layouts
app.use(expressLayouts);
app.set("view engine", "ejs");
app.set("layout", "./layouts/main.ejs");

// Routes
app.use(allRoutes);

// Error Handler
app.use(errorHandler);

// Setting Up Server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server Is Running On http://localhost:${port}`);
});
