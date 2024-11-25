import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['jobSeeker', 'employer'], required: true },
  accountType: { type: String, enum: ['teacher', 'student'], required: false }, 
  appliedJobs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Job' }], 
});

export default mongoose.model('User', userSchema);
