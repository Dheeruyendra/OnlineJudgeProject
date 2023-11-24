import mongoose from "mongoose";

const submissionSchema = mongoose.Schema({
  problemid: {
    type: String,
    required: true,
  },
  submissions: [
    {
      userid: {
        type: String,
        required: true,
      },
      language: {
        type: String,
        required: true,
      },
      code: {
        type: String,
        required: true,
      },
      verdict: {
        type: String,
        required: true,
      },
      timestamps: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});
export default mongoose.model("submission", submissionSchema);
