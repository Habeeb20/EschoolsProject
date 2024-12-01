
import mongoose from 'mongoose';

const employerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  jobPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Job' }],
});

const Employer = mongoose.model('Employer', employerSchema);
export default Employer;
