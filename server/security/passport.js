const passport = require("passport");
const { Strategy: LocalStrategy } = require("passport-local");
const { ExtractJwt, Strategy: JWTStrategy } = require("passport-jwt");
const { encodeByAES56, encodeBySHA256 } = require("../security/util");
const Sequelizer = require("../classes/Sequelizer");
const { JWT_SECRET, AES_SECRET } = require("../config");

const passportConfig = { usernameField: "userId", passwordField: "password" };
const passportVerify = async (userId, password, done) => {
  try {
    const LoginID = encodeByAES56(AES_SECRET, userId);
    const sequelizer = new Sequelizer();
    const user = await sequelizer.findOne({
      type: "users",
      conditions: {
        where: { LoginID },
      },
    });
    if (!user) {
      done(null, false, { reason: "존재하지 않는 사용자 입니다." });
      return;
    }

    const compareResult = user.Password === encodeBySHA256(password);
    if (!compareResult) {
      done(null, false, { reason: "올바르지 않은 비밀번호 입니다." });
      return;
    }

    done(null, user);
  } catch (error) {
    console.error(error);
    done(null, false, { reason: error.message });
  }
};

const JWTConfig = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET,
};
const JWTVerify = async (payload, done) => {
  try {
    const { UserID, LoginID } = payload;
    const sequelizer = new Sequelizer();
    const user = await sequelizer.findOne({
      type: "users",
      conditions: {
        where: { UserID, LoginID },
      },
    });
    if (!user) {
      done(null, false, { reason: "올바르지 않은 인증정보 입니다." });
      return;
    }

    done(null, user);
  } catch (error) {
    console.error(error);
    done(null, false, { reason: error.message });
  }
};

module.exports = () => {
  passport.use("local", new LocalStrategy(passportConfig, passportVerify));
  passport.use("jwt", new JWTStrategy(JWTConfig, JWTVerify));
};
