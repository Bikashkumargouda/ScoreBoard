const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

app.use(express.static("public"));
app.use(express.json());

let players = [
  { name: "Mr. Sudhi", score: 0, avatar: "avatars/Sudhi.jpg" },
  { name: "Ms. Sony", score: 0, avatar: "avatars/Sony.jpg" },
  { name: "Mr. Sanjaya", score: 0, avatar: "avatars/Sanjay.jpg" },
  { name: "Mr. Nabin", score: 0, avatar: "avatars/Navin.jpg" },
  { name: "Ms. Sanghamitra", score: 0, avatar: "avatars/Sanghamitra.jpg" },
  { name: "Mr. Subrata", score: 0, avatar: "avatars/Subrat.jpg" },
  { name: "Mr. Harish", score: 0, avatar: "avatars/Harish.jpg" },
  { name: "Mr. Atanu", score: 0, avatar: "avatars/Artun.jpg" },
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
