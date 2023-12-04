import { Router } from "express";
import { user_controller } from "../../controllers/auth/user.controller.js";
import { validateUser } from "../../validation/register.validation.js";

const authRouter = Router()


authRouter.post("/register", validateUser, user_controller.register)

export { authRouter }