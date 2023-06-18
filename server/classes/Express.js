const Express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const passportConfig = require("../security/passport");
const helmet = require("helmet");
const { SESSION_SECRET, MAX_SESSION_MIN, APP_URL } = require("../config");

const app = new Express();

class ExpressServer {
  constructor() {
    app
      .use(helmet())
      .use(cookieParser())
      .use(
        session({
          resave: false,
          saveUninitialized: false,
          secret: SESSION_SECRET,
          cookie: {
            httpOnly: true,
            secure: false,
            maxAge: MAX_SESSION_MIN * 60000,
          },
        })
      )
      .use(passport.initialize())
      .use(passport.session())
      .use(Express.json({ limit: "20mb" }))
      .use(
        Express.urlencoded({
          limit: "100mb",
          extended: true,
        })
      );

    passportConfig();
  }

  router(routes) {
    return new Promise((resolve, reject) => {
      routes(app);
      resolve();
    });
  }

  listen(PORT) {
    const backlog = () => console.log(`Server running at ${APP_URL}`);
    app.listen(PORT, backlog);

    return app;
  }
}

module.exports = new ExpressServer();
