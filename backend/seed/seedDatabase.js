const mongoose = require('mongoose');
const { users, projects, tasks, comments } = require('./mockData');

// MongoDB connection URL - adjust as needed
const MONGODB_URI = 'mongodb://localhost:27017/project_management';

// Import your Mongoose models
const User = require('../models/User');
const Project = require('../models/Project');
const Task = require('../models/Task');
const Comment = require('../models/Comment');

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Project.deleteMany({});
    await Task.deleteMany({});
    await Comment.deleteMany({});
    console.log('Cleared existing data');

    // Insert new data
    await User.insertMany(users);
    await Project.insertMany(projects);
    await Task.insertMany(tasks);
    await Comment.insertMany(comments);
    
    console.log('Database seeded successfully');
    
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await mongoose.connection.close();
    console.log('Database connection closed');
  }
}

// Run the seed function
seedDatabase();
