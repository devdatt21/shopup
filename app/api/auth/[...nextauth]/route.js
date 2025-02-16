import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "@/ utils/db";
import User from "@/ models/User";
import bcrypt from "bcrypt";


export const authOptions = {
    providers : [
        CredentialsProvider({
            name : "Credentials",
            credentials : {
                email : {label: "Email", type : "text"},
                password : {label:"Password", type:"password"},
            },
            //main logic to do authentication 
            async authorize(credentials){
                await db();
                const user = await User.findOne({email:credentials.email});
                if(!user) 
                    throw new Error("No user found");

                const isValid = await bcrypt.compare(credentials.password, user.password);
                if(!isValid) 
                    throw new Error("Invalid Password");
                
                //this will be stored in JWT token 
                //renaming _id to id because JWT requires name id
                return {id:user._id , email:user.email};
            }
        }),
    ],
    callbacks : {
        jwt : async({token, user}) => {
            if(user) token.id = user.id;
            return token;
        },
        //now in client side session.user.id is available 
        session : async({session,token}) => {
            session.user.id = token.id;
            return session;
        }
    },
    session : {
        maxAge : 60*15
    },
    secret : process.env.NEXTAUTH_SECRET,   
};

export const GET = NextAuth(authOptions);
export const POST = NextAuth(authOptions);