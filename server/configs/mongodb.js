// import mongoose from 'mongoose'


// // Connect to mongoDb database

// const connectDB=async()=>{
//   mongoose.connection.on('connected',()=>
//   console.log('Database Connected'))

//   await mongoose.connect(`${process.env.MONGODB_URI}/lms`)
// }

// export default connectDB

import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    mongoose.connection.on('connected', () => {
      console.log('Database Connected');
    });

    mongoose.connection.on('error', (err) => {
      console.error('Database Connection Error:', err);
    });

    await mongoose.connect(`${process.env.MONGODB_URI}/lms`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // Other options you might want to add:
      // serverSelectionTimeoutMS: 5000,
      // maxPoolSize: 10
    });
    
    console.log('Successfully connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;