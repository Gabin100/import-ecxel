const express = require('express');
const xlsx = require('xlsx');
const fs = require('fs');
const assignedTeacher = require('../data/assignedTeacher.json');
const teachersGrades = require('../data/teachersGrades.json');

const router = express.Router();

const excelFileNameAssigned = 'Assigned_Trainees.xlsx';
const excelFileNameGrades = 'FHI_Kinyarwanda_Grades_1.ods';

router.post('/grades', async (req, res) => {
  try {
    const path = `/Users/jeangabinishimwe/My Projects/2022/import-ecxel/documents/${excelFileNameGrades}`;
    const workBook = await xlsx.readFile(path, { cellDates: true });
    const workSheetNames = workBook.SheetNames[0];
    const workSheet = workBook.Sheets[workSheetNames];
    const data = xlsx.utils.sheet_to_json(workSheet);

    res.json({
      message: 'Success',
      count: data.length,
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Something wen wrong!!!, please try again?',
      error: error,
    });
  }
});

router.post('/assigned', async (req, res) => {
  try {
    const path = `/Users/jeangabinishimwe/My Projects/2022/import-ecxel/documents/${excelFileNameAssigned}`;
    const workBook = await xlsx.readFile(path, { cellDates: true });
    const workSheetNames = workBook.SheetNames[0];
    const workSheet = workBook.Sheets[workSheetNames];
    const data = xlsx.utils.sheet_to_json(workSheet);

    res.json({
      message: 'Success',
      count: data.length,
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Something wen wrong!!!, please try again?',
      error: error,
    });
  }
});

function filterMap(arr, callback) {
  return arr.reduce(
    (acc, val) => (callback(val) ? [...acc, callback(val)] : acc),
    []
  );
}

router.get('/assigned', async (req, res) => {
  try {
    const filteredTeachers = filterMap(teachersGrades, (teacherGrade) => {
      const firstnameSurname =
        teacherGrade['First name'] + ' ' + teacherGrade['Surname'];
      const SurnameFirstName =
        teacherGrade['Surname'] + ' ' + teacherGrade['First name'];
      const found = assignedTeacher.some((element) => {
        const fullName = element['Full Name']
          .toLowerCase()
          .replace(/\s+/g, ' ');
        if (
          firstnameSurname.toLowerCase() === fullName ||
          SurnameFirstName.toLowerCase() === fullName
        ) {
          teacherGrade['Staff Code'] = element['Staff Code'];
          return true;
        }
        return false;
      });
      return found ? teacherGrade : null;
    });

    return res.json({
      message: 'Success',
      count: filteredTeachers.length,
      data: filteredTeachers,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Something wen wrong!!!, please try again?',
      error: error,
    });
  }
});

module.exports = router;
