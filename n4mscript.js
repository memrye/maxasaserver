const maxAPI = require('max-api');
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });
const express = require('express');
const app = express();
app.set('view engine', 'ejs');
const port = 8000;

let sockets = [];
wss.on('connection', ws => {
  sockets.push(ws);
  ws.on('close', () => sockets = sockets.filter(s => s !== ws));
});

maxAPI.addHandler('buffer', (head, ...samples) => {
  // head is "1" or "2"
  const buf = Buffer.from(new Float32Array(samples).buffer);
  sockets.forEach(s => s.readyState === 1 && s.send(buf));
});

app.get('/', (req, res) => {
  res.render('index.ejs')
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});