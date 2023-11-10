const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    image: String,
    name: String,
    description: String,
    tech: [String],
    featured: String,
    github: String,
    website: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);
