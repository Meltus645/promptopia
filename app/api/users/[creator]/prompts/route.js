import { connectDB } from "@/utils/database";
import promptModel from "@/models/promptModel";

export const GET =async (_, {params: {creator}}) =>{
    try {
        await connectDB();
        const prompts =await promptModel.find({creator}).populate('creator');
        return new Response(JSON.stringify(prompts), {status: 200});
    } catch ({message}) {
        return new Response(JSON.stringify({message}), {status: 500});
    }
}