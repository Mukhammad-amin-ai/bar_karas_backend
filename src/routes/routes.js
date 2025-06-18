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

export default router;
