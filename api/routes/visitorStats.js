import express from "express";
import VisitorStats from "../models/visitors.js";

const visitorRoute = express.Router();


const getOrCreateStats = async () => {
  let stats = await VisitorStats.findOne();
  if (!stats) {
    stats = new VisitorStats();
    await stats.save();
  }
  return stats;
};

// Initialize stats
visitorRoute.get("/initialize", async (req, res) => {
  try {
    const stats = await getOrCreateStats();
    res.json(stats);
  } catch (error) {
    res.status(500).send("Error initializing stats.");
  }
});

visitorRoute.post("/visit", async (req, res) => {
    const { userId } = req.body;
    if (!userId) return res.status(400).send("User ID is required.");
  
 
    const stats = await VisitorStats.findOne();
    if (!stats) return res.status(404).send("Stats not found.");
  
  
    stats.users = stats.users || [];
  

    if (!stats.users.includes(userId)) {
      stats.users.push(userId); 
    }
  
  
    stats.totalVisits += 1;
  
    await stats.save();
    res.send("Visit count updated.");
  });
  

visitorRoute.post('/activeUser', async (req, res) => {
    const { sessionId } = req.body;
    if (!sessionId) return res.status(400).send("Session ID is required.");
  
    const stats = await VisitorStats.findOne();
    if (!stats) return res.status(404).send("Stats not found.");
  
    if (!stats.activeSessions.includes(sessionId)) {
      stats.activeSessions.push(sessionId);
      stats.activeUsers += 1;
      await stats.save();
    }
  
    res.send("Active user count updated.");
  });
  


visitorRoute.post('/inactiveUser', async (req, res) => {
    const { sessionId } = req.body;
    if (!sessionId) return res.status(400).send("Session ID is required.");
  
    const stats = await VisitorStats.findOne();
    if (!stats) return res.status(404).send("Stats not found.");
  
    if (stats.activeSessions.includes(sessionId)) {
      stats.activeSessions = stats.activeSessions.filter(id => id !== sessionId);
      stats.activeUsers -= 1;
      if (stats.activeUsers < 0) stats.activeUsers = 0; 
      await stats.save();
    }
  
    res.send("Active user removed.");
  });
  


visitorRoute.post('/returningUser', async (req, res) => {
    const { userId } = req.body;
    if (!userId) return res.status(400).send("User ID is required.");
  
    const stats = await VisitorStats.findOne();
    if (!stats) return res.status(404).send("Stats not found.");
    
    stats.users = stats.users || [];

    if (!stats.users.includes(userId)) {
   
      return res.status(400).send("User is not a returning user.");
    }
  
    stats.returningUsers += 1;
    await stats.save();
    res.send("Returning user count updated.");
  });
  

export default visitorRoute;
