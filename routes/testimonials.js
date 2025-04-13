import express from 'express';
const router = express.Router();
// const Testimonial = require('../models/Testimonial');
import Testimonial from '../model/Testimonials.js';
// Get all testimonials
router.get('/', async (req, res) => {
  try {
    const testimonials = await Testimonial.find();
    res.json(testimonials);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch testimonials' });
  }
});

// Add a testimonial
router.post('/', async (req, res) => {
  try {
    const testimonial = new Testimonial(req.body);
    await testimonial.save();
    res.status(201).json(testimonial);
  } catch (err) {
    res.status(400).json({ error: 'Failed to add testimonial' });
  }
});

// Delete a testimonial
router.delete('/:id', async (req, res) => {
  try {
    await Testimonial.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(400).json({ error: 'Failed to delete testimonial' });
  }
});

export default router;
