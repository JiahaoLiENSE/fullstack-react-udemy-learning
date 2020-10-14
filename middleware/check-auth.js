const jwt = require('jsonwebtoken');

const HttpError = require('../models/http-error');

module.exports = (req, res, next) => {
    // before authenticate use, check when if broswer request method returns 'OPTIONS', ingore the block and keep sending request.
  if (req.method === 'OPTIONS') {
    return next();
  }
  // check valid token in request headers which is labelled as Authorization;
  // get token string from 'Bearer TOKEN': ' ' space between Bearer and TOKEN, [1] for the second element -- TOKEN.
  try {
    const token = req.headers.authorization.split(' ')[1]; // Authorization: 'Bearer TOKEN'
    if (!token) {
      throw new Error('Authentication failed!');
    }
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);
    req.userData = { userId: decodedToken.userId };
    next();
  } catch (err) {
    const error = new HttpError('Authentication failed!', 403);
    return next(error);
  }
};
