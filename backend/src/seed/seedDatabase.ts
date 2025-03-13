import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from '../models/User';
import Project from '../models/Project';
import Customer from '../models/Customer';
import { projects, customers } from './mockData';

dotenv.config();

const MONGODB_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/project_management';

const seedDatabase = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Project.deleteMany({});
    await Customer.deleteMany({});

    // Create admin user
    const adminPassword = await bcrypt.hash('admin123', 10);
    await User.create({
      name: 'Admin User',
      email: 'admin@example.com',
      password: adminPassword,
      role: 'admin'
    });

    // Create customers and their projects
    for (const customerData of customers) {
      const customerPassword = await bcrypt.hash('customer123', 10);
      const customer = await User.create({
        name: customerData.name,
        email: customerData.email,
        password: customerPassword,
        role: 'customer',
        address: customerData.address,
        squareFeet: customerData.squareFeet,
        contactNumber: customerData.contactNumber,
        siteLocation: customerData.siteLocation,
        buildingType: customerData.buildingType
      });

      // Create customer record
      await Customer.create(customerData);

      // Create project for this customer
      const projectData = projects.shift();
      if (projectData) {
        await Project.create({
          ...projectData,
          customerId: customer._id
        });
      }
    }

    console.log('Database seeded successfully');
    console.log('----------------------------------------');
    console.log('Demo Credentials:');
    console.log('Admin: admin@example.com / admin123');
    console.log('Customer: contact@abccorp.com / customer123');
    console.log('----------------------------------------');

  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Database connection closed');
  }
};

// Run seeding if this file is executed directly
if (require.main === module) {
  seedDatabase();
}

export default seedDatabase;
