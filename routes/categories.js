const express = require('express');
const router = express.Router();

const { validateCategory } = require('../models/Category')

const validateObjectId = require('../middleware/validateObjectId');
const validateRequest = require('../middleware/validateRequest');
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
router.post('/', validateRequest(validateCategory), catchErrors(createCategory));
router.put('/:id', [validateObjectId, validateRequest(validateCategory)], catchErrors(updateCategory));
router.delete('/:id', validateObjectId, catchErrors(deleteCategory));

module.exports = router;
