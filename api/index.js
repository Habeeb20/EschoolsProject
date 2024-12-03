import express from "express";
import cors from "cors"
import dotenv from "dotenv"
import connectDb from "./db.js";
import morgan from "morgan"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import router from "./routes/schoolRoute.js";
import reportRouter from "./routes/reportRoute.js";
import requestRouter from "./routes/requestRoute.js";
// import visitorRoute from "./routes/visitorStats.js";
import examRoute from "./routes/examRoute.js"
import trainingRoute from "./routes/trainingRoute.js"
import teacherRoute from "./routes/teacherRoute.js"
import All from "./routes/allRoute.js"
import bookRoute from "./routes/bookshopRoute.js"
import tutorialRoute from "./routes/tutorial.js"
import storeRoute from "./routes/storeRoute.js"
import { v4 as uuidv4 } from 'uuid';
import Visitor from "./models/visitors.js";

import authJobrouter from "./routes/job/authejobsRoute.js";
import postjobroute from "./routes/job/employerRoute.js";
import applyjobroute from "./routes/job/JobseekerRoute.js";
dotenv.config();


connectDb()

const app = express()
app.use(express.json())


app.use(cors("https://eschoolconnect.ng/"))
app.use(bodyParser.json())
app.use(morgan('dev'))
app.use(cookieParser()); 






app.use(async (req, res, next) => {
  const visitorId = uuidv4(); 

  if (!visitorId) {
    visitorId = generateUniqueVisitorId(); 
    res.cookie('visitorId', visitorId, { maxAge: 365 * 24 * 60 * 60 * 1000 }); 
    await Visitor.create({ visitorId, isReturning: false });
  }


  const visitor = await Visitor.findOne({ visitorId });

  if (visitor) {
    visitor.lastVisit = Date.now();
    visitor.isReturning = true;
    await visitor.save();
  }

  next();
});


app.get('/api/stats', async (req, res) => {
  try {
    const totalVisits = await Visitor.countDocuments();
    const newVisitors = await Visitor.countDocuments({ isReturning: false });
    const returningVisitors = await Visitor.countDocuments({ isReturning: true });


    const activeVisitors = await Visitor.find({
      lastVisit: { $gte: new Date(Date.now() - 5 * 60 * 1000) }, 
    });

 
    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const dailyVisitors = await Visitor.countDocuments({
      visitTime: { $gte: startOfDay },
    });

    // Send back stats
    res.json({
      totalVisits,
      newVisitors,
      returningVisitors,
      activeVisitors: activeVisitors.length,
      dailyVisitors,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching statistics' });
  }
});

function generateUniqueVisitorId() {
  return Math.random().toString(36).substr(2, 9);
}


const PORT =9000










app.use("/schools", router)

app.use("/job", authJobrouter)
app.use("/job", postjobroute)
app.use("/job", applyjobroute)


//request & report
app.use("/report", reportRouter)
app.use("/request", requestRouter)


//visitor
// app.use("/visitor", visitorRoute)

//exam 
app.use("/exam", examRoute)

//training
app.use("/training", trainingRoute )


//teacher
app.use("/teacher", teacherRoute)


//all
app.use("/all", All)


app.use("/book", bookRoute)


app.use("/tutorial", tutorialRoute)

app.use("/store", storeRoute)



 // Start server
 app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

app.get("/", (req, res) => {
    res.json("the api for eschools is perfectly working right now.......")
  })