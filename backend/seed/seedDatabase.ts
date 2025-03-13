import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../src/models/User';
import Project from '../src/models/Project';
import bcrypt from 'bcryptjs';

dotenv.config();

const MONGODB_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/project_management';

const seedData = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Project.deleteMany({});

    // Create admin user
    const adminPassword = await bcrypt.hash('admin123', 10);
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@example.com',
      password: adminPassword,
      role: 'admin'
    });

    // Create customer user
    const customerPassword = await bcrypt.hash('customer123', 10);
    const customer = await User.create({
      name: 'Customer User',
      email: 'customer@example.com',
      password: customerPassword,
      role: 'customer',
      address: '123 Main St',
      squareFeet: 2500,
      contactNumber: '555-0123',
      siteLocation: 'Downtown',
      buildingType: 'Commercial'
    });

    // Create sample project
    await Project.create({
      customerId: customer._id,
      name: 'Office Renovation',
      address: '123 Main St',
      squareFeet: 2500,
      contactNumber: '555-0123',
      siteLocation: 'Downtown',
      buildingType: 'Commercial',
      progress: 30,
      status: 'In Progress',
      startDate: new Date(),
      estimatedCompletionDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 90 days from now
      updates: [
        {
          description: 'Project initiated',
          date: new Date(),
          progress: 0,
          files: []
        }
      ]
    });

    console.log('Database seeded successfully');
    console.log('Admin credentials: admin@example.com / admin123');
    console.log('Customer credentials: customer@example.com / customer123');

  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Database connection closed');
  }
};

seedData();
