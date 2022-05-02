const express = require("express");
const Article = require("../models/article");
const router = express.Router();

router.get("/new", (req, res) => {
  const article = new Article();
  res.render("articles/new", { article });
});

router.get("/:slug", async (req, res) => {
  const { slug } = req.params;
  const article = await Article.findOne({ slug });
  article == null
    ? res.redirect("/")
    : res.render("articles/show", { article });
});

router.post("/", async (req, res) => {
  const { title, description, markdown } = req.body;
  const article = new Article({
    title,
    description,
    markdown,
  });

  try {
    const savedArticle = await article.save();
    res.redirect(`/articles/${savedArticle.slug}`);
  } catch (e) {
    res.render("articles/new", { article });
  }
});

module.exports = router;
