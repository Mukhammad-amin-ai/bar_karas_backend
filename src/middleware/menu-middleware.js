export function CheckRestaurantId(req, res, next) {
  const restaurantId = req.headers['x-restaurant-id'];

  if (!restaurantId) {
    return res.status(400).json({ error: 'Missing x-restaurant-id header' });
  }

  next();
}
