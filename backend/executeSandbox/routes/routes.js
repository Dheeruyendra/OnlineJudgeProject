import express from 'express';
import { judgeHome, judgeExecute } from '../controller/judge.js';
const router = express.Router();   

router.route("/run").post(judgeExecute);
router.route("*").get(judgeHome);

export default router;