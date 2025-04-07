import  mongoose from 'mongoose'
const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/lms`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected Successfully!");
  } catch (err) {
    console.error("MongoDB Connection Error:", err.message);
    process.exit(1); // Exit if DB connection fails
  }
};

export default connectDB;

// import mongoose from 'mongoose'


// // Connect to MongoDB database

// const connectDB=async()=>{
//   mongoose.connection.on('connected',()=>
//   console.log('Database Connected'))

//   await mongoose.connect(`${process.env.MONGODB_URI}/lms`)
// }

// export default connectDB

