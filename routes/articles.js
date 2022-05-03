const express = require("express");
const Article = require("../models/article");
const router = express.Router();

router.get("/new", (req, res) => {
  const article = new Article();
  res.render("articles/new", { article });
});

router.get("/edit/:id", async (req, res) => {
  const { id } = req.params;
  const article = await Article.findById(id);
  res.render("articles/new", { article });
});

router.get("/:slug", async (req, res) => {
  const { slug } = req.params;
  const article = await Article.findOne({ slug });
  article == null
    ? res.redirect("/")
    : res.render("articles/show", { article });
});

router.post(
  "/",
  async (req, res, next) => {
    req.article = new Article();
    next();
  },
  saveAndRedirect("new")
);

router.put(
  "/:id",
  async (req, res, next) => {
    const { id } = req.params;
    req.article = Article.findById(id);
    next();
  },
  saveAndRedirect("edit")
);

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await Article.findByIdAndDelete(id);
  res.redirect("/");
});

function saveAndRedirect(path) {
  return async (req, res) => {
    const { title, description, markdown } = req.body;
    let article = req.article;
    article.title = title;
    article.description = description;
    article.markdown = markdown;

    try {
      const savedArticle = await article.save();
      res.redirect(`/articles/${savedArticle.slug}`);
    } catch (e) {
      res.render(`articles/${path}`, { article });
    }
  };
}

module.exports = router;
