import { UserModel } from "../../models/user.model.js"
import HttpStatus from "http-status-codes"
import { hashSync } from "bcrypt"

class UserController {
    async register(req, res, next) {
        try {

            const { fullName, username, password } = req.body
            const hashedPassword = hashSync(password, 10)

            // check if user exists
            const userExist = await UserModel.findOne({ username })
            if (userExist) return res.status(HttpStatus.BAD_REQUEST).json({
                statusCode: HttpStatus.BAD_REQUEST,
                data: {
                    message: "there is a user with this username."
                }
            })

            // create user method
            const user = await UserModel.create({
                fullName, username, password: hashedPassword
            })
            // if (user) return res.status(HttpStatus.CREATED).json({
            //     statusCode: HttpStatus.CREATED,
            //     data: {
            //         message: "user created successfully.",
            //         user
            //     }
            // })
            res.redirect('/')
        } catch (error) {
            next(error)
        }
    }
    async login(req, res, next) {
        try {
            res.send({})
        } catch (error) {
            next(error)
        }
    }
    async getUserProfile(req, res, next) {
        try {
            res.send({})
        } catch (error) {
            next(error)
        }
    }
}

const user_controller = new UserController()

export { user_controller }