const users = [
  {
    _id: "user1",
    name: "John Doe",
    email: "john@example.com",
    role: "Project Manager",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg"
  },
  {
    _id: "user2",
    name: "Jane Smith",
    email: "jane@example.com",
    role: "Developer",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg"
  },
  {
    _id: "user3",
    name: "Mike Johnson",
    email: "mike@example.com",
    role: "Designer",
    avatar: "https://randomuser.me/api/portraits/men/2.jpg"
  }
];

const projects = [
  {
    _id: "proj1",
    name: "E-commerce Platform",
    description: "Building a modern e-commerce platform with React and Node.js",
    startDate: new Date("2024-01-01"),
    endDate: new Date("2024-06-30"),
    status: "In Progress",
    teamMembers: ["user1", "user2", "user3"],
    owner: "user1"
  },
  {
    _id: "proj2",
    name: "Mobile App Development",
    description: "Developing a fitness tracking mobile application",
    startDate: new Date("2024-02-01"),
    endDate: new Date("2024-08-31"),
    status: "Planning",
    teamMembers: ["user2", "user3"],
    owner: "user1"
  }
];

const tasks = [
  {
    _id: "task1",
    projectId: "proj1",
    title: "Setup Project Structure",
    description: "Initialize the project and set up basic architecture",
    assignedTo: "user2",
    status: "Completed",
    priority: "High",
    dueDate: new Date("2024-01-15")
  },
  {
    _id: "task2",
    projectId: "proj1",
    title: "Design User Interface",
    description: "Create UI mockups for the main pages",
    assignedTo: "user3",
    status: "In Progress",
    priority: "Medium",
    dueDate: new Date("2024-02-28")
  },
  {
    _id: "task3",
    projectId: "proj2",
    title: "Requirements Gathering",
    description: "Collect and document project requirements",
    assignedTo: "user1",
    status: "In Progress",
    priority: "High",
    dueDate: new Date("2024-02-15")
  }
];

const comments = [
  {
    _id: "comment1",
    taskId: "task1",
    userId: "user2",
    content: "Initial setup completed, ready for review",
    createdAt: new Date("2024-01-14")
  },
  {
    _id: "comment2",
    taskId: "task2",
    userId: "user3",
    content: "Working on the dashboard design",
    createdAt: new Date("2024-02-10")
  }
];

module.exports = {
  users,
  projects,
  tasks,
  comments
};
