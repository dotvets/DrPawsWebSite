import { type User, type InsertUser, type ServicePackage, type InsertServicePackage, type CustomerReview, type InsertCustomerReview, type Partner, type InsertPartner, type OpeningDiscount, type InsertOpeningDiscount } from "@shared/schema";
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

  // Customer Reviews
  getAllCustomerReviews(): Promise<CustomerReview[]>;
  getCustomerReview(id: number): Promise<CustomerReview | undefined>;
  createCustomerReview(review: InsertCustomerReview): Promise<CustomerReview>;
  updateCustomerReview(id: number, review: Partial<InsertCustomerReview>): Promise<CustomerReview | undefined>;
  deleteCustomerReview(id: number): Promise<boolean>;

  // Partners
  getAllPartners(): Promise<Partner[]>;
  getPartner(id: number): Promise<Partner | undefined>;
  createPartner(partner: InsertPartner): Promise<Partner>;
  updatePartner(id: number, partner: Partial<InsertPartner>): Promise<Partner | undefined>;
  deletePartner(id: number): Promise<boolean>;

  // Opening Discount
  createOpeningDiscount(discount: InsertOpeningDiscount): Promise<OpeningDiscount>;
  checkPhoneNumberExists(phoneNumber: string): Promise<boolean>;
  checkEmailExists(email: string): Promise<boolean>;
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

  async getAllCustomerReviews(): Promise<CustomerReview[]> {
    throw new Error("Not implemented");
  }

  async getCustomerReview(id: number): Promise<CustomerReview | undefined> {
    throw new Error("Not implemented");
  }

  async createCustomerReview(review: InsertCustomerReview): Promise<CustomerReview> {
    throw new Error("Not implemented");
  }

  async updateCustomerReview(id: number, review: Partial<InsertCustomerReview>): Promise<CustomerReview | undefined> {
    throw new Error("Not implemented");
  }

  async deleteCustomerReview(id: number): Promise<boolean> {
    throw new Error("Not implemented");
  }

  async getAllPartners(): Promise<Partner[]> {
    throw new Error("Not implemented");
  }

  async getPartner(id: number): Promise<Partner | undefined> {
    throw new Error("Not implemented");
  }

  async createPartner(partner: InsertPartner): Promise<Partner> {
    throw new Error("Not implemented");
  }

  async updatePartner(id: number, partner: Partial<InsertPartner>): Promise<Partner | undefined> {
    throw new Error("Not implemented");
  }

  async deletePartner(id: number): Promise<boolean> {
    throw new Error("Not implemented");
  }

  async createOpeningDiscount(discount: InsertOpeningDiscount): Promise<OpeningDiscount> {
    throw new Error("Not implemented");
  }

  async checkPhoneNumberExists(phoneNumber: string): Promise<boolean> {
    throw new Error("Not implemented");
  }

  async checkEmailExists(email: string): Promise<boolean> {
    throw new Error("Not implemented");
  }
}

// Use database storage
import { storage as dbStorage } from "./db-storage";
export const storage = dbStorage;
