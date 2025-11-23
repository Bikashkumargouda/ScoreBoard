const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

app.use(express.static("public"));
app.use(express.json());

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

  // Update ALL scores at once
  socket.on("updateAllScores", (updatedPlayers) => {
    updatedPlayers.forEach((updated) => {
      const p = players.find((x) => x.name === updated.name);
      if (p) p.score = updated.score;
    });
    io.emit("scoreUpdate", players);
  });

  // Reset all scores
  socket.on("resetScores", () => {
    players.forEach((p) => (p.score = 0));
    io.emit("scoreUpdate", players);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
