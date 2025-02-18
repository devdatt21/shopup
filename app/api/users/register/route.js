import {db} from "@/ utils/db";
import User from "@/ models/User";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req) {

    const body =  await req.json();

  try {

    await db();

    const {email, password, cpassword} = body;
    const existingUser = await User.findOne({email});

    if(existingUser) 
        return NextResponse.json({message : "User already exists"},{status:400});

    const hashedPassword = await bcrypt.hash(password,10);

    const newUser = new User({
        email, 
        password : hashedPassword
    });

    await newUser.save();

    return NextResponse.json({
        message:"New user is created"}, 
        {status:200}
    );


  } catch (error) {

    console.log("error in creating new user", error);
    return NextResponse.json({message:"Error in creating new user"},{status:501});

  }
}



