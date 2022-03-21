const express = require('express');
const routes = require('./config/routes');
require('dotenv').config();
const cors = require('cors');
const app = express();

app.use(cors());
app.use(
  express.urlencoded({
    extended: false,
  })
);

app.use(express.json());

app.use('/api/v1/', routes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`);
});

module.exports = app;
