

import mongoose from "mongoose";

const visitorStatsSchema = new mongoose.Schema({
  totalVisits: { type: Number, default: 0 },
  activeUsers: { type: Number, default: 0 },
  returningUsers: { type: Number, default: 0 },
  userHistory: { type: [String], default: [] },  
  activeSessions: { type: [String], default: [] } 
});

export default mongoose.model("VisitorStats", visitorStatsSchema);

