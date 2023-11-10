const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    tech: [String],
    featured: String,
    instructor: String,
    organization: String,
    courseLink: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", courseSchema);
