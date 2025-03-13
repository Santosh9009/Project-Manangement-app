import mongoose from "mongoose";

const CustomerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    squareFeet: { type: Number, required: true },
    contactNumber: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    siteLocation: { type: String, required: true },
    buildingType: { type: String, enum: ["Commercial", "Residential"], required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Customer", CustomerSchema);
