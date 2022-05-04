const router = require('express').Router();
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

router.use((req, res) => {
  console.log('We Are Live')
  res.status(404).send('<h1> 404 Error :( </h1>');
});

module.exports = router;