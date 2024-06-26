const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Chat=require("./models/chats");
async function main() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
        console.log("Db connected");
    } catch (err) {
        console.error("Db connection error:", err);
    }
}
main();
const chats = [
    {
        from: "Riya",
        to: "Sujal",
        message: "Hey Sujal, how are you?",
        created_at: new Date("2024-06-01T10:00:00Z")
    },
    {
        from: "Het",
        to: "Riya",
        message: "Hi Riya, want to grab coffee?",
        created_at: new Date("2024-06-02T11:30:00Z")
    },
    {
        from: "Sujal",
        to: "Het",
        message: "Sure, let's meet at 3 PM.",
        created_at: new Date("2024-06-03T14:00:00Z")
    },
    {
        from: "Riya",
        to: "Het",
        message: "That sounds great!",
        created_at: new Date("2024-06-04T09:45:00Z")
    },
    {
        from: "Het",
        to: "Sujal",
        message: "Can you join us for coffee?",
        created_at: new Date("2024-06-05T13:15:00Z")
    },
    {
        from: "Sujal",
        to: "Riya",
        message: "Yes, I'll be there.",
        created_at: new Date("2024-06-06T16:30:00Z")
    },
    {
        from: "Riya",
        to: "Het",
        message: "Looking forward to it!",
        created_at: new Date("2024-06-07T12:00:00Z")
    },
    {
        from: "Het",
        to: "Riya",
        message: "See you soon.",
        created_at: new Date("2024-06-08T08:15:00Z")
    },
    {
        from: "Sujal",
        to: "Het",
        message: "Don't forget to bring the documents.",
        created_at: new Date("2024-06-09T10:45:00Z")
    },
    {
        from: "Riya",
        to: "Sujal",
        message: "Will do. Thanks for reminding.",
        created_at: new Date("2024-06-10T14:00:00Z")
    }
];
 Chat.insertMany(chats);

