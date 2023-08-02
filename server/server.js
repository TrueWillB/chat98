const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const path = require("path");
const http = require("http");
const { Server } = require("socket.io");
const { authMiddleware } = require("./utils/auth");

const { typeDefs, resolvers } = require("./schemas");
const db = require("./config/connection");

const PORT = process.env.PORT || 3001;
const app = express();
//Create http server to work with socket.io
const httpServer = http.createServer(app);
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//paths subject to change
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

// paths subject to change
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

const startApolloServer = async () => {
  await server.start();
  server.applyMiddleware({ app });

  db.once("open", () => {
    //create socket.io server
    const socketServer = new Server(httpServer, {
      //allows server-side on port 3001 to accept connections from client-side on port 3000.
      cors: {
        // origin: "http://localhost:3000",
        origin: "*",

        methods: ["GET", "POST"],
      },
    });
    //handle new socket connections
    socketServer.on("connection", (socket) => {
      console.log("User connected: ", socket.id);
      // handle message events and emits them to ALL connected clients
      socket.on("message", ({ senderId, receiverId, content }) => {
        console.log(
          `Message received from ${senderId} to ${receiverId}: ${content}`
        );
        socketServer.emit("message", { senderId, receiverId, content });
      });
      // handle disconnect events
      socket.on("disconnect", () => {
        console.log("User disconnected: ", socket.id);
      });
    });
    httpServer.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(
        `Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`
      );
      console.log(`Socket.io server is running on port ${PORT}`);
    });
  });
};

startApolloServer();
