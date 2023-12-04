class UserController {
    async register(req, res, next) {
        try {
            const { fullname: fullName, username, password } = req.body

            res.send({})
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