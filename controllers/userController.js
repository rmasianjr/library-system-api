const _ = require('lodash');

const { User } = require('../models/User');

exports.registerUser = async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send({ error: 'User already registered' });

  user = new User(req.body);
  await user.save();

  res.send(_.pick(user, ['_id', 'username', 'email']));
};