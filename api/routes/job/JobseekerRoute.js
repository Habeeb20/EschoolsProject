
import Job from '../../models/jobs/job.js';
import JobSeeker from '../../models/jobs/JobSeeker.js';
import { protectSeeker } from '../../middleware/authMiddleware.js';
import express from 'express';
const applyjobroute =express.Router()

applyjobroute.post("/applyjob/:id", protectSeeker, async (req, res) => {
  const jobId = req.params.jobId;
  const seeker = await JobSeeker.findById(req.user.id);

  const job = await Job.findById(jobId);
  if (!job) return res.status(404).json({ message: 'Job not found' });

  job.applicants.push(seeker._id);
  await job.save();

  seeker.appliedJobs.push(job._id);
  await seeker.save();

  res.status(200).json({ message: 'Applied for job successfully' });
});


applyjobroute.get("/getjobs", async (req, res) => {
    try {
      const applications = await Application.find({ seeker: req.user._id }).populate(
        'job',
        'title description employer'
      );
  
      res.status(200).json(applications);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

export default applyjobroute
