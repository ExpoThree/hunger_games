import http from "http";

const port = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("OK\n");
});

server.listen(port, "0.0.0.0", () => {
  console.log(`Server running on port ${port}`);
});
