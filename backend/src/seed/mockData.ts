export const users = [
  {
    email: "admin@demo.com",
    password: "$2b$10$XOPbrlUPQdwdJUpSrIF6X.LbE14qsMmKGhM1A8W9E/vPt0Kk/Ax0W", // "admin123"
    role: "admin" as const
  },
  {
    email: "contact@abccorp.com",
    password: "$2b$10$NZ0qKJAGKg9qzHv5vT9xBeJ8ZAYAU4.QqxC9VH.k1QhFZ.R7qIGdC", // "abc123"
    role: "customer" as const,
    customerId: "CUST001"
  },
  {
    email: "info@resdev.com",
    password: "$2b$10$NZ0qKJAGKg9qzHv5vT9xBeJ8ZAYAU4.QqxC9VH.k1QhFZ.R7qIGdC", // "res123"
    role: "customer" as const,
    customerId: "CUST002"
  }
];

export const customers = [
  {
    id: "CUST001",
    name: "ABC Corporation",
    address: "789 Corporate Blvd",
    squareFeet: 5000,
    contactNumber: "555-0201",
    email: "contact@abccorp.com",
    siteLocation: "Downtown West",
    buildingType: "Commercial" as const
  },
  {
    id: "CUST002",
    name: "Residential Development LLC",
    address: "321 Housing Lane",
    squareFeet: 8000,
    contactNumber: "555-0202",
    email: "info@resdev.com",
    siteLocation: "Suburban East",
    buildingType: "Residential" as const
  }
];

export const projects = [
  {
    name: "Modern Office Complex",
    address: "123 Business Park",
    squareFeet: 5000,
    contactNumber: "555-0101",
    siteLocation: "Downtown West",
    buildingType: "Commercial" as const,
    progress: 45,
    status: "In Progress" as const,
    documents: [
      {
        url: "/uploads/sample-blueprint.pdf",
        type: "document" as const,
        name: "Blueprint",
        uploadedAt: new Date()
      }
    ],
    updates: [
      {
        description: "Foundation work completed",
        date: new Date(),
        progress: 45,
        files: []
      }
    ],
    startDate: new Date(),
    estimatedCompletionDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000)
  },
  {
    name: "Luxury Apartments",
    address: "456 Residential Ave",
    squareFeet: 8000,
    contactNumber: "555-0102",
    siteLocation: "Suburban East",
    buildingType: "Residential",
    progress: 20,
    status: "In Progress",
    documents: [],
    updates: [
      {
        description: "Site preparation started",
        date: new Date(),
        progress: 20,
        files: []
      }
    ],
    startDate: new Date(),
    estimatedCompletionDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
  }
];
