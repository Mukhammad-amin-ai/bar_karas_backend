import Router from 'express';
import MenuController from '../controllers/menu.js';
import { CheckRestaurantId } from '../middleware/menu-middleware.js';

let router = new Router();

router.get('/menu', CheckRestaurantId, MenuController.GetAllMenu);

router.post('/menu', CheckRestaurantId, MenuController.CreateMenu);
router.post(
  '/menu/:menuId/category',
  CheckRestaurantId,
  MenuController.CreateCategory
);
router.post(
  '/menu/:categoryId/item',
  CheckRestaurantId,
  MenuController.CreateItem
);

router.patch('/menu/:id', CheckRestaurantId, MenuController.updateMenu);
router.patch(
  '/menu/category/:id',
  CheckRestaurantId,
  MenuController.updateCategory
);
router.patch('/menu/item/:id', CheckRestaurantId, MenuController.updateItem);
export default router;
