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

//Parsing form
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

app.all("/", (req, res) => {
  res.send("Hello my this World!");
});
//Routing
require("./routes/api")(app);

//Error handling
// expressAsyncErrors();

//Database connection
try {
  dbConnection();
  console.log("Database connection established sucessfully");

  //Start the server
  app.listen(port, () =>
    console.log(`Server is listening on http://localhost:${port}`)
  );
} catch (e) {
  console.log(e);
  process.exit(1);
}
