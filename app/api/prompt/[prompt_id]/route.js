

import { connectDB } from "@/utils/database";
import promptModel from "@/models/promptModel";

export const GET =async (_, {params: {prompt_id}}) =>{
    try {
        await connectDB();
        const promptFound =await promptModel.findById(prompt_id).populate('creator');
        return new Response(JSON.stringify(promptFound? promptFound: {message: 'Prompt not found'}), {status: promptFound?200: 404});
    } catch ({message}) {
        return new Response(JSON.stringify({message}), {status: 500});
    }
}

export const PATCH =async (req, {params: {prompt_id}}) =>{
    try {
        await connectDB();
        const promptFound =await promptModel.findById(prompt_id);
        if(!promptFound) return new Response(JSON.stringify({message: "Prompt not found"}), {status: 404});
        const {prompt, tag} =await req.json();
        promptFound.tag =tag;
        promptFound.prompt =prompt;
        await promptFound.save();
        return new Response(JSON.stringify(promptFound), {status: 200});
    } catch ({message}) {
        return new Response(JSON.stringify({message}), {status: 500});
    }
}

export const DELETE =async (_, {params: {prompt_id}}) =>{
    try {
        await connectDB();
        await promptModel.findByIdAndRemove(prompt_id);
        return new Response(JSON.stringify({message: "Prompt deleted successfully"}), {status: 204});
    } catch ({message}) {
        return new Response(JSON.stringify({message}), {status: 500});
    }
}