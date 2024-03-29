// import dotenv package
require('dotenv').config();
const express = require('express');
const workoutRoutes = require('./routes/workoutRoutes');
const userRoutes = require('./routes/userRoutes');
const mongoose = require('mongoose');

const app = express();

/*Important: on the .env file, specify:
SECRET=
PORT=
MONGO_URI=
*/

// Middlewares ---- ↓ enable json parsing ↓ ----
app.use(express.json());

app.use((req, res, next) => {
  // console.log(req.path, '-', req.method);
  next();
});

// Routes
app.use('/api/workouts', workoutRoutes);
app.use('/api/user', userRoutes);
// Connect to DB

const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to the DB');
    // listen for requests
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  })
  .catch((error) => console.log(error));
