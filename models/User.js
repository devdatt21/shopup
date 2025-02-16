import {Schema, model, models} from "mongoose"

const userSchema = new Schema({
    email : {
        type:String,
        unique : [true,"Email already required"],
        required : [true, "Email is required"],
    },
    password : {
        type : String,
        required : [true, "Password is required"],
    }
})

const User = models.User || model("User", userSchema);

export default User;