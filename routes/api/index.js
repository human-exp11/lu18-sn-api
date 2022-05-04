const router = require('express').Router();
const userRoutes = require('./routes-user');
const thoughtRoutes = require('./routes-thought');
router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

module.exports = router;