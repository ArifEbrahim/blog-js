const express = require("express");
const app = express();
const articleRouter = require("./routes/articles");
const mongoose = require("mongoose");
require("dotenv").config();
const Article = require("./models/article");
const methodOverride = require('method-override')

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'))

app.get("/", async (req, res) => {
  const articles = await Article.find().sort({ createdAt: "desc" });
  res.render("articles/index", { articles });
});

app.use("/articles", articleRouter);

app.listen(3000);
