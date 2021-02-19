import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const CarSchema = new Schema({
  Active: { type: Boolean, required: true },
  Name: { type: String, required: true },
  Latitude: { type: String, required: false },
  Longitude: { type: String, required: false },
  Hours: { required: false },
});


export interface Car extends mongoose.Document {
  Active: boolean;
  Name: string;
  Latitude: string;
  Longitude: string;
  Hours: any;
}
