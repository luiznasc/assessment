const express = require("express");
const cors = require("cors");
const searchProduct = require("./scraper.js");

const app = express();
const port = 3000;

app.use(cors());

app.get("/", function (req, res) {
  res.send("<p>Information on <a href=assessment>assessment</a></p>");
});

app.get("/assessment", function (req, res) {
  res.sendFile(__dirname + "/assessment.html");
});

app.get("/api/scrape", async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  const keyword = req.query.keyword;
  if (!keyword) {
    return res
      .status(400)
      .json({ error: "Missing keyword. Please provide one." });
  }

  searchProduct(keyword).then((response) => {
    console.log(response);
    res.status(200).json(response);
  });
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
