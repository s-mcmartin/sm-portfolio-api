const Course = require("../models/Course");

//@desc Get all courses
//@route GET /courses
//@access Private
const getAllCourses = async (req, res) => {
  const courses = await Course.find().lean();
  if (!courses?.length) {
    return res.status(400).json({ message: "No courses found" });
  }
  res.json(courses);
};

//@desc Create new course
//@route POST /courses
//@access Private
const createNewCourse = async (req, res) => {
  const {
    name,
    instructor,
    description,
    tech,
    featured,
    organization,
    courseLink,
  } = req.body;

  //Confirm data
  if (!name || !organization) {
    return res.status(400).json({ message: "All fields required" });
  }

  const newCourse = {
    name,
    instructor,
    description,
    tech,
    featured,
    organization,
    courseLink,
  };

  //Create and store new user
  const course = await Course.create(newCourse);
  if (course) {
    res.status(201).json({ message: `New course ${name} created` });
  } else {
    res.status(400).json({ message: "Invalid course data received" });
  }
};

//@desc Update course
//@route PATCH /courses
//@access Private
const updateCourse = async (req, res) => {};

//@desc Delete course
//@route DELETE /courses
//@access Private
const deleteCourse = async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({ message: "Course ID required." });
  }

  const course = await Course.findById(id).exec();

  if (!course) {
    return res.status(400).json({ message: "Course not found" });
  }

  const result = await course.deleteOne();

  const reply = `Course ${result.name} with ID ${result._id} deleted`;

  res.json(reply);
};

module.exports = {
  getAllCourses,
  createNewCourse,
  updateCourse,
  deleteCourse,
};
