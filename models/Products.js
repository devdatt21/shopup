import {Schema, model, models} from "mongoose"

const productSchema = new Schema({
    name : {
        type:String,
        required:[true,"name is required"],
    },
    description : {
        type:String,
    },
    price : {
        type:Number,
        required:[true, "Price is required"],
    },
    image : {
        type : String,
        required : [true, "Image is required"],
    }
})

const Products = models.Products || model("Products",productSchema);

export default Products;