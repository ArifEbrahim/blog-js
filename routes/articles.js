const express = require("express");
const Article = require("../models/article");
const router = express.Router();

router.get("/new", (req, res) => {
  const article = new Article();
  res.render("articles/new", { article });
});

router.get('/:id', (req, res) => {
  
})

router.post("/", async (req, res) => {
  const { title, description, markdown } = req.body;
  const article = new Article({
    title,
    description,
    markdown,
  });

  try {
    const savedArticle = await article.save();
    res.redirect(`/articles/${savedArticle.id}`);
  } catch (e) {
    res.render("articles/new", { article });
  }
});

module.exports = router;
