// Register and Login for both Seller & Buyer
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { createEntity, findOneWithQuery } from '../../Database/db-utils.js';

const authRouter = express.Router();

// Health Check API
authRouter.get('/health', (req, res) => {
  res.send({ 'msg': 'Backend server is up and running...!' });
})

authRouter.post('/register', async (req, res) => {
  const { body: userObj } = req;

  await bcrypt.hash(userObj.password, 10, async function (_err, hash) {
    userObj.password = hash;
    await createEntity('users', userObj);
  });

  res.send({ 'msg': 'User Created Successfully' });
})

authRouter.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const userObj = await findOneWithQuery('users', { email });

  await bcrypt.compare(password, userObj.password, async (err, result) => {
    console.log('Match', result);
    if (result) {
      let role = userObj.role;
      let responseToken = null;
      // encryption role in jwt payload
      await jwt.sign({ ...userObj }, process.env.TOKEN_SECRET, { expiresIn: '1d' }, function (err, token) {
        console.log('Token', token);
        responseToken = token;
      });
      delete userObj.password;
      res.send({
        msg: 'Login Successfull',
        ...userObj,
        accessToken: responseToken
      }); // response sends the details of the user
    } else {
      res.send({ msg: 'Invalid Credentials' });
    }
  });
})

export default authRouter;