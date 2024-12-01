
import Job from '../../models/jobs/job.js';
import Employer from '../../models/jobs/Employer.js';
import { protectEmployer } from '../../middleware/authMiddleware.js';
import express from 'express';
const postjobroute = express.Router()

postjobroute.post("/postjob", protectEmployer, async (req, res) => {
  const { title, description, location } = req.body;
  const employer = await Employer.findById(req.user.id);

  const newJob = new Job({ title, description, location, employer: employer._id });
  await newJob.save();

  employer.jobPosts.push(newJob._id);
  await employer.save();

  res.status(201).json({ message: 'Job posted successfully', job: newJob });
});




postjobroute.get("/getapplicant", async (req, res) => {
    try {
      const { jobId } = req.params;
  
      // Find the job by ID and populate the applications field
      const job = await Job.findById(jobId).populate('applications', 'name email resume');
  
      if (!job) {
        return res.status(404).json({ message: 'Job not found' });
      }
  
      // Ensure only the job's employer can view applicants
      if (job.employer.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: 'Not authorized to view applicants' });
      }
  
      res.status(200).json(job.applications);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  })
export default postjobroute
