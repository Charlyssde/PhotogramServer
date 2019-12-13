module.exports = (router, io) => {

  io.on('connection', (socket) => {
    socket.on('message', (msg) => {
      console.log(msg);
      console.log(msg.message);
      io.emit(msg.destinatary, msg);
    });
  });
  
}