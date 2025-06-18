import mongoose from 'mongoose';

const Category = new mongoose.Schema({
  restaurant: { type: Number },
  name: { type: String, default: '' },
  menu: { type: mongoose.Schema.Types.ObjectId, ref: 'Menu', required: true },
});

export default mongoose.model('Category', Category);
