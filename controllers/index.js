// Imports necessary files
const router = require('express').Router();
const apiRoutes = require('./api');
const viewsRoutes = require('./views');

// Routes for API endpoints
router.use('/api', apiRoutes);

// Routes for views rendering
router.use('/', viewsRoutes);

// Exports routes
module.exports = router;
