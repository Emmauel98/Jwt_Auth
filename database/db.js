const mongoose = require("mongoose");

const connectDB = async (url) => {
  try {
    const connect = await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      ssl: true,
      tlsAllowInvalidCertificates: true,
    });
    console.log("connected successfully");
  } catch (error) {
    console.log(`Sorry:  ${error.message}`);
  }
};
//  BAckend project ....
module.exports = connectDB;
