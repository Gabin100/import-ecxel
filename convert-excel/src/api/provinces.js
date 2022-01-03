const express = require('express');
const Provinces = require('../models/provinces');

const router = express.Router();

const provinceObject = [
  {
    name: 'Kigali',
    full_name: 'Umujyi wa Kigali',
    code: 1,
  },
  {
    name: 'South',
    full_name: 'Amajyepfo',
    code: 2,
  },
  {
    name: 'West',
    full_name: 'Iburengerazuba',
    code: 3,
  },
  {
    name: 'North',
    full_name: 'Amajyaruguru',
    code: 4,
  },
  {
    name: 'East',
    full_name: 'Iburasirazuba',
    code: 5,
  },
];

router.post('/', async (req, res) => {
  try {
    for (let element of provinceObject) {
      const elementExist = await Provinces.findOne({
        province_code: element.code,
      }).exec();
      if (!elementExist) {
        const province = Provinces({
          province_name: element.name,
          full_name: element.full_name,
          province_code: element.code,
        });
        await province.save();
      }
    }

    res.json({
      message: 'Success',
      data: provinceObject,
    });
  } catch (error) {
    console.log(error);
  }
});

router.get('/', async (req, res) => {
  try {
    const provinces = await Provinces.find().exec();
    res.json({
      message: 'Success',
      data: provinces,
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
