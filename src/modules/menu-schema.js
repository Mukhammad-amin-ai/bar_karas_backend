import mongoose from 'mongoose';

const Menu = new mongoose.Schema({
  restaurant: { type: Number, default: 0 },
  name: { type: String, default: '' },
});

export default mongoose.model('Menu', Menu);
