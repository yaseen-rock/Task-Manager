const mongoose = require('mongoose');

// Cache the connection to reuse in serverless environment
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
  // Return cached connection if available
  if (cached.conn) {
    return cached.conn;
  }

  // Create new connection if none exists
  if (!cached.promise) {
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      bufferCommands: false, // Disable Mongoose buffering
      serverSelectionTimeoutMS: 5000, // Reduce connection timeout
      socketTimeoutMS: 30000, // Close idle connections after 30s
      maxPoolSize: 5, // Limit connection pool size
      minPoolSize: 1
    };

    cached.promise = mongoose.connect(process.env.MONGODB_URI, opts)
      .then(mongoose => mongoose)
      .catch(err => {
        console.error('MongoDB connection error:', err);
        throw err;
      });
  }

  try {
    cached.conn = await cached.promise;
    console.log('MongoDB Connected');
    return cached.conn;
  } catch (err) {
    console.error('MongoDB connection failed:', err);
    throw err;
  }
};

module.exports = connectDB;