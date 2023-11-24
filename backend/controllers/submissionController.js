import Submission from "../models/submissionSchema.js";

const addSubmission = async (req, res) => {
  const { problemid, language, code, userid, verdict } = req.body;
  if (!code) {
    return res.status(422).json({ message: "Please provide code" });
  }
  try {
    const submission = await Submission.findOne({ problemid });
    if (submission) {
      submission.submissions.push({ userid, language, code, verdict });
      await submission.save();
      res.status(201).json({ message: "Submission added successfully" });
    } else {
      const newSubmission = new Submission({
        problemid,
        submissions: [{ userid, language, code, verdict }],
      });
      await newSubmission.save();
      res.status(201).json({ message: "Submission added successfully" });
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const getSubmission = async (req, res) => {
  try {
    const submission = await Submission.findOne({ problemid: req.params.id });
    if (submission) {
      return res.status(200).json(submission);
    } else {
      return res.status(404).json({ message: "Submission not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export { addSubmission, getSubmission };
