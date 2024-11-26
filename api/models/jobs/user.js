import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ['job_seeker', 'employer'], required: true },
});


export default mongoose.model('User', UserSchema);