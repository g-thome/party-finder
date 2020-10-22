import { Document } from 'mongoose';

interface IGrupo extends Document {
  name: string;
  dateTime: Date;
  members: string[];
}

export default IGrupo;
