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

    // console.log(req.url);
    next();
  });

  app.get("/", (req, res) => {
    console.log("req.cookies:", req.cookies.cookieKey);
    res.cookie("cookieKey", "cookieValue", { maxAge: 900000, httpOnly: true });
    res.status(200).send("ok");
  });
  // Controllers
  app.use("/controllers/users", users);
};

module.exports = routes;
