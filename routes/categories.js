const express = require('express');
const router = express.Router();

const validateObjectId = require('../middleware/validateObjectId');
const catchErrors = require('../middleware/catchErrors');

const {
  getCategories,
  getSingleCategory,
  createCategory,
  updateCategory,
  deleteCategory
} = require('../controllers/categoryController');

router.get('/', catchErrors(getCategories));
router.get('/:id', validateObjectId, catchErrors(getSingleCategory));
router.post('/', catchErrors(createCategory));
router.put('/:id', validateObjectId, catchErrors(updateCategory));
router.delete('/:id', validateObjectId, catchErrors(deleteCategory));

module.exports = router;
