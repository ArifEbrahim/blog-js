const mongoose = require("mongoose");
const marked = require("marked");
const slugify = require("slugify");
const createDOMPurify = require("dompurify");
const { JSDOM } = require("jsdom");
const window = new JSDOM("").window;
const DOMPurify = createDOMPurify(window);

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  markdown: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  cleanHTML: {
    type: String,
    required: true,
  },
});

articleSchema.pre("validate", function (next) {
  if (this.title) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  if (this.markdown) {
    this.cleanHTML = DOMPurify.sanitize(marked.parse(this.markdown));
  }
  next();
});

module.exports = mongoose.model("Article", articleSchema);
