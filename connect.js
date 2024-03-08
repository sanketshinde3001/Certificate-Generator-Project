const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
// async function connectToMongoDB(url) {
//   return mongoose.connect(url);
// }

const connectToMongoDB = async (uri) => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
  }
};

module.exports = {
  connectToMongoDB,
};