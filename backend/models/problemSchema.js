import mongoose from "mongoose";

const problemSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  inpFormat: {
    type: String,
  },
  outFormat: {
    type: String,
  },
  difficulty: {
    type: String,
    required: true,
  },
  tag: {
    type: String,
    required: true,
  },
  constraints: {
    type: String,
  },
  sinput: {
    type: String,
    required: true,
  },
  soutput: {
    type: String,
    required: true,
  },
  
});
export default mongoose.model("problem", problemSchema);
