import express from 'express';
import { signup, login } from '../controllers/authController.js';
import {addProblem, getAllProblems} from '../controllers/problemController.js';

const router = express.Router();

router.route('/signup').post(signup);
router.route('/login').post(login);

router.route('/addProblem').post(addProblem);
router.route('/getAllProblems').get(getAllProblems);

export default router;