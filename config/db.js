import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(`Database connected successfully...`);
  } catch (error) {
    console.log(`Error in mongodb connection : ${error}`);
  }
};

export default connectDB;
