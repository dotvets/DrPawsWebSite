import { db } from "./db";
import { users, servicePackages, customerReviews, partners, openingDiscount, type User, type InsertUser, type ServicePackage, type InsertServicePackage, type CustomerReview, type InsertCustomerReview, type Partner, type InsertPartner, type OpeningDiscount, type InsertOpeningDiscount } from "@shared/schema";
import { eq } from "drizzle-orm";
import { IStorage } from "./storage";

export class DbStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id));
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username));
    return result[0];
  }

  async createUser(user: InsertUser): Promise<User> {
    const result = await db.insert(users).values(user).returning();
    return result[0];
  }

  async getAllServicePackages(): Promise<ServicePackage[]> {
    return await db.select().from(servicePackages);
  }

  async getServicePackage(id: number): Promise<ServicePackage | undefined> {
    const result = await db.select().from(servicePackages).where(eq(servicePackages.id, id));
    return result[0];
  }

  async createServicePackage(pkg: InsertServicePackage): Promise<ServicePackage> {
    const result = await db.insert(servicePackages).values(pkg).returning();
    return result[0];
  }

  async updateServicePackage(id: number, pkg: Partial<InsertServicePackage>): Promise<ServicePackage | undefined> {
    const result = await db.update(servicePackages)
      .set(pkg)
      .where(eq(servicePackages.id, id))
      .returning();
    return result[0];
  }

  async deleteServicePackage(id: number): Promise<boolean> {
    const result = await db.delete(servicePackages).where(eq(servicePackages.id, id)).returning();
    return result.length > 0;
  }

  async getAllCustomerReviews(): Promise<CustomerReview[]> {
    return await db.select().from(customerReviews);
  }

  async getCustomerReview(id: number): Promise<CustomerReview | undefined> {
    const result = await db.select().from(customerReviews).where(eq(customerReviews.id, id));
    return result[0];
  }

  async createCustomerReview(review: InsertCustomerReview): Promise<CustomerReview> {
    const result = await db.insert(customerReviews).values(review).returning();
    return result[0];
  }

  async updateCustomerReview(id: number, review: Partial<InsertCustomerReview>): Promise<CustomerReview | undefined> {
    const result = await db.update(customerReviews)
      .set(review)
      .where(eq(customerReviews.id, id))
      .returning();
    return result[0];
  }

  async deleteCustomerReview(id: number): Promise<boolean> {
    const result = await db.delete(customerReviews).where(eq(customerReviews.id, id)).returning();
    return result.length > 0;
  }

  async getAllPartners(): Promise<Partner[]> {
    return await db.select().from(partners);
  }

  async getPartner(id: number): Promise<Partner | undefined> {
    const result = await db.select().from(partners).where(eq(partners.id, id));
    return result[0];
  }

  async createPartner(partner: InsertPartner): Promise<Partner> {
    const result = await db.insert(partners).values(partner).returning();
    return result[0];
  }

  async updatePartner(id: number, partner: Partial<InsertPartner>): Promise<Partner | undefined> {
    const result = await db.update(partners)
      .set(partner)
      .where(eq(partners.id, id))
      .returning();
    return result[0];
  }

  async deletePartner(id: number): Promise<boolean> {
    const result = await db.delete(partners).where(eq(partners.id, id)).returning();
    return result.length > 0;
  }

  async createOpeningDiscount(discount: InsertOpeningDiscount): Promise<OpeningDiscount> {
    const result = await db.insert(openingDiscount).values(discount).returning();
    return result[0];
  }

  async checkPhoneNumberExists(phoneNumber: string): Promise<boolean> {
    const result = await db.select().from(openingDiscount).where(eq(openingDiscount.phoneNumber, phoneNumber));
    return result.length > 0;
  }

  async checkEmailExists(email: string): Promise<boolean> {
    const result = await db.select().from(openingDiscount).where(eq(openingDiscount.emailAddress, email));
    return result.length > 0;
  }
}

export const storage = new DbStorage();
