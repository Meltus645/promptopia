import promptModel from "@/models/promptModel";
import { connectDB } from "@/utils/database";

export async function POST(req) {
  try {
    await connectDB();
    const { userId, prompt, tag } = await req.json();
    const newPrompt = new promptModel({ creator: userId, prompt, tag });
    await newPrompt.save();
    return new Response(JSON.stringify(newPrompt), {status: 201});
  } catch ({message}) {
    return new Response(JSON.stringify({message}), {status: 400});
  }
}