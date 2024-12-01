
import mongoose from 'mongoose';

const jobSeekerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  appliedJobs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Job' }],
});

const JobSeeker = mongoose.model('JobSeeker', jobSeekerSchema);
export default JobSeeker;
