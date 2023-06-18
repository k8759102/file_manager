const express = require("express");
const router = express.Router();
const { signin, signup } = require("../apis/user");
const passport = require("passport");

const authenticateByJWT = passport.authenticate("jwt", { session: false });

router.post("/signin", signin);
router.post("/signup", signup);
router.post("/auth", authenticateByJWT, async (req, res) => {
  try {
    res.json({ result: true });
  } catch (error) {
    console.error(error);
    res.end();
  }
});

module.exports = router;
