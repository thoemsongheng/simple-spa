const express = require("express");
const path = require("path");

const server = express();
const port = process.env.PORT || 3002;

server.use(
  "/static",
  express.static(path.resolve(__dirname, "frontend", "static"))
);

server.get(/^\/(?!static).*/, (req, res) => {
  res.sendFile(path.resolve(__dirname, "frontend", "index.html"));
});

server.listen(port, () => console.log("Server is running..."));
