const express = require('express');
const router = express.Router();

const catchErrors = require('../middleware/catchErrors');

const {
  getCategories,
  getSingleCategory,
  createCategory,
  updateCategory,
  deleteCategory
} = require('../controllers/categoryController');

router.get('/', catchErrors(getCategories));
router.get('/:id', catchErrors(getSingleCategory));
router.post('/', catchErrors(createCategory));
router.put('/:id', catchErrors(updateCategory));
router.delete('/:id', catchErrors(deleteCategory));

module.exports = router;
