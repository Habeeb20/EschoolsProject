import mongoose from "mongoose";
const JobSchema = new mongoose.Schema({
    title: String,
    description: String,
    requirements: [String],
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    applicants: [
      {
        seekerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        details: String,
      },
    ],
  });
  export default mongoose.model('Job', JobSchema);
  