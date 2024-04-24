import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    message: { type: String, required: true },
    //createAt, updateAT
}, { timestamps: true })

const Chat = mongoose.model("Chat", chatSchema)

export default Chat;