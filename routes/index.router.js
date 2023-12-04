import { Router } from "express";
import { authRouter } from "./routers/auth.router.js";


const allRoutes = Router()

allRoutes.use("/", (req, res, next) => {
    try {
        return res.render("index", { title: "NodeJs Passport" })
    } catch (error) {
        next(error)
    }
})

allRoutes.use("/auth", authRouter)

export { allRoutes }
