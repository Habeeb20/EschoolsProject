import express from "express";
import mongoose from "mongoose";
import School from "../models/school.js";
import Teachers from "../models/teacher.js"
import Training from "../models/training.js";
import Exam from "../models/exam.js";

const router = express.Router()



router.get("/details/:location", async (req, res) => {
  const { location } = req.params;

  try {
    const schools = await School.find({ state: location });
    const teachers = await Teachers.find({ state: location });
    const training = await Training.find({ state: location });
    const exam = await Exam.find({ state: location });

    res.json({
     schools,
     teachers,
     training,
     exam,
    });
  } catch (error) {
    console.error("Error fetching details for location:", error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

export default router