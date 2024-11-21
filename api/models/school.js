import mongoose from "mongoose"
const schoolSchema = new mongoose.Schema({
  username:{type:String, required: true}, 
  password:{type:String, required: true},
  schoolName: String,
  email:String,
  phone:String,
  discount:String,
  discounttext:String,
  percent:String,
  duration:String,
  departments: String,
  faculty: String,
  admissionStartDate: Date,
  admissionEndDate: Date,
  admissionRequirements: String,
  category: String,
  state: String,
  LGA: String,

  location: String,
  schoolFees: Number,
  onBoarding: String,
  schoolbus:String,
  picture: String, 
  schoolPicture: String,
  coverPicture: String,

  picture1: String,
  picture2:String,
  picture3: String,
  picture4:String,
  TC:String,
  schoolNews:String,
  history:String,
  vcpicture:String,
  vcspeech:String,
  AO:String,

  comments: [
    {
      name: String,
      text: String,
      createdAt: { type: Date, default: Date.now }
    }
  ],
  clicks: { type: Number, default: 0 }, 
  shares: { type: Number, default: 0 },
}, {timestamps: true});

export default mongoose.model('School', schoolSchema);
