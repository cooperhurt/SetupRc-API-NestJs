import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const SetupSchema = new Schema({
  Active: { type: Boolean, required: true },
  Car: {
    type: Schema.Types.ObjectId,
    ref: 'Car',
    autopopulate: true,
    required: true,
  },
  DriverName: { type: String, required: false },
  EventName: { type: String, required: false },
  ImagePath: {
    type: String,
    required: false,
    default: 'http://setuprc.com/img/SetupRc/defaultTrackCover.png',
  },
  Name: { type: String, required: true },
  SetupPath: { type: String, required: false },
  Size: { type: String, required: false },
  Surface: { type: String, required: false },
  Tips: { type: [String], required: false },
  TrackCondition: { type: String, required: false },
});

SetupSchema.plugin(require('mongoose-autopopulate'));

export { SetupSchema };

export interface Setup extends mongoose.Document {
  Active: boolean;
  Car: mongoose.Types.ObjectId;
  DriverName: string;
  EventName: string;
  ImagePath: string;
  Name: string;
  SetupPath: string;
  Size: string;
  Surface: string;
  Tips: [string];
  TrackCondition: string;
}
