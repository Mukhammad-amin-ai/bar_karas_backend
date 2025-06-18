import MenuSchema from '../modules/menu-schema.js';
class MenuController {
  async GetAllMenu(req, res) {
    try {
      const menu = await MenuSchema.find({});
      if (!menu) {
        return res.status(404).json({ message: 'There is no menu' });
      }
      return res.status(200).json(menu);
    } catch (e) {
      console.error(e);
      return res.status(500).json(e);
    }
  }

  async CreateMenu(req, res) {
    try {
      const data = req.body;
      const menu = await MenuSchema.create(data);
      return res
        .status(201)
        .json({ message: 'Menu Successfully Created', menu });
    } catch (e) {
      console.error(e);
      return res.status(500).json(e);
    }
  }
}
export default new MenuController();
