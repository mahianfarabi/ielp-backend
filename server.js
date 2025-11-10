import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log("MongoDB Connected"))
//   .catch(err => console.error(err));

let isConnected = false;
async function connectToDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log("MongoDB Connected");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
};

// add middleware to check and connect to DB
app.use(async (req, res, next) => {
  if (!isConnected) {
    await connectToDB();
  }
  next();
});

// Sample route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Start server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
module.exports = app;

