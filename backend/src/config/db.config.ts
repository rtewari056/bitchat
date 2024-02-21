import mongoose from 'mongoose';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(process.cwd(), 'src/.env') });

import log from '../helpers/logger'; // Logger service

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    log.info('MongoDB connected!!')
  } catch (error) {
    log.error('Failed to connect to MongoDB')
    process.exit(1);
  }
};

export default connectToMongoDB;