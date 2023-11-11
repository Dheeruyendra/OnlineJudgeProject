import mongoose from "mongoose";

const problemSchema = mongoose.Schema({
    title: {
        type: String,
        unique: true,
    },

    description: {
        type: String,
    },

    difficulty: {
        type: String,
    }, 
    
    tags: {
        type : String,
    },

    authorId: {
        type: String,
    }
    
}); 
export default mongoose.model("problem", problemSchema); 