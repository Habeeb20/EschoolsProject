import express from "express";
import cors from "cors"
import dotenv from "dotenv"
import connectDb from "./db.js";
import morgan from "morgan"
import bodyParser from "body-parser"
import router from "./routes/schoolRoute.js";
import reportRouter from "./routes/reportRoute.js";
import requestRouter from "./routes/requestRoute.js";
import visitorRoute from "./routes/visitorStats.js";

dotenv.config();


connectDb()

const app = express()
app.use(express.json())


app.use(cors())
app.use(bodyParser.json())
app.use(morgan('dev'))


const PORT =9000



app.use("/schools", router)


//request & report
app.use("/report", reportRouter)
app.use("/request", requestRouter)


//visitor
app.use("/visitor", visitorRoute)


 // Start server
 app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });