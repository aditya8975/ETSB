import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import serviceRoutes from './routes/serviceRoutes.js';
import requestRoutes from './routes/requestRoutes.js';
import Articles from './routes/articles.js';
import testimonials from './routes/testimonials.js';
import Admin from './routes/admin.js'
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

await connectDB();
// API Routes
app.use('/api/services', serviceRoutes);
app.use('/api/requests', requestRoutes);
app.use('/api/testimonials',testimonials);
app.use('/api/articles', Articles);
app.use('/api/admins', Admin);

// Add to server.js after other schemas
const visitorSchema = new mongoose.Schema({
    count: { type: Number, default: 0 },
  });
  const Visitor = mongoose.model('Visitor', visitorSchema);
  
  // Increment visitor count
  app.get('/api/visitors', async (req, res) => {
    let visitor = await Visitor.findOne();
    if (!visitor) {
      visitor = new Visitor({ count: 1 });
    } else {
      visitor.count += 1;
    }
    await visitor.save();
    res.json({ count: visitor.count });
  });
  
  // Get visitor count
  app.get('/api/visitor-count', async (req, res) => {
    const visitor = await Visitor.findOne();
    res.json({ count: visitor ? visitor.count : 0 });
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
