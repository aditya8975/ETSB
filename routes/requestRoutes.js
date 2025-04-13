import express from 'express';
import Request from '../model/Request.js';

const router = express.Router();

// Get all requests
router.get('/', async (req, res) => {
  const requests = await Request.find();
  res.json(requests);
});

// Submit a request
router.post('/', async (req, res) => {
  const request = new Request(req.body);
  await request.save();
  res.json(request);
});

export default router;
