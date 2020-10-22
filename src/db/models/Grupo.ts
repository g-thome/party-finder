import mongoose, { Schema } from 'mongoose';
import IGrupo from '../../interfaces/IGrupo';

const ISO8601RegExp = /^([\+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-2])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s]((([01]\d|2[0-3])((:?)[0-5]\d)?|24\:?00)([\.,]\d+(?!:))?)?(\17[0-5]\d([\.,]\d+)?)?([zZ]|([\+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/;

const grupoSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 1,
  },
  dateTime: {
    type: Date,
    required: true,
    match: ISO8601RegExp,
  },
  members: {
    type: Array,
    required: true,
  },
}, { collection: 'grupos' });

const Grupo = mongoose.model<IGrupo>('Grupo', grupoSchema);

export default Grupo;

