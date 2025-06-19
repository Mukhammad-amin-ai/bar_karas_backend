import MenuSchema from '../modules/menu-schema.js';
import CateforySchema from '../modules/item-category-schema.js';
import ItemsSchema from '../modules/items-schema.js';
class MenuController {
  async GetAllMenu(req, res) {
    try {
      const restaurantId = req.headers['x-restaurant-id'];
      if (!restaurantId) {
        return res
          .status(400)
          .json({ error: 'Missing x-restaurant-id header' });
      }

      const menus = await MenuSchema.find({ restaurant: restaurantId }).lean();
      const categories = await CateforySchema.find({
        restaurant: restaurantId,
      }).lean();
      const items = await ItemsSchema.find({ restaurant: restaurantId }).lean();

      const response = menus.map((menu) => {
        const menuCategories = categories
          .filter((cat) => String(cat.menu) === String(menu._id))
          .map((cat) => {
            const catItems = items.filter(
              (item) => String(item.category) === String(cat._id)
            );
            return {
              ...cat,
              items: catItems,
            };
          });

        return {
          _id: menu._id,
          restaurant: menu.restaurant,
          name: menu.name,
          itemCategories: menuCategories,
        };
      });

      return res.status(200).json(response);
    } catch (e) {
      console.error(e);
      return res.status(500).json(e);
    }
  }

  async GetMenu(req, res) {
    try {
      const restaurantId = req.headers['x-restaurant-id'];
      if (!restaurantId) {
        return res
          .status(400)
          .json({ error: 'Missing x-restaurant-id header' });
      }

      const menus = await MenuSchema.find({ restaurant: restaurantId }).lean();
      const categories = await CateforySchema.find({
        restaurant: restaurantId,
      }).lean();

      const response = menus.map((menu) => {
        const menuCategories = categories
          .filter((cat) => String(cat.menu) === String(menu._id))
          .map((cat) => {
            return {
              ...cat,
            };
          });

        return {
          _id: menu._id,
          restaurant: menu.restaurant,
          name: menu.name,
          itemCategories: menuCategories,
        };
      });

      return res.status(200).json(response);
    } catch (e) {
      console.error(e);
      return res.status(500).json(e);
    }
  }

  async CreateMenu(req, res) {
    try {
      const restaurant = parseInt(req.headers['x-restaurant-id']);
      const CurrentMenu = await MenuSchema.find({ restaurant: restaurant });

      if (CurrentMenu.length > 0) {
        return res.status(403).json({ message: 'db has such restaurant' });
      }

      const menu = await MenuSchema.create({
        name: req.body.name,
        restaurant: restaurant,
      });
      return res
        .status(201)
        .json({ message: 'Menu Successfully Created', menu });
    } catch (e) {
      console.error(e);
      return res.status(500).json(e);
    }
  }

  async CreateCategory(req, res) {
    try {
      const category = await CateforySchema.create({
        restaurant: parseInt(req.headers['x-restaurant-id']),
        name: req.body.name,
        menu: req.params.menuId,
      });
      return res
        .status(201)
        .json({ message: 'Menu Successfully Created', category });
    } catch (e) {
      console.error(e);
      return res.status(500).json(e);
    }
  }

  async CreateItem(req, res) {
    try {
      const category = await ItemsSchema.create({
        ...req.body,
        restaurant: parseInt(req.headers['x-restaurant-id']),
        category: req.params.categoryId,
      });
      return res
        .status(201)
        .json({ message: 'Menu Successfully Created', category });
    } catch (e) {
      console.error(e);
      return res.status(500).json(e);
    }
  }

  async updateMenu(req, res) {
    try {
      const restaurantId = req.headers['x-restaurant-id'];
      if (!restaurantId) {
        return res.status(404).json({ message: 'There is no such restaurant' });
      }

      const { id } = req.params;
      const menu = await MenuSchema.findById(id);
      if (!menu) {
        return res.status(404).json({ message: 'There is no such menu' });
      }
      const data = req.body;
      delete data.restaurant;
      const updatedMenu = await MenuSchema.findByIdAndUpdate(id, data, {
        new: true,
      });

      return res.status(200).json(updatedMenu);
    } catch (e) {
      console.error(e);
      return res.status(500).json(e);
    }
  }

  async updateCategory(req, res) {
    try {
      const restaurantId = req.headers['x-restaurant-id'];
      const { id } = req.params;
      if (!restaurantId) {
        return res.status(404).json({ message: 'There is no such restaurant' });
      }
      const category = await CateforySchema.findById(id);
      if (!category) {
        return res.status(404).json({ message: 'There is no such menu' });
      }

      const data = req.body;
      delete data.restaurant;
      delete data.menu;
      const updatedCategory = await CateforySchema.findByIdAndUpdate(id, data, {
        new: true,
      });

      return res.status(200).json(updatedCategory);
    } catch (e) {
      console.error(e);
      return res.status(500).json(e);
    }
  }

  async updateItem(req, res) {
    try {
      const restaurantId = req.headers['x-restaurant-id'];
      const { id } = req.params;
      if (!restaurantId) {
        return res.status(404).json({ message: 'There is no such restaurant' });
      }
      const items = await ItemsSchema.findById(id);

      if (!items) {
        return res.status(404).json({ message: 'There is no such item' });
      }

      const data = req.body;
      delete data.restaurant;
      delete data.category;
      const updatedItem = await ItemsSchema.findByIdAndUpdate(id, data, {
        new: true,
      });

      return res.status(200).json(updatedItem);
    } catch (e) {
      console.error(e);
      return res.status(500).json(e);
    }
  }
}
export default new MenuController();
