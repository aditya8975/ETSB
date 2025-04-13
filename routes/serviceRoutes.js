import express from 'express';
import Service from '../model/Service.js';

const router = express.Router();

// Get all services
router.get('/', async (req, res) => {
  const services = await Service.find();
  res.json(services);
});

// Add a service
router.post('/', async (req, res) => {
  const service = new Service(req.body);
  await service.save();
  res.json(service);
});

// Delete a service
router.delete('/:id', async (req, res) => {
  await Service.findByIdAndDelete(req.params.id);
  res.json({ message: 'Service deleted' });
});

export default router;
