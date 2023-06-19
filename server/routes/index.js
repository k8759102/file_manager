const users = require("./controllers/users");

const routes = (app) => {
  // Controllers
  app.use("/controllers/users", users);
};

module.exports = routes;
