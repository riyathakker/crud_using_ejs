const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const Chat=require("./models/chats");
const methodOverride = require('method-override');

app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));

async function main() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
        console.log("Db connected");
    } catch (err) {
        console.error("Db connection error:", err);
    }
}
main();

//show chats
app.get("/chats", async (req, res) => {
   let newchats = await Chat.find();
   res.render("index.ejs",{newchats});
});

//new chat
app.get("/chats/new", (req,res)=>{
res.render("new.ejs");
});

//add new chat
app.post("/newchats", async (req,res)=>{
    let {from ,to ,message}=req.body;
    let newchat = new Chat({
        from: from,
        to:to,
        message:message,
        created_at: new Date()
    });
    await newchat.save(); 
    res.redirect("/chats");
});

//edit route
app.get("/chats/:id/edit",async(req,res)=>{
let id =req.params.id;
let chat = await Chat.findById(id);
res.render("edit.ejs",{chat});
});

//final update route
app.put("/chats/:id", async (req, res) => {
    let id = req.params.id;
    let { from, to, message } = req.body;
    await Chat.findByIdAndUpdate(id, { from, to, message }, { new: true });
    res.redirect("/chats");
});

//delete req
app.delete("/chats/:id", async(req,res)=>{
    try {
        let id = req.params.id;
        await Chat.findByIdAndDelete(id);
        res.redirect("/chats");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error deleting chat");
    }
});
//root route
app.get("/",(req,res)=>{
    res.send("root working");
});
const port= process.env.PORT ||8080;
app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});
