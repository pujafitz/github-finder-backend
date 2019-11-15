const express = require("express");
const app = express();
require("dotenv").config();
const axios = require("axios");

app.use(express.static("public"));

app.use("/search/users", async (req, res) => {
  const { q } = req.query;
  const text = encodeURI(q);
  const { data } = await axios.get(
    `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
  );
  res.json(data);
});

app.use("/users/:username", async (req, res) => {
  let { username } = req.params;
  username = encodeURI(username);
  const { data } = await axios.get(
    `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
  );
  res.json(data);
});

app.get("*", (req, res) => res.sendfile("/public/index.html"));

app.listen(3300, () => console.log("Server is up on port 3300!"));
