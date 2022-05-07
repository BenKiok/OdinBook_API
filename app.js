const express = require('express'),
      mongoose = require('mongoose');
require('dotenv').config();

const app = express();

mongoose.connect(process.env.MONGODB, { useUnifiedTopology: true, useNewUrlParser: true });
mongoose.connection.on('connected', console.log.bind(console, 'Database connected!'));
mongoose.connection.on('error', console.error.bind(console, 'MongoDB Atlas connection error'));

app.use(express.json());

app.use('/', (req, res) => {
  res.json('Hello everybody!');
});

app.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}...`));