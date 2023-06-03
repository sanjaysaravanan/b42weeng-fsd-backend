import jwt from 'jsonwebtoken';

const checkSellerAccess = (token) => {
  let role = null;
  jwt.verify(token, process.env.TOKEN_SECRET, function (err, decoded) {
    if (err) {
      return;
    }
    role = decoded.role; // bar
  });
  return role === 'admin';
}

const checkSellerAccessMiddleWare = (req, res, next) => {
  if (!checkAdminAccess(req.headers['accesstoken'])) {
    res.status(401).send({ msg: 'Not Authorized' });
    return;
  }
  next();
}

const checkTokenHeader = (req, res, next) => {
  if (req.headers['accesstoken'] === undefined) {
    res.status(401).send({ msg: 'Not Authorized' });
    return;
  }
  next();
}

export {
  checkSellerAccess,
  checkSellerAccessMiddleWare,
  checkTokenHeader,
};
