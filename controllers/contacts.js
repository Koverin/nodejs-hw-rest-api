const { Contact } = require("../models/contact");

const { HttpError, controllWrap } = require("../utils");

const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  // Pagination
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;
  const result = await Contact.find({ owner }, "-createdAt -updatedAt", {
    skip,
    limit,
  }).populate("owner", "name email");
  res.json(result);
  // res.status(500).json({
  //   message: "Server error",
  // });
};

const getById = async (req, res) => {
  const { contactId } = req.params;
  // const result = await Contact.findOne({ _id: contactId });
  const result = await Contact.findById(contactId);
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
  const { _id: owner } = req.user;
  const result = await Contact.create({ ...req.body, owner });
  res.status(201).json(result);
};

const updateById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const updateFavorite = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const deleteById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndRemove(contactId);
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
  updateFavorite: controllWrap(updateFavorite),
  deleteById: controllWrap(deleteById),
};
