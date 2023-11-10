const Contact = require("../models/Contact");
const bcrypt = require("bcrypt");

const router = require("../routes/root");

//@desc Get all contacts
//@route GET /contacts
//@access Private
const getAllContacts = async (req, res) => {
  const contacts = await Contact.find().lean();
  if (!contacts?.length) {
    return res.status(400).json({ message: "No contacts found" });
  }
  res.json(contacts);
};

//@desc Create new contact
//@route POST /contacts
//@access Private
const createNewContact = async (req, res) => {
  const { name, email, subject, message } = req.body;

  //Confirm data
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ message: "All fields required" });
  }

  const newContact = {
    name,
    email,
    subject,
    message,
  };

  //Create and store new user
  const contact = await Contact.create(newContact);
  if (contact) {
    res.status(201).json({ message: `New contact ${name} created` });
  } else {
    res.status(400).json({ message: "Invalid contact data received" });
  }
};

//@desc Update contact
//@route PATCH /contacts
//@access Private
const updateContact = async (req, res) => {
  const { id, name, email, subject, message, completed } = req.body;

  //Confirm data
  if (!id || !name || !email || !message || typeof completed !== "boolean") {
    return res.status(400).json({ message: "All fields are required" });
  }

  //Call exec due to passing in info and receive promise
  const contact = await Contact.findById(id).exec();

  if (!contact) {
    return res.status(400).json({ message: "Contact not found" });
  }

  contact.name = name;
  contact.email = email;
  contact.subject = subject;
  contact.message = message;
  contact.completed = completed;

  const updatedContact = await contact.save();

  res.json({ message: `${updatedContact.name} updated` });
};
//@desc Delete contact
//@route DELETE /contacts
//@access Private
const deleteContact = async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({ message: "Contact ID required." });
  }

  const contact = await Contact.findById(id).exec();

  if (!contact) {
    return res.status(400).json({ message: "Contact not found" });
  }

  const result = await contact.deleteOne();

  const reply = `Contact ${result.name} with ID ${result._id} deleted`;

  res.json(reply);
};

module.exports = {
  getAllContacts,
  createNewContact,
  updateContact,
  deleteContact,
};
