import express from "express";
import User from "../../models/jobs/user.js";
import Job from "../../models/jobs/job.js";
import { authMiddleware } from "../../middleware/auth.js";
import nodemailer from "nodemailer"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
const jobrouter = express.Router()

jobrouter.post('/register', async (req, res) => {
  const { name, email, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ name, email, password: hashedPassword, role });
  try {
    await user.save();
    res.status(201).send('User registered successfully');
  } catch (err) {
    res.status(400).send(err.message);
  }
});

jobrouter.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).send('User not found');

  const validPass = await bcrypt.compare(password, user.password);
  if (!validPass) return res.status(400).send('Invalid credentials');

  const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET);
  res.header('Authorization', token).send({ token, user });
});


jobrouter.post("/jobs", authMiddleware, async (req, res) => {
    if (req.user.role !== 'employer') return res.status(403).send('Access Denied');
  
    const { title, description, requirements } = req.body;
    const job = new Job({ title, description, requirements, postedBy: req.user._id });
    try {
      await job.save();
      res.status(201).send('Job posted successfully');
    } catch (err) {
      res.status(400).send(err.message);
    }
  });


  jobrouter.get('/jobs', authMiddleware, async (req, res) => {
    const jobs = await Job.find().populate('postedBy', 'name email');
    res.send(jobs);
  });
  

  jobrouter.post('/apply/:jobId', authMiddleware, async (req, res) => {
  if (req.user.role !== 'job_seeker') return res.status(403).send('Access Denied');

  const { details } = req.body;
  const job = await Job.findById(req.params.jobId);
  if (!job) return res.status(404).send('Job not found');

  job.applicants.push({ seekerId: req.user._id, details });


  const employer = await User.findById(job.postedBy);
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: employer.email,
    subject: 'New Job Application Received',
    text: `A job seeker has applied for your job: ${job.title}.`,
  };

  try {
    await job.save();
    await transporter.sendMail(mailOptions);
    res.status(201).send('Application submitted successfully');
  } catch (err) {
    res.status(400).send(err.message);
  }
});

export default jobrouter