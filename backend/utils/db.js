const mongoose = require("mongoose");

module.exports = dbConnection = async () => {
  //   mongoose.connect(
  //     "mongodb+srv://rudra:Rudra@123@prajnaworld.xcobz10.mongodb.net/?retryWrites=true&w=majority",
  //     {
  //       useUnifiedTopology: true,
  //       useNewUrlParser: true,
  //       autoIndex: true,
  //     })

  mongoose.connect(process.env.MONGO_URI);
};
