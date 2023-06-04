// Initialization of the application server
import express from 'express';
import cors from 'cors';

import DbClient from './Database/db-client.js';

import authRouter from './routes/auth/authentication.js';
import productRouter from './routes/products/products.js';
import cartRouter from './routes/Cart/cart.js';
import orderRouter from './routes/orders/orders.js';

const app = express();

const PORT = 5000;
const HOSTNAME = 'localhost';

const myLogger = function (req, _res, next) {
  console.log(new Date().toISOString(), '::', req.method, req.originalUrl);
  next();
}

// Top/Global Level await
await DbClient.connect();
console.log('Connected to the DB');
// this is a latest feature nodejs which allows global asynchronous operation execution

// For parsing application/json
app.use(express.json()); // Middleware needed for passing data in post method
app.use(cors());

app.use(myLogger);

// prefix path router without prefix
app.use("/auth", authRouter);
app.use("/products", productRouter);
app.use("/cart", cartRouter);
app.use("/order", orderRouter);

app.listen(PORT, () => {
  console.log(`Server running at http://${HOSTNAME}:${PORT}/`);
});