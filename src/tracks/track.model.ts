import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const TrackSchema = new Schema({
  Active: { type: Boolean, required: true },
  Name: { type: String, required: true },
  Latitude: { type: String, required: false },
  Longitude: { type: String, required: false },
  Hours: { required: false },
});


export interface Track extends mongoose.Document {
  Active: boolean;
  Name: string;
  Latitude: string;
  Longitude: string;
  Hours: any;
}
