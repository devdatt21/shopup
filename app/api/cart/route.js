import Cart from "@/ models/Cart";
import { NextResponse } from "next/server";
import { db } from "@/ utils/db";

export async function GET(req){
    const {searchParams } = new URL(req.url);
    const uid = searchParams.get("uid");
    try {
        await db();

        const cartItems = await Cart.findOne({uid});
        if(!cartItems)
            return new Response(JSON.stringify({error:"no cartitems with given user id"}, {status:404}))

        return new Response(JSON.stringify(cartItems));

    } catch (error) {
        console.log(error, "Error in getting cartItems from db");
        
    }
}

export async function POST(req){
    const body = await req.json();
    const {userId, cartItems} = body;

    

    try {
        await db();
       
        
        const updateCart = await Cart.findOneAndUpdate(
            {uid:userId},
            {$set : {products : cartItems}},
            {new :true, upsert : true},    
        )

        return NextResponse.json(
            {message : "Cart Updated", cart : updateCart}, 
            {status : 200}
        );

    } catch (error) {
        console.log("Error in cart Upadation " , error);
        return NextResponse.json({message:"Error in Cart updation"},{status:501});
    }


}