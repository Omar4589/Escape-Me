// Imports necessary files
const router = require('express').Router();
const publicRoutes = require('./publicRoutes');
const userRoutes = require('./userRoutes');
const adminRoutes = require('./adminRoutes');

// Routes for public access
router.use('/', publicRoutes);

// Routes for user access
router.use('/', userRoutes);

// Routes for admin access
router.use('/admin', adminRoutes);

module.exports = router;
