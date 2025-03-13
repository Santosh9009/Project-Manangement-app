export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'admin' | 'customer';
}

export interface Project {
  _id: string;
  customerId: string;
  name: string;
  address: string;
  squareFeet: number;
  contactNumber: string;
  siteLocation: string;
  buildingType: 'Commercial' | 'Residential';
  progress: number;
  status: 'Not Started' | 'In Progress' | 'Completed';
  documents: Array<{
    url: string;
    type: 'image' | 'document' | 'video';
    name: string;
    uploadedAt: Date;
  }>;
  updates: Array<{
    description: string;
    date: Date;
    progress: number;
    files: Array<{
      url: string;
      type: 'image' | 'document' | 'video';
      name: string;
    }>;
  }>;
  startDate: Date;
  estimatedCompletionDate: Date;
}

export interface Customer {
  _id: string;
  name: string;
  address: string;
  squareFeet: number;
  contactNumber: string;
  email: string;
  siteLocation: string;
  buildingType: 'Commercial' | 'Residential';
}
