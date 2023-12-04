// import passport from "passport";
import passportLocal from "passport-local"
import { UserModel } from "../models/user.model.js"
import { compareSync } from "bcrypt"
const { Strategy } = passportLocal


const passportInit = (passport) => {
    const authenticatedUser = async (username, password, done) => {
        try {
            const user = await UserModel.findOne({ username })
            if (!user) {
                done(null, false, { message: "User account not found!" })
            }

            const isPasswordValid = compareSync(password, user.password)
            if (isPasswordValid) {
                done(null, user)
            } else {
                done(null, false, { message: "Incorrect username or password" })
            }
        } catch (error) {
            done(error)
        }
    }

    const localStrategy = new Strategy({ usernameField: "username", passwordField: "password" }, authenticatedUser)

    const serializeUser = (user, done) => {
        done(null, user.id);
    };

    const deserializeUser = async (id, done) => {
        try {
            const user = await UserModel.findOne({ _id: id });
            if (!user) {
                done(null, false, { message: "User account not found" });
            } else {
                done(null, user);
            }
        } catch (error) {
            console.error("Error in deserializeUser:", error);
            done(error);
        }
    };

    passport.use("local", localStrategy)
    passport.serializeUser(serializeUser)
    passport.deserializeUser(deserializeUser)
}

export { passportInit }
