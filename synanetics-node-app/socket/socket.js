/**
 * Socket IO
 */
async function socketIO(io) {
  io.on('connection', (socket) => {
    /**
     * Roles product
     */
    socket.on('product', (ms) => {
      io.emit('product', ms);
    });

    socket.on('updateProduct', (ms) => {
      io.emit('updateProduct', ms);
    });

    socket.on('deleteProduct', (ms) => {
      io.emit('deleteProduct', ms);
    });

    /**
     * User socket
     */
    socket.on('user', (ms, reg) => {
      io.emit('user', ms, reg);
    });

    socket.on('updateUser', (ms, reg) => {
      io.emit('updateUser', ms, reg);
    });

    socket.on('deleteUser', (ms, reg) => {
      io.emit('deleteUser', ms, reg);
    });

    /**
     * Roles product
     */
    socket.on('basket', (ms) => {
      io.emit('basket', ms);
    });

    socket.on('updateBasket', (ms) => {
      io.emit('updateBasket', ms);
    });

    socket.on('deleteBasket', (ms) => {
      io.emit('deleteBasket', ms);
    });
  });
  return io;
}
module.exports.socketIO = socketIO;
