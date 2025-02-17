import Order from "@/ models/Order";
import { NextResponse } from "next/server";
import { db } from "@/ utils/db";

export async function POST(req){

    const data = await req.json();
    // console.log(data);
    try {

        const {customerDetails, totalPrice, cartItems, userId} = data;
        const {name, city, address, cardNumber, cardExpiry, cardCVV} = customerDetails;

        await db();

        const neworder = new Order({
            customer_full_name:name,
            customer_city:city,
            customer_address:address,
            order_items:cartItems,
            order_amount:totalPrice,
            order_date:Date.now(),
            customer_user_id:userId,
        })

        neworder.save();

        return NextResponse.json({message:"New Order is Created"},{status:200});
    } catch (error) {
        return NextResponse.json({message:"Error in creating order at route"},{status:501});
    }
}