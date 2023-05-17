const router = require('express').Router();

const apiRoutes = require('./api');
const publicRoutes = require('./publicRoutes');
const privateRoutes = require('./privateRoutes');
const adminRoutes = require('./adminRoutes');

router.use('/', publicRoutes);
router.use('/', privateRoutes);
router.use('/api', apiRoutes);
router.use('/admin', adminRoutes);

module.exports = router;
