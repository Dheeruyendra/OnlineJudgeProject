import express from "express";
import { signup, login } from "../controllers/authController.js";
import { addProblem, getAllProblems, getProblem} from "../controllers/problemController.js";
import { addSubmission, getSubmission } from "../controllers/submissionController.js";
import run from "../controllers/judgeController.js";

const router = express.Router();

// Auth routes
router.post("/signup", signup);
router.post("/login", login);

// Problem routes
router.post("/addProblem", addProblem);
router.get("/problems", getAllProblems);
router.get("/problems/:id", getProblem);

// Submission routes
router.post("/addSubmission", addSubmission);
router.get("/submissions/:id", getSubmission);

// Judge route
router.post("/run", run);

export default router;
