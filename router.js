var express = require('express'),
  router = express.Router(),
  add = require('./routes/add.js'),
  update = require('./routes/update.js'),
  fetchAfter = require('./routes/fetchAfter.js'),
  main = require('./routes/main.js');

router.use('/add/',add);
router.use('/update/',update);
router.use('/fetchAfter/',fetchAfter);
router.use('/',main);

module.exports = router;


