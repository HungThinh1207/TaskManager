import Conversation from "../models/conversation.js"
import Chat from "../models/chat.js"
import { getReceiverSocketId } from "../socket/socket.js";


export const sendChat = async (req, res) => {
    try {

        const { message } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req?.user?.userId;
        console.log(senderId)

        console.log(senderId)

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] },
        })

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId],
            })
        }

        const newChat = new Chat({
            senderId,
            receiverId,
            message,
        })

        if (newChat) {
            conversation.messages.push(newChat._id)
        }

        await Promise.all([conversation.save(), newChat.save()]);
        //function socket
        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) {
            // io.to(<socket_id>).emit() used to send events to specific client
            io.to(receiverSocketId).emit("newChat", newChat);
        }
        res.status(201).json(newChat)

    } catch (error) {
        console.log("Co loi o send chat controller,", error.message)
        res.status(500).json("Co loi")
    }
}

export const getChat = async (req, res) => {
    try {
        const { id: userToChatId } = req.params;
        const senderId = req.user.userId;
        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, userToChatId] },
        }).populate("messages")

        if (!conversation.participants) return res.status(400).json([])
        
        const messages = conversation.messages
        res.status(200).json(messages)

    } catch (error) {
        console.log("Co loi o get chat controller,", error.message)
        res.status(500).json("Co loi")
    }
}


