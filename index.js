const express = require("express");
const socket = require("socket.io");
const http = require("http");
const path = require("path");
const app = express();

const server = http.createServer(app);

const io = socket(server);
io.on("connection", function (socket) {
    console.log("connected");
})

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.get("/", function (req, res) {
    res.render("index");
})

server.listen(3000);