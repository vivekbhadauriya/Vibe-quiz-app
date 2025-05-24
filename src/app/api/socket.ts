import { Server } from 'socket.io';
import { NextApiRequest, NextApiResponse } from 'next';

let io: Server;
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const socketWithServer = res.socket as typeof res.socket & { server: any };
  if (!socketWithServer || !socketWithServer.server) {
    res.status(500).end('Socket server not available');
    return;
  }
  if (!socketWithServer.server.io) {
    io = new Server(socketWithServer.server);
    socketWithServer.server.io = io;
  } else {
    io = socketWithServer.server.io;
  }
  res.end();
}
export { io };