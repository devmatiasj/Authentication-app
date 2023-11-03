import { Schema } from 'mongoose';

export const OperatorsSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

