import { Schema, model } from "mongoose";

const UserSchema = new Schema({
    fullName: { type: String, requied: true },
    username: { type: String, required: true },
    email: { type: String, required: false },
    phone: { type: String, required: false },
    password: { type: String, required: true },
})

const UserModel = model("user", UserSchema, "users")
export { UserModel }