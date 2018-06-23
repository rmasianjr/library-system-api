const mongoose = require('mongoose');

const app = require('./app');
const port = process.env.PORT || '3000';

mongoose.Promise = global.Promise;
mongoose
  .connect('mongodb://localhost/library_db')
  .catch(err => console.log(`Error: ${err.message}`));

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
