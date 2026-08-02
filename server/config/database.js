const mongoose = require('mongoose');
const dns = require('dns');

// Fix for Windows DNS SRV lookup issues with mongodb+srv connection strings
try {
  dns.setDefaultResultOrder('ipv4first');
  dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);
} catch (e) {
  // Silently ignore if environment restricts custom DNS
}

// Set up event listeners once, when the module is imported.
mongoose.connection.on('connected', () => {
  console.log('✅ MongoDB connection established successfully.');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err.message);
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected.');
});

// Graceful shutdown
process.on('SIGINT', async () => {
  try {
    await mongoose.connection.close();
    console.log('MongoDB connection closed due to app termination.');
    process.exit(0);
  } catch (error) {
    console.error('Error closing MongoDB connection:', error);
    process.exit(1);
  }
});

const connectDB = async (retries = 5) => {
  while (retries > 0) {
    try {
      if (!process.env.MONGODB_URI) {
        throw new Error('MONGODB_URI is not defined in your .env file.');
      }
      console.log(`Attempting to connect to MongoDB... (Retries left: ${retries})`);
      
      await mongoose.connect(process.env.MONGODB_URI, {
        serverSelectionTimeoutMS: 15000, // Increased timeout for slower networks
        socketTimeoutMS: 45000,
      });

      return; // Exit the function if connection is successful

    } catch (error) {
      console.error(`\nDatabase connection attempt failed: ${error.message}\n`);
      retries--;
      if (retries === 0) {
        throw new Error('Could not connect to the database after multiple retries. Please check your connection string and IP whitelist.');
      }
      // Wait for 5 seconds before retrying
      console.log('Waiting 5 seconds before retrying...');
      await new Promise(res => setTimeout(res, 5000));
    }
  }
};

module.exports = connectDB;
