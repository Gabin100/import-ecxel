const express = require('express');

const provinces = require('./provinces');
const districts = require('./districts');
const sectors = require('./sectors');
const cells = require('./cells');
const villages = require('./villages');
const schools = require('./schools');
const convertExcel = require('./convertExcel');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏',
  });
});

router.use('/provinces', provinces);
router.use('/districts', districts);
router.use('/sectors', sectors);
router.use('/cells', cells);
router.use('/villages', villages);
router.use('/schools', schools);
router.use('/convertExcel', convertExcel);

module.exports = router;
