import mongoose from 'mongoose';

const macros = new mongoose.Schema({
  kilocalories: { type: Number, default: 0 },
  proteins: { type: Number, default: 0 },
  fat: { type: Number, default: 0 },
  Carbohydrates: { type: Number, default: 0 },
});

const items = new mongoose.Schema({
  restaurant: { type: Number },
  img: { type: String, default: '' },
  name: { type: String, default: '' },
  price: { type: String, default: 0 },
  weight: { type: String, default: 0 },
  description: { type: String, default: '' },
  macros: { type: macros, default: () => ({}) },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
});

export default mongoose.model('Items', items);
