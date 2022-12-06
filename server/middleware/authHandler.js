// Check for 'bearer... ' in auth header
// get token from header
// verify token validity
import jwt from 'jsonwebtoken';
import { AuthenticationError } from '../errors/index.js';

const checkToken = (req, res, next) => {
  const authHeader = req.get('authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new AuthenticationError('Authentication required');
  }

  const token = authHeader.split(' ')[1];
  try {
    const tokenPayload = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = tokenPayload.userId;
    next();
  } catch (error) {
    throw new AuthenticationError('Invalid token');
  }
};

export default checkToken;
