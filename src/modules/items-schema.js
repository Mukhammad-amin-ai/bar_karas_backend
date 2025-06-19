import mongoose from 'mongoose';

const nutrition = new mongoose.Schema({
  fats: { type: Number, default: 0 },
  proteins: { type: Number, default: 0 },
  kilocalories: { type: Number, default: 0 },
  carbs: { type: Number, default: 0 },
  energy: { type: Number, default: 0 },
  salt: { type: Number, default: 0 },
  sugar: { type: Number, default: 0 },
});

const itemSizes = new mongoose.Schema({
  name: { type: String, default: '' },
  image: { type: String, default: '' },
  nutritionPerHundredGrams: {
    type: nutrition,
  },
  isDefault: { type: Boolean },
  price: { type: Number, default: 0 },
});

const items = new mongoose.Schema({
  restaurant: { type: Number },
  img: { type: String, default: '' },
  name: { type: String, default: '' },
  price: { type: Number, default: 0 },
  weight: { type: Number, default: 0 },
  description: { type: String, default: '' },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  itemSizes: {
    type: [itemSizes],
  },
});

export default mongoose.model('Items', items);
