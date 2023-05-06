const router = require('express').Router();

const apiRoutes = require('./api');
const publicRoutes = require('./publicRoutes');
const privateRoutes = require('./privateRoutes');

router.use('/', publicRoutes);
router.use('/', privateRoutes);
router.use('/api', apiRoutes);

module.exports = router;
