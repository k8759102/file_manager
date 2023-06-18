const passport = require("passport");
const { encodeByAES56, encodeBySHA256 } = require("../../security/util");
const { JWT_SECRET, AES_SECRET } = require("../../config");
const jwt = require("jsonwebtoken");
const Sequelizer = require("../../classes/Sequelizer");
const {
  SIGNUP_SUCCESS,
  SIGNUP_FAILED,
  SIGNIN_SUCCESS,
  SIGNIN_FAILED,
} = require("../../constants/status");

const MONTH_LATER = new Date() + 1 * 24 * 60 * 60 * 1000;
const signin = (req, res) => {
  try {
    // passport local 인증 과정
    passport.authenticate("local", (error, user, info) => {
      // 인증이 실패했거나 유저 데이터가 없다면 에러 발생
      if (error || !user) {
        res.status(400).json({ message: info.reason });
        return;
      }

      // user데이터를 통해 로그인 진행
      req.login(user, { session: false }, (error) => {
        if (error) {
          res.send(error);
          return;
        }

        // 클라이언트에게 JWT생성 후 반환
        const token = jwt.sign(
          {
            UserID: user.UserID,
            LoginID: user.LoginID,
          },
          JWT_SECRET
        );
        console.log("token: ", token);
        res.cookie("token", token, {
          expires: new Date(MONTH_LATER), // 쿠키의 만료일을 한 달 뒤로 설정
          httpOnly: true,
        });
        res.json(SIGNIN_SUCCESS);
      });
    })(req, res);
  } catch (error) {
    console.error(error);
    res.status(400).json(SIGNIN_FAILED);
  }
};

const signup = async (req, res) => {
  try {
    const { userId, password, name: Name } = req.body;
    const LoginID = encodeByAES56(AES_SECRET, userId);
    const Password = encodeBySHA256(password);
    const sequelizer = new Sequelizer();

    await sequelizer.create({
      type: "users",
      conditions: {
        LoginID,
        Password,
        Name,
        CreateUserID: 0,
        CreateDate: new Date(),
      },
    });

    res.json(SIGNUP_SUCCESS);
  } catch (error) {
    console.error(error);
    res.status(400).json(SIGNUP_FAILED);
  }
};

module.exports = {
  signin,
  signup,
};
