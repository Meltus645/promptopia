import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
    email: {
        type: String,
        unique: [true, "Email already exists"],
        required: [true, "Email is required"]
    },
    username: {
        type: String,
        required: [true, "Username required"],
        match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9]+(?<![_.])$/, "Username should contain 8-20 unique alphanumeric letters"]
    },
    image: {
        type: String,
    }
});

const UserModel =models.User || model("User", userSchema);

export default UserModel;