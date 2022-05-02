const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(require('./routes'));

// wrap Mongoose around local connection to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/snapi', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

mongoose.set('debug', true);

app.listen(PORT, () => console.log(`Connected on localhost:${PORT}`));