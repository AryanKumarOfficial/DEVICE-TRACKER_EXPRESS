const express = require("express");
const soket = require("socket.io");
const http = require("http");
const path = require("path");
const app = express();

const server = http.createServer(app);

const io = soket(server);

app.set("view engine", "ejs");
app.set(express.static(path.join(__dirname, "public"))); 

app.get("/", function (req, res) {
    res.status(200).json({
        name: "john"
    })
})

server.listen(3000);