import { Schema, model, models } from "mongoose";

const promptSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    prompt: { 
        type: String,
        required: [true, "Prompt required"],
    },
    tag: {
        type: String,
        required: [true, "Tag required"],
    }
});

const promptModel =models.Prompt || model("Prompt", promptSchema);

export default promptModel;