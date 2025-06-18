import Router from 'express';
import MenuController from '../controllers/menu.js';
import { CheckRestaurantId } from '../middleware/menu-middleware.js';

let router = new Router();

router.get('/menu', CheckRestaurantId, MenuController.GetAllMenu);
router.post('/menu', MenuController.CreateMenu);

export default router;
