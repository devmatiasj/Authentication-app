import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  address: { type: String, required: true },
  profilePicture: { type: String},
});

export interface UserDocument extends mongoose.Document {
  name: string;
  lastName: string;
  address: string;
  profilePicture: string;
}

export const UserModel = mongoose.model<UserDocument>('User', UserSchema);