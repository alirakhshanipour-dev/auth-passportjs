// import passport from "passport";
import { Strategy } from "passport-local"
import { UserModel } from "../models/user.model.js"
import { compareSync } from "bcrypt"
import { use } from "passport"


const passportInit = (passport) => {
    const authenticatedUser = async (username, password, done) => {
        try {
            const user = await UserModel.findOne({ username })
            //check if user not exists!
            if (!user) return done(null, false, { message: "not found user account!" })
            //check password
            if (compareSync(password, user.password)) return done(null, user)
            return done(null, false, { message: "username or password is not correct" })
        } catch (error) {
            done(error)
        }
    }
    const localStrategy = new Strategy({ usernameField: "username", passwordField: "password" }, authenticatedUser)
    const serializeUser = passport.serializeUser((user, done) => {
        return done(null, user.id)
    })
    const deserializeUser = passport.deserializeUser(async (id, done) => {
        const user = await UserModel.findOne({ _id: id })
        if (!user) return done(null, false, { message: "not found user account!!" })
        return done(null, user)
    })
    use("local", localStrategy, serializeUser, deserializeUser)

}

export { passportInit }