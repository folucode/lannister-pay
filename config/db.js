const mongoose = require('mongoose');
require('dotenv').config();

const databaseUser = process.env.DATABASE_USER;
const databaseUserPassword = process.env.DATABASE_USER_PASSWORD;
const databaseHost = process.env.DATABASE_HOST;
const databaseName = process.env.DATABASE_NAME;
const databaseURL = `mongodb+srv://${databaseUser}:${databaseUserPassword}@${databaseHost}/${databaseName}?retryWrites=true&w=majority`;

const connectDb = async () => {
  try {
    await mongoose.connect(databaseURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected...');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = connectDb;
