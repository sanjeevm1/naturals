
const express = require("express")
require("dotenv").config();
require("./db/init.js")

const server = express();

server.set("view engine","ejs");

server.use(express.json());
server.use(express.static("static"))

server.use("/",require("./router/pages.js"))
server.use("/saveBill",require("./router/saveBill.js"))
server.use("/trans",require("./router/viewTrans.js"))

server.listen(process.env.PORT,()=>{
    console.log(`Server listened @ ${process.env.PORT}`)
})