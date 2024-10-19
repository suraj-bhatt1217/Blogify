import mongoose from "mongoose";

mongoose.connect(process.env.DATABASE_URL);

const db = mongoose.connection;

db.on("error", (error) => console.error("Error connecting to MongoDB:", error));
db.once("open", () => console.log("Connected to MongoDB successfully"));
