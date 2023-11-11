import Problem from "../models/Problem.js";

const addProblem = async (req, res) => {
   try{
     const {title, description, difficulty, tags} = req.body;
     const authorId = store.get('email');
     const problem = await Problem.create({
        title,
        description,
        difficulty,
        tags,
        authorId
     })
     return res.status(201).json({
        message : "Problem added successfully",
        problem
     });
   } catch (error) {
        return res.status(500).json({ message: "Error adding problem" });
    } 
};

const getAllProblems = async (req, res) => {
    try {
        const problemList = await Problem.find();
        return res.status(200).json(problemList);
    } catch (error) {
        // Handle any errors that occur during fetching from the database
        return res.status(500).json({ message: "Error retrieving problems" });
    }
};
   

export { addProblem, getAllProblems };