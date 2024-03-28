"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server);
app.use(express_1.default.static('public'));
io.on('connection', (socket) => {
    console.log('ユーザーが接続しました');
    socket.on('disconnect', () => {
        console.log('ユーザーが切断しました');
    });
    socket.on('offer', (offer) => {
        socket.broadcast.emit('offer', offer);
    });
    socket.on('answer', (answer) => {
        socket.broadcast.emit('answer', answer);
    });
    socket.on('candidate', (candidate) => {
        socket.broadcast.emit('candidate', candidate);
    });
});
const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`サーバーがポート${port}で起動しました`);
});
