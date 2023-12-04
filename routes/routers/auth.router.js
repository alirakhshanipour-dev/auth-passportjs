import { Router } from "express";
import { user_controller } from "../../controllers/auth/user.controller.js";
import { validateUser } from "../../validation/register.validation.js";

const authRouter = Router()

authRouter.get("/", (req, res, next) => {
    res.render("index", { title: "nodejs" })
})

authRouter.get("/register-form", (req, res, next) => {
    res.render("register", { title: "nodejs" })
})

authRouter.get("/profile", user_controller.getUserProfile)
authRouter.post("/register", validateUser, user_controller.register)
authRouter.post("/login", user_controller.login)

export { authRouter }