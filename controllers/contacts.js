const Joi = require("joi");

const contacts = require("../models/contacts");

const { HttpError, controllWrap } = require("../utils");

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

const getAll = async (req, res) => {
  const result = await contacts.listContacts();
  res.json(result);
  // res.status(500).json({
  //   message: "Server error",
  // });
};

const getById = async (req, res) => {
  const { contactId } = req.params;
  const result = await contacts.getContactById(contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
  // const { status = 500, message = "Server error" } = error;
  // res.status(status).json({
  //   message,
  // });
};

const addNewContacts = async (req, res) => {
  const { error } = addSchema.validate(req.body);
  if (error) {
    throw HttpError(400, error.message);
  }
  const result = await contacts.addContact(req.body);
  res.status(201).json(result);
};

const updateById = async (req, res) => {
  const { error } = addSchema.validate(req.body);
  if (error) {
    throw HttpError(400, error.message);
  }
  const { contactId } = req.params;
  const result = await contacts.updateContact(contactId, req.body);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const deleteById = async (req, res) => {
  const { contactId } = req.params;
  const result = await contacts.removeContact(contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json({
    message: "Delete success",
  });
};

module.exports = {
  getAll: controllWrap(getAll),
  getById: controllWrap(getById),
  addNewContacts: controllWrap(addNewContacts),
  updateById: controllWrap(updateById),
  deleteById: controllWrap(deleteById),
};
