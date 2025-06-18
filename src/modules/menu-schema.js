import mongoose from 'mongoose';

const macros = new mongoose.Schema({
  kilocalories: { type: Number, default: 0 },
  proteins: { type: Number, default: 0 },
  fat: { type: Number, default: 0 },
  Carbohydrates: { type: Number, default: 0 },
});

const items = new mongoose.Schema({
  img: { type: String, default: '' },
  name: { type: String, default: '' },
  price: { type: String, default: 0 },
  weight: { type: String, default: 0 },
  description: { type: String, default: '' },
  macros: {
    type: macros,
  },
});

const itemCategory = new mongoose.Schema({
  name: { type: String, default: '' },
  items: {
    type: items,
  },
});

const Menu = new mongoose.Schema({
  restaurant: { type: Number, default: 0 },
  name: { type: String, default: '' },
  itemCategories: {
    type: itemCategory,
  },
});

export default mongoose.model('Menu', Menu);
