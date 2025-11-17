require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const apiRouter = require('./routes/api');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.use('/api', apiRouter);

const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://abdullah:24821234@portfolio.eruarw7.mongodb.net/?appName=portfolio";

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
  })
  .catch(err => {
    console.error('MongoDB connection error:', err.message);
    // start server anyway — the API will fail until DB is available
    app.listen(PORT, () => console.log(`Server listening on port ${PORT} (no DB)`));
  });
