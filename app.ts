import express from 'express';
import http from 'http';
import { Server, Socket } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public'));

io.on('connection', (socket: Socket) => {
    console.log('ユーザーが接続しました');

    socket.on('disconnect', () => {
        console.log('ユーザーが切断しました');
    });

    socket.on('offer', (offer: RTCSessionDescriptionInit) => {
        socket.broadcast.emit('offer', offer);
    });

    socket.on('answer', (answer: RTCSessionDescriptionInit) => {
        socket.broadcast.emit('answer', answer);
    });

    socket.on('candidate', (candidate: RTCIceCandidateInit) => {
        socket.broadcast.emit('candidate', candidate);
    });
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`サーバーがポート${port}で起動しました`);
});