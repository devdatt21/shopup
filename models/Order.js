import mongoose, { Schema, model, models } from "mongoose";

const orderSchema = new Schema({
    customer_full_name : {
        type : String,
        required : true,
    },
    customer_city : {
        type : String,
    },
    customer_address : {
        type : String,
        required : true,
    },
    order_items : {
        type : [{name:String,price:Number, quantity:Number}],
    },
    order_amount : {
        type : Number,
    },
    order_date : {
        type : Date,
        default : Date.now(),
    },
    customer_user_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    }


})

const Order = models.Order || model("Order", orderSchema);

export default Order;