import NextAuth from "next-auth";
import UserModel from "@/models/userModel";
import { connectDB } from "@/utils/database";
import GoogleProvider from 'next-auth/providers/google';


const handle =NextAuth({
    providers: [GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })],
    
    callbacks: {
        
        async session({session}){
            try {
                const sessionUser =await UserModel.findOne({email: session.user.email});
                session.user.id =sessionUser._id.toString();
                return session;
            } catch (error) {
                console.log(error);
            }
        },

        async signIn({profile}){
            try {
                await connectDB();
                const userExists =await UserModel.findOne({email: profile.email});
                if(!userExists){
                    await UserModel.create({
                        email: profile.email,
                        username: profile.name.replace(" ", "").toLowerCase(),
                        image: profile.picture,
                    })
                }
                return true;
                
            } catch (error) {
                console.log(error);
                return false;
            }
        }
    }
})

export {handle as GET, handle as POST};