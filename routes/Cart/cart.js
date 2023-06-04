// Products CRUD
import express from 'express';
import jwt from 'jsonwebtoken';

import { createEntity, deleteEntity, findAllWithQuery, findOneWithQuery, readAll, readOneEntity, updateEntity } from '../../Database/db-utils.js';
import { checkTokenHeader } from '../../middleware/auth-check.js';

const cartRouter = express.Router();

cartRouter.get("/", checkTokenHeader, async (req, res) => {
  jwt.verify(req.headers['accesstoken'], process.env.TOKEN_SECRET, async function (err, decoded) {
    if (err) {
      return;
    }
    // check whether the user already has a cart
    const cart = await findOneWithQuery('carts', { email: decoded.email });
    res.send(cart || {});
  });
})

// user adding a product to the cart
cartRouter.post('/add', checkTokenHeader, async (req, res) => {
  const { productId } = req.query;
  // check whether the user already has a cart

  // if exists add this product to the same cart

  // else create new and add the product to it
  jwt.verify(req.headers['accesstoken'], process.env.TOKEN_SECRET, async function (err, decoded) {
    if (err) {
      return;
    }

    // check whether the user already has a cart
    const cart = await findOneWithQuery('carts', { email: decoded.email });
    console.log('Product to Be added', productId)
    console.log(cart);
    // get the product info from db using productId
    const productInfo = await readOneEntity('products', productId);
    if (cart === null) {
      // structure cart Obj
      await createEntity('carts', { email: decoded.email, items: [productInfo] })
    } else {
      await updateEntity('carts', cart.id, { ...cart, items: [...cart.items, productInfo] })
    }
    let cartValue = 0;

    if (cart) {
      cart.items.forEach(element => {
        cartValue += Number(element.price);
      });
      res.send({ ...cart, totalAmount: cartValue });
    } else {
      res.send({ email: decoded.email, items: [productInfo], totalAmount: productInfo.price })
    }
  });
});

// user removing a product from the cart -- Home Work
cartRouter.post('/remove', checkTokenHeader, async (req, res) => {
  const { productId } = req.params;

});

export default cartRouter;
