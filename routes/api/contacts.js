const express = require("express");

const controll = require("../../controllers/contacts");

const { isValidId, validateBody } = require("../../middlewares");

const { schemas } = require("../../models/contact");

const router = express.Router();

router.get("/", controll.getAll);

router.get("/:contactId", isValidId, controll.getById);

router.post("/", validateBody(schemas.addSchema), controll.addNewContacts);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  controll.updateFavorite
);

router.delete("/:contactId", isValidId, controll.deleteById);

router.put(
  "/:contactId",
  isValidId,
  validateBody(schemas.addSchema),
  controll.updateById
);

module.exports = router;
