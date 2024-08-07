const express = require("express");
const socketIO = require("socket.io");
const http = require("http");
const path = require("path");
const os = require("os");

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const port = 3000;

// Function to get the IPv4 address
const getIPv4Address = () => {
    const interfaces = os.networkInterfaces();
    for (let interfaceName in interfaces) {
        for (let iface of interfaces[interfaceName]) {
            if (iface.family === 'IPv4' && !iface.internal) {
                return iface.address;
            }
        }
    }
    return '127.0.0.1';
};

// Middleware
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.get("/", (req, res) => {
    res.render("index");
});

// Socket.io connection
io.on("connection", (socket) => {
    socket.on("send-location", (data) => {
        io.emit("receive-location", { id: socket.id, ...data });
    });

    socket.on("disconnect", () => {
        io.emit("user-disconnected", socket.id);
    });
});

// Start server
server.listen(port, () => {
    const IPv4 = getIPv4Address();
    console.log(`Server is listening on:\n http://${IPv4}:${port}\n http://localhost:${port}`);
});
