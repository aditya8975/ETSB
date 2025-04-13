import express from 'express';
import Admin from '../model/Admin.js'
const router = express.Router();

router.get('/', async (req, res) => {
    try {
      const admins = await Admin.find();
      res.json(admins);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch admins' });
    }
  });

  export default router;