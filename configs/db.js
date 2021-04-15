const mongoose = require("mongoose");

const connectDB = () => {
  const pathURI = "mongodb://localhost/onlineGame";
  const connectionOption = { useNewUrlParser: true, useUnifiedTopology: true };
  mongoose.connect(pathURI, connectionOption);

  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error:"));
  db.once("open", function () {
    console.log("Database onlineGame Connected");
  });
};

module.exports = connectDB;
