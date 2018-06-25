const mongoose = require('mongoose');

const { Category, validateCategory } = require('../models/Category');

exports.getCategories = async (req, res) => {
  const categoryList = await Category.find().sort('name');
  res.send(categoryList);
};

exports.getSingleCategory = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(404).send({ error: 'Invalid id' });

  const category = await Category.findById(req.params.id);

  if (!category)
    return res
      .status(404)
      .send({ error: 'The category with the given id was not found' });

  res.send(category);
};

exports.createCategory = async (req, res) => {
  const { error } = validateCategory(req.body);
  if (error) return res.status(400).send({ error: error.details[0].message });

  const category = new Category(req.body);
  await category.save();

  res.send(category);
};

exports.updateCategory = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(404).send({ error: 'Invalid id' });

  const { error } = validateCategory(req.body);
  if (error) return res.status(400).send({ error: error.details[0].message });

  const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!category)
    return res
      .status(404)
      .send({ error: 'The category with the given id was not found' });

  res.send(category);
};

exports.deleteCategory = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(404).send({ error: 'Invalid id' });

  const category = await Category.findByIdAndRemove(req.params.id);

  if (!category)
    return res
      .status(404)
      .send({ error: 'The category with the given id was not found' });

  res.send(category);
};
