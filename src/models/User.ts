import mongoose, { Schema, Document, model } from "mongoose";

interface IUser extends Document {
  clerkId: string;
  email: string;
  name?: string;
}

const UserSchema = new Schema<IUser>({
  clerkId: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  name: { type: String },
});

export default mongoose.models.User || model<IUser>("User", UserSchema);