import mongoose from "mongoose";

let isConnected =false;

export const connectDB =async () =>{
    mongoose.set('strictQuery', true);
    if(isConnected){
        console.log("Mongodb is connected already");
        return;
    }
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: 'shared_prompts',
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        isConnected =true;
    } catch (error) {
        console.log(error);
    }
};