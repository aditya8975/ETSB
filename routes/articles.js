import express from 'express';
const router = express.Router();
// const Article = require('../models/Article');
import Article from '../model/Articles.js';
// Get all articles
router.get('/', async (req, res) => {
  try {
    const articles = await Article.find();
    res.json(articles);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch articles' });
  }
});

// Add an article
router.post('/', async (req, res) => {
  try {
    const article = new Article(req.body);
    await article.save();
    res.status(201).json(article);
  } catch (err) {
    res.status(400).json({ error: 'Failed to add article' });
  }
});

// Delete an article
router.delete('/:id', async (req, res) => {
  try {
    await Article.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(400).json({ error: 'Failed to delete article' });
  }
});

export default router;
