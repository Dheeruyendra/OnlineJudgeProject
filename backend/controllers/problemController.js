import Problem from "../models/problemSchema.js";

const addProblem = async (req, res) => {
  try {
    const {
      problemid,
      name,
      statement,
      difficulty,
      tag,
      constraints,
      sinput,
      soutput,
    } = req.body;
    const authorId = store.get("email");
    const problem = await Problem.create({
      problemid,
      name,
      statement,
      difficulty,
      tag,
      constraints,
      sinput,
      soutput,
    });
    return res.status(201).json({
      message: "Problem added successfully",
      problem,
    });
  } catch (error) {
    return res.status(500).json({ message: "Error adding problem" });
  }
};

const getProblem = async (req, res) => {
  try {
    const { id } = req.params.id;
    const problem = await Problem.findOne({ problemid: id });
    if (!problem) {
      return res.status(404).json({ message: "Problem not found" });
    }
    return res.status(200).json(problem);
  } catch (error) {
    // Handle any errors that occur during fetching from the database
    return res.status(500).json({ message: "Error retrieving problem" });
  }
};

const getAllProblems = async (req, res) => {
  try {
    const problemList = await Problem.find({});
    return res.status(200).json(problemList);
  } catch (error) {
    // Handle any errors that occur during fetching from the database
    return res.status(500).json({ message: "Error retrieving problems" });
  }
};

export { addProblem, getAllProblems, getProblem };
