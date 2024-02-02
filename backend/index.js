// ===========MODULES ========
//THIRD PARTY / CORE MODULES
const express = require("express");
const cors = require("cors");
require("express-async-errors");

require("./utils/logger")();
const dbConnection = require("./utils/db");

require("dotenv").config();

//Initialize express
const app = express();
const port = process.env.PORT || 5000;

//Cors
app.use(cors());

// Serving Static files
app.use(express.static("uploads"));

//Parsing form
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

//Routing
require("./routes/api")(app);

//Database connection
try {
  dbConnection();
  console.log("Database connection established sucessfully");

  // Adding default admin
  require("./utils/defaultAdmin")();

  // Check if the uplods folder alerady exists or not
  require("./utils/helper").checkFolder();

  //Start the server
  app.listen(port, () =>
    console.log(`Server is listening on http://localhost:${port}`)
  );
} catch (e) {
  console.log(e);
  process.exit(1);
}
