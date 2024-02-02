const routes = (app) => {
  //routes here
  app.use("/api/auth", require("./router/auth"));
  app.use("/api/events", require("./router/event"));

  // To catch unavailable route
  app.use("/*", (req, res) => {
    res.status(404).json({ status: false, msg: "Route Not Found" });
  });

  // To catch errors
  app.use(require("../middleware/error"));
};
module.exports = routes;
