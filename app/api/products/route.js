import { db } from "@/ utils/db";
import Products from "@/ models/Products";
import { NextResponse } from "@/ node_modules/next/server";

export const GET = async (req) => {
    
    try {
      await db();

      const products = await Products.find({});

      return new Response(JSON.stringify(products));

    } catch (error) {
      
    }
}

export async function POST (req){

    const body = await req.json();

    try {
      
      await db();

      const {name ,description, price, image} = body;

      const newProduct = new Products({
        name : name,
        description : description,
        price : price,
        image : image,
      })

      await newProduct.save();

      return NextResponse.json({message:"product created"},{status:200})

    } catch (error) {
      return NextResponse.json({message:"Error in creating new product"},{status:501})
    }
}