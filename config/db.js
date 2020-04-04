const mongoose = require('mongoose');
const chalk = require('chalk');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL, {
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
      useNewUrlParser: true
    });
    console.log(chalk.green(`MongoDB connected: ${conn.connection.host}`));
  } catch (err) {
    console.log(chalk.red(err.message));
  }
};

module.exports = connectDB;
