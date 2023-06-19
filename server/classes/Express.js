const Express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const cors = require("cors");
const passport = require("passport");
const passportConfig = require("../security/passport");
const helmet = require("helmet");
const { COOKIE_SECRET, MAX_SESSION_MIN, APP_URL } = require("../config");

const app = new Express();

class ExpressServer {
  constructor() {
    app
      .use(helmet())
      .use(
        cors({
          // origin: "*", // 모든 출처 허용 옵션
          origin: "http://localhost:8080",
          credential: true, // 사용자 인증이 필요한 리소스(쿠키 ..등) 접근
        })
      )
      .use(cookieParser())
      .use(
        session({
          resave: false,
          saveUninitialized: false,
          secret: COOKIE_SECRET,
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
