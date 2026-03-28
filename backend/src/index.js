const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { app, server } = require("./lib/socket");

const connectDB = require("./lib/db");
const authRoutes = require("./routes/auth.route");
const messageRoutes = require("./routes/message.route");

dotenv.config();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

const PORT = process.env.PORT || 5001;
server.listen(PORT, () => {
  console.log(`Backend server is running on port ${PORT}`);
  connectDB();
});
