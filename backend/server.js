require('dotenv').config();

const { connectDB } = require('./src/config/db');
const { app } = require('./src/app');

const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      // eslint-disable-next-line no-console
      console.log(`Decor With Love API running on port ${PORT}`);
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Server startup failed:', error.message);
    process.exit(1);
  }
};

start();