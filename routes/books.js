const express = require('express');
const router = express.Router();

const catchErrors = require('../middleware/catchErrors');

const {
  getBooks,
  getSingleBook,
  createBook,
  updateBook,
  deleteBook
} = require('../controllers/bookController');

router.get('/', catchErrors(getBooks));
router.get('/:id', catchErrors(getSingleBook));
router.post('/', catchErrors(createBook));
router.put('/:id', catchErrors(updateBook));
router.delete('/:id', catchErrors(deleteBook));

module.exports = router;
