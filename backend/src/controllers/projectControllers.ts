import { Response } from "express";
import path from 'path';
import Project from "../models/Project";
import { AuthRequest } from "../types/auth";
// import { Multer } from 'express-serve-static-core';

/**
 * Create a new project
 */
export const createProject = async (req: AuthRequest, res: Response) => {
  try {
    const { 
      customerId, 
      name, 
      address, 
      squareFeet, 
      contactNumber, 
      siteLocation, 
      buildingType,
      estimatedCompletionDate 
    } = req.body;

    const newProject = new Project({
      customerId,
      name,
      address,
      squareFeet,
      contactNumber,
      siteLocation,
      buildingType,
      estimatedCompletionDate,
      progress: 0,
      status: "Not Started"
    });

    await newProject.save();
    res.status(201).json({ message: "Project created successfully", project: newProject });
  } catch (error) {
    res.status(500).json({ message: "Error creating project", error });
  }
};

/**
 * Update project progress/status
 */
export const updateProject = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const { progress, status, update } = req.body;

    const project = await Project.findById(id);
    if (!project) return res.status(404).json({ message: "Project not found" });

    if (progress) project.progress = progress;
    if (status) project.status = status;
    if (update) project.updates.push({ ...update, date: new Date() });

    await project.save();
    res.json({ message: "Project updated successfully", project });
  } catch (error) {
    res.status(500).json({ message: "Error updating project", error });
  }
};

/**
 * Get projects for a specific customer
 */
export const getCustomerProjects = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const projects = await Project.find({ customerId: id });

    if (!projects.length) return res.status(404).json({ message: "No projects found" });

    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: "Error fetching projects", error });
  }
};

/**
 * Upload project files
 */
export const uploadProjectFiles = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const files = Array.isArray(req.files) ? req.files : [];
    
    if (!files.length) {
      return res.status(400).json({ message: "No files uploaded" });
    }

    // Validate file types and sizes
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf', 'video/mp4'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    const invalidFiles = files.filter(
      (file:any) => !allowedTypes.includes(file.mimetype) || file.size > maxSize
    );

    if (invalidFiles.length) {
      return res.status(400).json({
        message: "Invalid files detected",
        invalid: invalidFiles.map((f:any) => f.originalname)
      });
    }

    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    const newDocuments = files.map((file:any) => ({
      url: path.join('/uploads', file.filename).replace(/\\/g, '/'),
      type: file.mimetype.startsWith('image/') ? 'image' : 
            file.mimetype.startsWith('video/') ? 'video' : 'document',
      name: file.originalname.replace(/[^a-zA-Z0-9.-]/g, '_'),
      size: file.size,
      uploadedAt: new Date()
    }));

    project.documents.push(...newDocuments);
    await project.save();

    res.json({ message: "Files uploaded successfully", files: newDocuments });
  } catch (error) {
    console.error('File upload error:', error);
    res.status(500).json({ 
      message: "Error uploading files", 
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
  }
};

export const getProjectById = async (req: any, res: any) => {
  try {
    const projectId = req.params.id;
    const project = await Project.findById(projectId);
    
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: "Error fetching project", error });
  }
};

export const addProjectUpdate = async (req: any, res: any) => {
  try {
    const projectId = req.params.id;
    const { progress, description } = req.body;
    const files = Array.isArray(req.files) ? req.files : [];

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    const formattedFiles = files.map((file:any) => ({
      url: path.join('/uploads', file.filename).replace(/\\/g, '/'),
      type: file.mimetype.startsWith('image/') ? 'image' : 
            file.mimetype.startsWith('video/') ? 'video' : 'document',
      name: file.originalname.replace(/[^a-zA-Z0-9.-]/g, '_')
    }));

    const update = {
      progress,
      description,
      files: formattedFiles,
      date: new Date()
    };

    project.updates.push(update);
    await project.save();

    res.status(200).json({ message: "Project update added successfully", project });
  } catch (error) {
    res.status(500).json({ message: "Error adding project update", error });
  }
};
