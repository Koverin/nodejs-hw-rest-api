const express = require("express");

const controll = require("../../controllers/contacts");

const { isValidId, validateBody, authenticate } = require("../../middlewares");

const { schemas } = require("../../models/contact");

const router = express.Router();

router.get("/", authenticate, controll.getAll);

router.get("/:contactId", authenticate, isValidId, controll.getById);

router.post(
  "/",
  authenticate,
  validateBody(schemas.addSchema),
  controll.addNewContacts
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  controll.updateFavorite
);

router.delete("/:contactId", authenticate, isValidId, controll.deleteById);

router.put(
  "/:contactId",
  authenticate,
  isValidId,
  validateBody(schemas.addSchema),
  controll.updateById
);

module.exports = router;
