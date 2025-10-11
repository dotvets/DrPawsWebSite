import { db } from "./db";
import { users, servicePackages, type User, type InsertUser, type ServicePackage, type InsertServicePackage } from "@shared/schema";
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
}

export const storage = new DbStorage();
