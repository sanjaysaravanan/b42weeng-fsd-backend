// Products CRUD
import express from 'express';
import jwt from 'jsonwebtoken';

import { createEntity, deleteEntity, findAllWithQuery, findOneWithQuery, readAll, readOneEntity, updateEntity } from '../../Database/db-utils.js';
import { checkTokenHeader } from '../../middleware/auth-check.js';

const orderRouter = express.Router();

// Users orders
orderRouter.get('/user', checkTokenHeader, async (req, res) => {

});

// user Place an Order
orderRouter.post('/add', checkTokenHeader, async (req, res) => {
  const { body } = req;

  const cart = await readOneEntity('carts', body.cartId);

  // create order codes
  await createEntity('orders', { cart, orderId: cart.id });

  (cart.items || []).forEach(async (item) => {
    await createEntity('ordered-items', { ...item, orderId: cart.id, status: 'pending' });
  });

  await deleteEntity('carts', body.cartId);

  res.send({ msg: 'Order Placed Successfully' })
});

// Get orders of a seller
orderRouter.get('/seller', async (req, res) => {
  res.send(await readAll('ordered-items'))
});

// Seller Accepting an Order
orderRouter.post('/:productId/accept', checkTokenHeader, async (req, res) => {
  const { orderId } = req.params;

});

// Seller Reject/Cancel an Order
orderRouter.post('/:productId/accept', checkTokenHeader, async (req, res) => {
  const { productId } = req.params;
});

export default orderRouter;
