// Products CRUD
import express from 'express';

import { createEntity, deleteEntity, findWithQuery, readAll, readOneEntity, updateEntity } from '../../Database/db-utils.js';
import { checkTokenHeader } from '../../middleware/auth-check.js';

const productRouter = express.Router();

productRouter.get('/', checkTokenHeader, async (_req, res) => {
  res.send(await readAll('products'));
});

productRouter.get('/:productId', checkTokenHeader, async (req, res) => {
  const { productId } = req.params;
  res.send(await readOneEntity('products', productId));
});

productRouter.post('/', checkTokenHeader, async (req, res) => {
  const { body: prodObj } = req;
  await createEntity('products', prodObj);
  res.send({ msg: 'Product Created Successfully' });
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
