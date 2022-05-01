const express = require("express");
const app = express();
const articleRouter = require("./routes/articles");
const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.set("view engine", "ejs");

app.use("/articles", articleRouter);

app.get("/", (req, res) => {
  const articles = [{
    title: 'Test article',
    createdAt: new Date(),
    description: 'Test description'
  }]
  res.render("articles/index", {articles: articles});
});

app.listen(5000);
