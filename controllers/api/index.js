//Imports necessary files
const router = require('express').Router();
const userRoutes = require('./userRoutes');
const adminRoutes = require('./adminRoutes');

//Assigns /users to all userRoutes
router.use('/users', userRoutes);
//Assigns /users to all userRoutes
router.use('/admin', adminRoutes);

//Exports routes
module.exports = router;
