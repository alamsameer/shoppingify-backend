import dotenv from 'dotenv';
dotenv.config();
const uri =process.env.MONGO_URI; 
// getting-started.js
import mongoose from 'mongoose';

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(uri);

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
export default main;


