import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: "admin" | "customer";
  address?: string;
  squareFeet?: number;
  contactNumber?: string;
  siteLocation?: string;
  buildingType?: "Commercial" | "Residential";
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "customer"], default: "customer" },
  // Customer specific fields
  address: { type: String },
  squareFeet: { type: Number },
  contactNumber: { type: String },
  siteLocation: { type: String },
  buildingType: { type: String, enum: ["Commercial", "Residential"] }
});

export default mongoose.model<IUser>("User", UserSchema);
