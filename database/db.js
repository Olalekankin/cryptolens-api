const mongoose = require('mongoose');
const uri = process.env.MONGO_URI

//Function to connect to a database

const connectToDb = async ()=> {
 try {
   await mongoose.connect(uri);
   console.log('Database connected successfully')
 } catch (error) {
  console.error('Connection to mongoDb failed', error)
  process.exit(1);
 }
}

module.exports= connectToDb