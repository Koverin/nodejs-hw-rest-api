const express = require("express");

const controll = require("../../controllers/contacts");

const router = express.Router();

router.get("/", controll.getAll);

router.get("/:contactId", controll.getById);

router.post("/", controll.addNewContacts);

router.delete("/:contactId", controll.deleteById);

router.put("/:contactId", controll.updateById);

module.exports = router;
