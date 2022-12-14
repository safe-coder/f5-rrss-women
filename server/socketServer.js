let users = [];

const socketServer = (socket) => {
  socket.on("joinUser", (id) => {
    users.push({ id, socketId: socket.id });
  });

  socket.on("disconnect", () => {
    users = users.filter((user) => user.socketId !== socket.id);
  });

  //// Like Post

  socket.on("likePost", (newPost) => {
    const ids = [...newPost.user.friends, newPost.user._id];
    const clients = users.filter((user) => ids.includes(user.id));

    if (clients.length > 0) {
      clients.forEach((client) => {
        socket.to(`${client.socketId}`).emit("likeToClient", newPost);
      });
    }
  });

  //// Unlike Post

  socket.on("unlikePost", (newPost) => {
    const ids = [...newPost.user.friends, newPost.user._id];
    const clients = users.filter((user) => ids.includes(user.id));

    if (clients.length > 0) {
      clients.forEach((client) => {
        socket.to(`${client.socketId}`).emit("unlikeToClient", newPost);
      });
    }
  });

  //// Crear comentario

  socket.on("createComment", (newPost) => {
    console.log(newPost);
    const ids = [...newPost.user.friends, newPost.user._id];
    const clients = users.filter((user) => ids.includes(user.id));

    if (clients.length > 0) {
      clients.forEach((client) => {
        socket.to(`${client.socketId}`).emit("createCommentToClient", newPost);
      });
    }
  });

  //// Borrar comentario

  socket.on("deleteComment", (newPost) => {
    const ids = [...newPost.user.friends, newPost.user._id];
    const clients = users.filter((user) => ids.includes(user.id));

    if (clients.length > 0) {
      clients.forEach((client) => {
        socket.to(`${client.socketId}`).emit("deleteCommentToClient", newPost);
      });
    }
  });

  //// Seguir usuaria

  socket.on("addfriend", (newUser) => {
    const user = users.find((user) => user.id === newUser._id);
    user && socket.to(`${user.socketId}`).emit("addfriendToClient", newUser);
  });

  //// Dejar de seguir

  socket.on("unfriend", (newUser) => {
    const user = users.find((user) => user.id === newUser._id);
    user && socket.to(`${user.socketId}`).emit("unfriendToClient", newUser);
  });
};

export default socketServer;
