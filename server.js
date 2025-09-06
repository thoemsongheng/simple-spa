const express = require("express");
const path = require("path");
const fs = require("fs");

const server = express();
const port = process.env.PORT || 3002;

server.use(
  "/script",
  express.static(path.resolve(__dirname, "frontend", "script"))
);

server.get(/^\/(?!script).*/, (req, res) => {
  res.sendFile(path.resolve(__dirname, "frontend", "index.html"));
});

server.listen(port, () => console.log("Server is running..."));
