const users = require("./controllers/users");

const routes = (app) => {
  app.all("/*", async (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
    res.header(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization, Content-Length, X-Requested-With"
    );

    console.log("Cookies: ", req.cookies);
    console.log("Signed Cookies: ", req.signedCookies);

    // console.log(req.url);
    next();
  });

  // Controllers
  app.use("/controllers/users", users);
};

module.exports = routes;
