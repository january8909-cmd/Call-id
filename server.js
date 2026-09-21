const express = require("express");
const path = require("path");
const crypto = require("crypto");

const app = express();
const PORT = process.env.PORT || 10000;

// Demo-school-project storage.
// Tokens are invalidated permanently while this server instance is running.
const usedTokens = new Set();

app.use(express.static(path.join(__dirname, "public")));

app.get("/invite/:token", (req, res) => {
  const token = req.params.token;

  if (!/^[a-f0-9]{32}$/.test(token)) {
    return res.status(404).send("Invalid invitation.");
  }

  if (usedTokens.has(token)) {
    return res.status(410).send(`
      <!doctype html><html><head><meta charset="utf-8">
      <meta name="viewport" content="width=device-width,initial-scale=1">
      <title>Invitation Used</title></head>
      <body style="font-family:Arial;background:#090b10;color:white;text-align:center;padding:60px">
      <h1>Invitation already used</h1>
      <p>This video-call invitation has already been opened.</p>
      </body></html>
    `);
  }

  usedTokens.add(token);
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/api/new-invite", (req, res) => {
  const token = crypto.randomBytes(16).toString("hex");
  const base = `${req.protocol}://${req.get("host")}`;
  res.json({ url: `${base}/invite/${token}` });
});

app.get("/", (req, res) => {
  res.send(`
    <h2>Video Call Project</h2>
    <p>Create a new invitation at <a href="/api/new-invite">/api/new-invite</a>.</p>
  `);
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
