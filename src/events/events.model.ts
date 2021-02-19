import * as mongoose from 'mongoose';


export const EventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    text: { type: String, required: true },
    imageUrl: { type: String, required: true }
})

export interface Event extends mongoose.Document {
    id: string;
    title: string;
    text: string;
    imageUrl: string;
}