const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

app.use(express.static("public"));

let players = [
  { name: "Sudhi", score: 0, avatar: "avatars/Sudhi.jpg" },
  { name: "Sony", score: 0, avatar: "avatars/Sony.jpg" },
  { name: "Sanjay", score: 0, avatar: "avatars/Sanjay.jpg" },
  { name: "Navin", score: 0, avatar: "avatars/Navin.jpg" },
  { name: "Sanghaamitra", score: 0, avatar: "avatars/Sanghamitra.jpg" },
  { name: "Subrat", score: 0, avatar: "avatars/Subrat.jpg" },
  { name: "Harish", score: 0, avatar: "avatars/Harish.jpg" },
  { name: "Artun", score: 0, avatar: "avatars/Artun.jpg" },
];

io.on("connection", (socket) => {
  console.log("A user connected");
  socket.emit("scoreUpdate", players);

  socket.on("updateScore", (data) => {
    const player = players.find((p) => p.name === data.name);
    if (player) player.score = data.score;
    io.emit("scoreUpdate", players);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

const PORT = 3000;
http.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
