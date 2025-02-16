import {Schema, model, models} from "mongoose"

const cartSchema = new Schema({
    uid : {
        type : String,
        unique:true,
        required:true,
    },
    products : {
        type : Array,
        default:[],
    }
})

const Cart= models.Cart || model("Cart", cartSchema);
export default Cart;

