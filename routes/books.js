const express = require('express');
const router = express.Router();

const validateObjectId = require('../middleware/validateObjectId');
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
router.post('/', catchErrors(createBook));
router.put('/:id', validateObjectId, catchErrors(updateBook));
router.delete('/:id', validateObjectId, catchErrors(deleteBook));

module.exports = router;
