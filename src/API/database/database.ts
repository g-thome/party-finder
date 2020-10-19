import mongoose from 'mongoose';
import config from '../config';

async function connect() {
  mongoose.connect(config.mongoConnectionURI || '', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  const db = mongoose.connection;

  db.on('error', () => console.error('connection error'));
  db.once('open', () => console.log('connection stablished'));
}

export { connect }
