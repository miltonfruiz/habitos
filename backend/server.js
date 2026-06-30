const express = require('express');
const app = express();
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});

app.use(helmet());
app.use(cors());
app.use(limiter);
app.use(express.json());

const authRoutes = require('./routes/authRoutes');
const routes = require('./routes/routes');

app.use('/api/auth', authRoutes);
app.use('/api/habits', routes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(process.env.PORT || 5000, () => {
      console.log('Server listening on port ' + (process.env.PORT || 5000));
    });
  })
  .catch((err) => {
    console.log('Error connecting to MongoDB: ' + err);
  });