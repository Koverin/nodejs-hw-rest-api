const express = require("express");

const controll = require("../../controllers/users");

const { validateBody, authenticate, upload } = require("../../middlewares");

const { schemas } = require("../../models/user");

const router = express.Router();

router.post(
  "/register",
  validateBody(schemas.registerSchema),
  controll.register
);

router.get("/verify/:verificationToken", controll.verifyEmail);

router.post(
  "/verify",
  validateBody(schemas.emailSchema),
  controll.resendVerifyEmail
);

router.post("/login", validateBody(schemas.loginSchema), controll.login);

router.get("/current", authenticate, controll.getCurrent);

router.post("/logout", authenticate, controll.logout);

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  controll.updateAvatar
);

module.exports = router;
