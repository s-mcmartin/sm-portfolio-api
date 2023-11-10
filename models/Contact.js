const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    subject: String,
    message: String,
    completed: Boolean,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Contact", contactSchema);
