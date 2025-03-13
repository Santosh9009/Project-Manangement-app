import mongoose, { Schema, Document } from "mongoose";

export interface IProject extends Document {
  customerId: mongoose.Types.ObjectId;
  name: string;
  address: string;
  squareFeet: number;
  contactNumber: string;
  siteLocation: string;
  buildingType: "Commercial" | "Residential";
  progress: number;
  status: "Not Started" | "In Progress" | "Completed";
  documents: Array<{
    url: string;
    type: "image" | "document" | "video";
    name: string;
    uploadedAt: Date;
  }>;
  updates: Array<{
    description: string;
    date: Date;
    progress: number;
    files: Array<{
      url: string;
      type: "image" | "document" | "video";
      name: string;
    }>;
  }>;
  startDate: Date;
  estimatedCompletionDate: Date;
}

const ProjectSchema = new Schema<IProject>({
  customerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  address: { type: String, required: true },
  squareFeet: { type: Number, required: true },
  contactNumber: { type: String, required: true },
  siteLocation: { type: String, required: true },
  buildingType: { 
    type: String, 
    enum: ["Commercial", "Residential"],
    required: true 
  },
  progress: { 
    type: Number, 
    default: 0,
    min: 0,
    max: 100 
  },
  status: { 
    type: String, 
    enum: ["Not Started", "In Progress", "Completed"],
    default: "Not Started"
  },
  documents: [{
    url: String,
    type: { 
      type: String, 
      enum: ["image", "document", "video"] 
    },
    name: String,
    uploadedAt: { 
      type: Date, 
      default: Date.now 
    }
  }],
  updates: [{
    description: String,
    date: { type: Date, default: Date.now },
    progress: Number,
    files: [{
      url: String,
      type: { 
        type: String, 
        enum: ["image", "document", "video"] 
      },
      name: String
    }]
  }],
  startDate: { type: Date, default: Date.now },
  estimatedCompletionDate: Date
}, {
  timestamps: true
});

export default mongoose.model<IProject>("Project", ProjectSchema);
