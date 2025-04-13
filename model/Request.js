import mongoose from 'mongoose';

const requestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const Request = mongoose.model('Request', requestSchema);
export default Request;
