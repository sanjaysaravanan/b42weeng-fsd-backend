// Products CRUD
import express from 'express';
import jwt from 'jsonwebtoken';

import { createEntity, deleteEntity, findAllWithQuery, readAll, readOneEntity, updateEntity } from '../../Database/db-utils.js';
import { checkTokenHeader } from '../../middleware/auth-check.js';

const productRouter = express.Router();

productRouter.get('/', checkTokenHeader, async (req, res) => {
  // Get Query params
  const { seller } = req.query;
  if (seller) {
    res.send(await findAllWithQuery('products', { seller }));
  } else {
    res.send(await readAll('products'));
  }
});

productRouter.get('/:productId', checkTokenHeader, async (req, res) => {
  const { productId } = req.params;
  res.send(await readOneEntity('products', productId));
});

// Create a product
productRouter.post('/', checkTokenHeader, async (req, res) => {
  const { body: prodObj } = req;

  jwt.verify(req.headers['accesstoken'], process.env.TOKEN_SECRET, async function (err, decoded) {
    if (err) {
      return;
    }
    // prepare the product obj to be stored in db
    await createEntity('products', { ...prodObj, seller: decoded.email });
    res.send({ msg: 'Product Created Successfully' });
  });
});

productRouter.put('/:productId', checkTokenHeader, async (req, res) => {
  const { productId } = req.params;
  const { body: prodObj } = req;
  await updateEntity('products', productId, prodObj);
  res.send({ msg: 'Product updated Successfully' });
});

productRouter.delete('/:productId', checkTokenHeader, async (req, res) => {
  const { productId } = req.params;
  await deleteEntity('products', productId);
  res.send({ msg: 'Product deleted Successfully' });
});

export default productRouter;
