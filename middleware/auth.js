const jwt = require('jsonwebtoken');
const { User } = require('../models');

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ success: false, message: 'Token tidak ditemukan' });
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'rahasia123');
    const user = await User.findByPk(decoded.id);
    
    if (!user) return res.status(401).json({ success: false, message: 'User tidak ditemukan' });
    
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: 'Token tidak valid' });
  }
};
