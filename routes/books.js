const express = require('express');
const router = express.Router();

const { validateBook } = require('../models/Book');

const validateObjectId = require('../middleware/validateObjectId');
const validateRequest = require('../middleware/validateRequest');
const catchErrors = require('../middleware/catchErrors');

const {
  getBooks,
  getSingleBook,
  createBook,
  updateBook,
  deleteBook
} = require('../controllers/bookController');

router.get('/', catchErrors(getBooks));
router.get('/:id', validateObjectId, catchErrors(getSingleBook));
router.post('/', validateRequest(validateBook), catchErrors(createBook));
router.put('/:id', [validateObjectId, validateRequest(validateBook)], catchErrors(updateBook));
router.delete('/:id', validateObjectId, catchErrors(deleteBook));

module.exports = router;
