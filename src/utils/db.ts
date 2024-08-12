import mongoose from "mongoose";

export const connectDB = async () => {
  const connectionState = mongoose.connection.readyState;
  if (connectionState === 1) {
    console.log("MongoDB is already connected");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI!, {
      dbName: "fullstack",
      bufferCommands: false,
    });

    console.log("MongoDB connected");
  } catch (error: any) {
    console.log("Error connecting to MongoDB", error.message);
    process.exit(1);
  }
};
