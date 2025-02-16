import mongoose from "mongoose"

let isConnected=false;

export const db = async () => {
    //Mongoose removes any unknown fields from query filters that are not defined in the schema.
    mongoose.set('strictQuery',true);

    if(isConnected)
    {
        console.log("MongoDB is already connected");
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName:"ecommerce",
            useNewUrlParser:true,
            useUnifiedTopology:true,
        })
        
        isConnected=true;
        console.log("mongoDB is connected");
    } catch (error) {
        console.log("Error fron connectToDB",error);
    }
}