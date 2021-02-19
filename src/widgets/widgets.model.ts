import * as mongoose from 'mongoose';


export const WidgetSchema = new mongoose.Schema({
    title: { type: String, required: true },
    text: { type: String, required: true },
    action: { type: String, required: true },
    icon: { type: String, required: true }
})

export interface Widget extends mongoose.Document {
    id: string;
    title: string;
    text: string;
    action: string;
    icon: string;
}