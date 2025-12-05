
const port = Number(process.env.PORT) || 3000;

const server = http.createServer((req, res) => {
  if (req.url === "/health") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    return res.end("OK");
  }
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Hello from hunger-games\n");
});

server.listen(port, "0.0.0.0", () =>
  console.log(`Listening on ${port}`)
);