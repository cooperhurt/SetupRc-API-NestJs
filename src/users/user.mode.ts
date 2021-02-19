import * as bcrypt from 'bcrypt';
import * as mongoose from 'mongoose';

export const UsersSchema = new mongoose.Schema({
    username: {
        type: String,
        maxlength: 255,
        minlength: 6,
        required: true
    },
    password: {
        type: String,
        minlength: 6,
        maxlength: 255,
        required: true
    },
    pid: {
        type: Number,
        minlength: 11,
        maxlength: 11,
        required: true
    },
    phone: { type: Number, required: true }
});

UsersSchema.pre('save', async function(next: mongoose.HookNextFunction) {
    try {
      if (!this.isModified('password')) {
        return next();
      }
      const hashed = await bcrypt.hash(this['password'], 10);
      this['password'] = hashed;
      return next();
    } catch (err) {
      return next(err);
    }
  });

export interface User extends mongoose.Document {
    id: string;
    username: string;
    password: string;
    pid: number;
    phone: number;
}