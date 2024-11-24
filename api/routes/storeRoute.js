import express from "express";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import Store from "../models/store.js";
import asyncHandler from "express-async-handler";
import pkg from "cloudinary";
import upload from "../upload.js";
import { protect7 } from "../middleware/auth.js";
import mongoose from "mongoose";
const { v2: cloudinary } = pkg;

const router = express.Router()
// Cloudinary setup
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: 624216876378923,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  
  const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: { folder: "schools" },
  });


  router.post(
    "/register",
    asyncHandler(async (req, res) => {
      const { username, password } = req.body;
  
      if (!username || !password) {
        res.status(400);
        throw new Error("Username and password are required.");
      }
  
      const existingexam = await Store.findOne({ username });
      if (existingexam) {
        res.status(400);
        throw new Error("User with this username already exists.");
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const exam = new Store({
        username,
        password: hashedPassword,
      });
  
      await exam.save();
  
      res.status(201).json({
        message: "User registered successfully.",
        exam,
      });
    })
  );


  router.post("/login", asyncHandler(async(req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        res.status(400);
        throw new Error("Username and password are required.");
      }
      const user = await Store.findOne({ username });
      if (!user) {
        res.status(404).json({ message: "Invalid username " });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        res.status(404);
        throw new Error("Invalid  password.");
      }
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });

      res.status(200).json({
        message:"Login successful",
        token, user})
  
  }))


  router.get('/dashboard', protect7,  asyncHandler(async(req, res) => {
    const userId = req.user.id;

    const user = await Store.findById(userId);
    if (!user) {
      res.status(404);
      throw new Error("User not found.");
    }

    res.status(200).json(user);

  }))


  router.put("/:id", protect7, asyncHandler(async(req, res) => {
    const {id} = req.params

    const exam = await Store.findById(id);
    if (!exam) {
      res.status(404);
      throw new Error("School not found.");
    }

    if (exam._id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("Not authorized to update this school.");
      }
      const updates = { ...req.body };

      const uploadFile = async (file) => {
        const result = await cloudinary.uploader.upload(file.tempFilePath, {
          folder: "schools",
        });
        return result.secure_url;
      };

      if (req.files) {
        if (req.files.picture1) {
          updates.picture1 = await uploadFile(req.files.picture1);
        }
        if (req.files.picture2) {
          updates.picture2 = await uploadFile(req.files.picture2);
        }
        if (req.files.picture3) {
          updates.picture3 = await uploadFile(req.files.picture3);
        }
        if (req.files.picture4) {
          updates.picture4 = await uploadFile(req.files.picture4);
        }
        if (req.files.picture5) {
            updates.picture5 = await uploadFile(req.files.picture5);
          }
          if (req.files.picture6) {
            updates.picture6 = await uploadFile(req.files.picture6);
          }
          if (req.files.picture7) {
            updates.picture7 = await uploadFile(req.files.picture7);
          }
    }

    const updatedExam = await Store.findByIdAndUpdate(id, updates, {
        new: true,
      });
      if (!updatedExam) {
        res.status(500);
        throw new Error("Failed to update exam.");
      }
      res.status(200).json({
        message: "Exam updated successfully.",
        updatedExam,
      });


  }))

  router.delete(
    "/:id",
    asyncHandler(async (req, res) => {
      const { id } = req.params;
  
      const school = await Store.findById(id);
      if (!school) {
        res.status(404);
        throw new Error("exam not found.");
      }
  
      await school.remove();
      res.status(200).json({ message: "exam deleted successfully." });
    })
  );

  router.get("/",  asyncHandler(async (req, res) => {
    try {
      const exam = await Store.find({});
      res.json(exam);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }) )



    // Get share count
router.get("/:id/shares", async (req, res) => {
    try {
      const { id } = req.params;
  
      const exam = await Store.findById(id);
  
      if (!exam) {
        return res.status(404).json({ message: "exam not found" });
      }
      res.status(200).json({ shareCount: exam.shares });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  });


  // Increment share count
router.post("/:id/shares", async(req, res) => {
    try {
      const { id } = req.params;
    
      const exam = await Store.findByIdAndUpdate(
        id,
        { $inc: { shares: 1 } }, 
        { new: true } 
      );
    
      if (!exam) {
         return res.status(404).json({ message: "School not found" });
      }
    
      res.status(200).json({ message: "Share count updated.", shareCount: exam.shares });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  })



  // Route to increment click count
router.post("/:id/click", async (req, res) => {
    try {
      const { id } = req.params;
      const exam = await store.findByIdAndUpdate(
        id,
        { $inc: { clicks: 1 } },
        { new: true }
      );
  
      if (!exam) {
        return res.status(404).json({ message: "School not found" });
      }
  
      res
        .status(200)
        .json({ message: "Click count updated", clicks: exam.clicks });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  });


  // Get the click count for a specific school
router.get("/get-clicks/:id", async (req, res) => {
    try {
      const { id } = req.params;
  
      const exam = await Store.findById(id);
  
      if (!exam) {
        return res.status(404).json({ message: "exam not found" });
      }
  
      res.status(200).json({ clicks: exam.clicks });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  });

  router.get("/get-clicks", async (req, res) => {
    try {
      const exams = await Store.find({}, "exam clicks"); // Fetch school name and clicks only
  
      res.status(200).json(exams);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  });




  
  router.get("/aStore/:id", async (req, res) => {
    console.log("Request parameters:", req.params);
    try {
      const { id } = req.params;
      console.log(req.params);
  
      if (!mongoose.Types.ObjectId.isValid(id)) {
        console.log("id not found");
        return res
          .status(400)
          .json({ success: false, message: "Invalid user ID" });
      }
  
      const exam = await Store.findById(id);
  
      if (!exam) {
        console.log("exam not found");
        return res
          .status(404)
          .json({ success: false, message: "exam not found" });
      }
  
      res.status(200).json({
        success: true,
       exam
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Something went wrong" });
    }
  });


  router.post("/:id/comments", async (req, res) => {
    const { name, text } = req.body;
    try {
      const school = await Store.findById(req.params.id);
      if (!school) {
        return res.status(404).json({ message: "exam not found" });
      }
      const newComment = { name, text };
      school.comments.push(newComment);
      await school.save();
      res.status(201).json({ comment: newComment });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });


  router.get("/countstore", async (req, res) => {
    try {
      const { locations } = req.query;
  
      if (!locations || !Array.isArray(locations)) {
        return res.status(400).json({
          message: "Locations query parameter must be an array of strings",
        });
      }
  
      const counts = await Promise.all(
        locations.map(async (loc) => {
          const count = await Store.countDocuments({
            location: { $regex: loc, $options: "i" },
          });
          return { location: loc, count };
        })
      );
  
      res.json(counts);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  });





export default router

