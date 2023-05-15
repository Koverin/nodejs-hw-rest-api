const express = require("express");

const controll = require("../../controllers/users");

const { validateBody, authenticate } = require("../../middlewares");

const { schemas } = require("../../models/user");

const router = express.Router();

router.post(
  "/register",
  validateBody(schemas.registerSchema),
  controll.register
);

router.post("/login", validateBody(schemas.loginSchema), controll.login);

router.get("/current", authenticate, controll.getCurrent);

router.post("/logout", authenticate, controll.logout);

module.exports = router;
