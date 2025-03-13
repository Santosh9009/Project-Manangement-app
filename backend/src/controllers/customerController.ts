import { Response } from "express";
import Customer from "../models/Customer";
import { AuthRequest } from "../types/auth";

/**
 * Add a new customer
 */
export const addCustomer = async (req: any, res: any) => {
  try {
    const { name, address, squareFeet, contactNumber, email, siteLocation, buildingType } = req.body;

    const newCustomer = new Customer({
      name,
      address,
      squareFeet,
      contactNumber,
      email,
      siteLocation,
      buildingType,
    });

    await newCustomer.save();
    res.status(201).json({ message: "Customer added successfully", customer: newCustomer });
  } catch (error) {
    res.status(500).json({ message: "Error adding customer", error });
  }
};

/**
 * Get all customers
 */
export const getCustomers = async (req: any, res: any) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (error) {
    res.status(500).json({ message: "Error fetching customers", error });
  }
};

/**
 * Get a specific customer by ID
 */
export const getCustomerById = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const customer = await Customer.findById(id);

    if (!customer) return res.status(404).json({ message: "Customer not found" });

    res.json(customer);
  } catch (error) {
    res.status(500).json({ message: "Error fetching customer", error });
  }
};
