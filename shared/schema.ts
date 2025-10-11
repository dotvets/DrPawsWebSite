import { sql } from "drizzle-orm";
import { pgTable, text, varchar, boolean, serial, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const servicePackages = pgTable("service_packages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  nameAr: text("name_ar"),
  price: text("price").notNull(),
  period: text("period").notNull(),
  periodAr: text("period_ar"),
  popular: boolean("popular").notNull().default(false),
  features: text("features").array().notNull(),
  featuresAr: text("features_ar").array(),
});

export const insertServicePackageSchema = createInsertSchema(servicePackages).omit({
  id: true,
});

export type InsertServicePackage = z.infer<typeof insertServicePackageSchema>;
export type ServicePackage = typeof servicePackages.$inferSelect;

export const customerReviews = pgTable("customer_reviews", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  rating: integer("rating").notNull(),
  message: text("message").notNull(),
});

export const insertCustomerReviewSchema = createInsertSchema(customerReviews).omit({
  id: true,
}).extend({
  rating: z.number().min(1).max(5),
});

export type InsertCustomerReview = z.infer<typeof insertCustomerReviewSchema>;
export type CustomerReview = typeof customerReviews.$inferSelect;
