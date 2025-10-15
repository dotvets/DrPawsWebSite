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
  nameAr: text("name_ar"),
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

export const partners = pgTable("partners", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  nameAr: text("name_ar"),
  logoUrl: text("logo_url"),
});

export const insertPartnerSchema = createInsertSchema(partners).omit({
  id: true,
}).extend({
  logoUrl: z.string().optional(),
});

export type InsertPartner = z.infer<typeof insertPartnerSchema>;
export type Partner = typeof partners.$inferSelect;

export const openingDiscount = pgTable("opening_discount", {
  id: serial("id").primaryKey(),
  firstName: varchar("first_name", { length: 50 }).notNull(),
  lastName: varchar("last_name", { length: 50 }).notNull(),
  phoneNumber: varchar("phone_number", { length: 15 }).notNull().unique(),
  emailAddress: varchar("email_address", { length: 50 }).notNull().unique(),
});

export const insertOpeningDiscountSchema = createInsertSchema(openingDiscount).omit({
  id: true,
}).extend({
  firstName: z.string().max(20, "First name must be 20 characters or less"),
  lastName: z.string().max(20, "Last name must be 20 characters or less"),
  phoneNumber: z.string().max(10, "Phone number must be 10 digits or less").regex(/^[0-9]+$/, "Phone number must contain only digits"),
  emailAddress: z.string().email("Invalid email address").max(50, "Email must be 50 characters or less"),
});

export type InsertOpeningDiscount = z.infer<typeof insertOpeningDiscountSchema>;
export type OpeningDiscount = typeof openingDiscount.$inferSelect;
