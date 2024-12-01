import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Employer from '../../models/jobs/Employer.js';
import JobSeeker from '../../models/jobs/JobSeeker.js';
import express from 'express';
const authJobrouter = express.Router()

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// Employer Register
authJobrouter.post ('/registeremployer', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const employerExists = await Employer.findOne({ email });
    if (employerExists) return res.status(400).json({ message: 'Employer already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const employer = new Employer({ name, email, password: hashedPassword });
    await employer.save();

    const token = generateToken(employer._id);
    res.status(201).json({ message: 'Employer registered successfully', token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Job Seeker Register
authJobrouter.post ('/registerjobseeker', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const jobSeekerExists = await JobSeeker.findOne({ email });
    if (jobSeekerExists) return res.status(400).json({ message: 'Job Seeker already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const jobSeeker = new JobSeeker({ name, email, password: hashedPassword });
    await jobSeeker.save();

    const token = generateToken(jobSeeker._id);
    res.status(201).json({ message: 'Job Seeker registered successfully', token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Employer Login Logic
authJobrouter.post('/employerlogin', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if employer exists
    const employer = await Employer.findOne({ email });
    if (!employer) {
      return res.status(404).json({ message: 'Employer not found' });
    }

    // Compare passwords
    const isMatch = await employer.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: employer._id, role: 'employer' }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    res.status(200).json({
      message: 'Login successful',
      token,
      employer: {
        id: employer._id,
        name: employer.name,
        email: employer.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Job Seeker Login Logic
authJobrouter.post('/jobseekerlogin', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if job seeker exists
    const seeker = await Seeker.findOne({ email });
    if (!seeker) {
      return res.status(404).json({ message: 'Job Seeker not found' });
    }

    // Compare passwords
    const isMatch = await seeker.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: seeker._id, role: 'seeker' }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    res.status(200).json({
      message: 'Login successful',
      token,
      seeker: {
        id: seeker._id,
        name: seeker.name,
        email: seeker.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// Get All Jobs Logic
authJobrouter.get('/alljobs', async (req, res) => {
  try {
    // Retrieve all employers with their job postings
    const employers = await Employer.find({}, 'name jobs').populate('jobPosts');

    // Extract and structure the jobs data
    const jobs = employers.flatMap((employer) =>
      // Check if employer.jobs exists and is an array before calling map
      Array.isArray(employer.jobs) 
        ? employer.jobs.map((job) => ({
            jobId: job._id,
            title: job.title,
            description: job.description,
            employerName: employer.name,
            applicantsCount: job.applicants.length,
          }))
        : []
    );

    res.status(200).json(jobs);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});




export default authJobrouter
