import { Router } from "express";
import { authRouter } from "./routers/auth.router.js";


const allRoutes = Router()

allRoutes.use("/", authRouter)

export { allRoutes }
