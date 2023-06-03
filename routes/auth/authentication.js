// Register and Login for both Seller & Buyer
import express from 'express';

const authRouter = express.Router();

// Health Check API
authRouter.get('/health', (req, res) => {
  res.send({ 'msg': 'Backend server is up and running...!' });
})

export default authRouter;