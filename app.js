const express = require('express'),
      mongoose = require('mongoose'),
      passport = require('passport'),
      cors = require('cors');
require('dotenv').config();
require('./passport');

const authRouter = require('./routers/auth');
const mainRouter = require('./routers/main');
const app = express();

mongoose.connect(process.env.MONGODB, { useUnifiedTopology: true, useNewUrlParser: true });
mongoose.connection.on('connected', console.log.bind(console, 'Database connected!'));
mongoose.connection.on('error', console.error.bind(console, 'MongoDB Atlas connection error'));

app.use(cors());
app.use(express.json());
app.use(passport.initialize());

app.use('/api', authRouter, passport.authenticate('jwt', {session: false}), mainRouter);

app.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}...`));