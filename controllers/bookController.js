const mongoose = require('mongoose');

const { Book, validateBook } = require('../models/Book');
const { Category } = require('../models/Category');

exports.getBooks = async (req, res) => {
  const bookList = await Book.find().sort('title');
  res.send(bookList);
};

exports.getSingleBook = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(404).send({ error: 'Invalid id' });

  const book = await Book.findById(req.params.id);

  if (!book)
    return res
      .status(404)
      .send({ error: 'The book with the given id was not found' });

  res.send(book);
};

exports.createBook = async (req, res) => {
  const { error } = validateBook(req.body);
  if (error) return res.status(400).send({ error: error.details[0].message });

  const { title, categoryId, stock, failedReturnFee } = req.body;

  const category = await Category.findById(categoryId);
  if (!category) return res.status(400).send({ error: 'Invalid category' });

  const book = new Book({
    title,
    category: {
      _id: category._id,
      name: category.name
    },
    stock,
    failedReturnFee
  });

  await book.save();

  res.send(book);
};

exports.updateBook = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(404).send({ error: 'Invalid id' });

  const { error } = validateBook(req.body);
  if (error) return res.status(400).send({ error: error.details[0].message });

  const { title, categoryId, stock, failedReturnFee } = req.body;

  const category = await Category.findById(categoryId);
  if (!category) return res.status(400).send({ error: 'Invalid category' });

  const book = await Book.findByIdAndUpdate(
    req.params.id,
    {
      title,
      category: { _id: category._id, name: category.name },
      stock,
      failedReturnFee
    },
    { new: true, runValidators: true }
  );

  if (!book)
    return res
      .status(404)
      .send({ error: 'The book with given id was not found' });

  res.send(book);
};

exports.deleteBook = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(404).send({ error: 'Invalid id' });

  const book = await Book.findByIdAndRemove(req.params.id);

  if (!book)
    return res
      .status(404)
      .send({ error: 'The book with given id was not found' });

  res.send(book);
};
