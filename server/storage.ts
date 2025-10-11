import { type User, type InsertUser, type ServicePackage, type InsertServicePackage } from "@shared/schema";
import { randomUUID } from "crypto";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Service Packages
  getAllServicePackages(): Promise<ServicePackage[]>;
  getServicePackage(id: number): Promise<ServicePackage | undefined>;
  createServicePackage(pkg: InsertServicePackage): Promise<ServicePackage>;
  updateServicePackage(id: number, pkg: Partial<InsertServicePackage>): Promise<ServicePackage | undefined>;
  deleteServicePackage(id: number): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private packages: Map<number, ServicePackage>;
  private nextPackageId: number;

  constructor() {
    this.users = new Map();
    this.packages = new Map();
    this.nextPackageId = 1;
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getAllServicePackages(): Promise<ServicePackage[]> {
    return Array.from(this.packages.values());
  }

  async getServicePackage(id: number): Promise<ServicePackage | undefined> {
    return this.packages.get(id);
  }

  async createServicePackage(pkg: InsertServicePackage): Promise<ServicePackage> {
    const id = this.nextPackageId++;
    const servicePackage: ServicePackage = { 
      ...pkg, 
      id,
      popular: pkg.popular ?? false 
    };
    this.packages.set(id, servicePackage);
    return servicePackage;
  }

  async updateServicePackage(id: number, pkg: Partial<InsertServicePackage>): Promise<ServicePackage | undefined> {
    const existing = this.packages.get(id);
    if (!existing) return undefined;
    const updated = { ...existing, ...pkg };
    this.packages.set(id, updated);
    return updated;
  }

  async deleteServicePackage(id: number): Promise<boolean> {
    return this.packages.delete(id);
  }
}

// Use database storage
import { storage as dbStorage } from "./db-storage";
export const storage = dbStorage;
