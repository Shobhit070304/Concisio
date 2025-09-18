const mongoose = require("mongoose");

const connectDB = async () => {
  let retries = 3;
  
  while (retries > 0) {
    try {
      await mongoose.connect(process.env.MONGO_URI);
      // MongoDB connected successfully
      return;
    } catch (error) {
      retries--;
      console.error(`MongoDB connection failed. Retries left: ${retries}`);
      
      if (retries === 0) {
        console.error("MongoDB connection error:", error.message);
        process.exit(1);
      }
      
      // Wait 2 seconds before retry
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }
};

module.exports = connectDB;
