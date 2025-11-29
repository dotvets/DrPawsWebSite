import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertServicePackageSchema, insertCustomerReviewSchema, insertPartnerSchema, insertOpeningDiscountSchema } from "@shared/schema";
import { z } from "zod";
import { ObjectStorageService, ObjectNotFoundError } from "./objectStorage";
import { sendDiscountConfirmationEmail } from "./email-service";

export async function registerRoutes(app: Express): Promise<Server> {
  // Service Packages Routes
  
  // Get all service packages
  app.get("/api/service-packages", async (req, res) => {
    try {
      const packages = await storage.getAllServicePackages();
      res.json(packages);
    } catch (error) {
      console.error("Error fetching service packages:", error);
      res.status(500).json({ error: "Failed to fetch service packages", details: error instanceof Error ? error.message : String(error) });
    }
  });

  // Get single service package
  app.get("/api/service-packages/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const pkg = await storage.getServicePackage(id);
      if (!pkg) {
        return res.status(404).json({ error: "Service package not found" });
      }
      res.json(pkg);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch service package" });
    }
  });

  // Create service package
  app.post("/api/service-packages", async (req, res) => {
    try {
      const data = insertServicePackageSchema.parse(req.body);
      const pkg = await storage.createServicePackage(data);
      res.status(201).json(pkg);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid data", details: error.errors });
      }
      console.error("Error creating service package:", error);
      res.status(500).json({ error: "Failed to create service package", details: error instanceof Error ? error.message : String(error) });
    }
  });

  // Update service package
  app.put("/api/service-packages/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const data = insertServicePackageSchema.partial().parse(req.body);
      const pkg = await storage.updateServicePackage(id, data);
      if (!pkg) {
        return res.status(404).json({ error: "Service package not found" });
      }
      res.json(pkg);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to update service package" });
    }
  });

  // Delete service package
  app.delete("/api/service-packages/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteServicePackage(id);
      if (!success) {
        return res.status(404).json({ error: "Service package not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete service package" });
    }
  });

  // Customer Reviews Routes

  // Get all customer reviews
  app.get("/api/customer-reviews", async (req, res) => {
    try {
      const reviews = await storage.getAllCustomerReviews();
      res.json(reviews);
    } catch (error) {
      console.error("Error fetching customer reviews:", error);
      res.status(500).json({ error: "Failed to fetch customer reviews", details: error instanceof Error ? error.message : String(error) });
    }
  });

  // Get single customer review
  app.get("/api/customer-reviews/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const review = await storage.getCustomerReview(id);
      if (!review) {
        return res.status(404).json({ error: "Customer review not found" });
      }
      res.json(review);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch customer review" });
    }
  });

  // Create customer review
  app.post("/api/customer-reviews", async (req, res) => {
    try {
      const data = insertCustomerReviewSchema.parse(req.body);
      const review = await storage.createCustomerReview(data);
      res.status(201).json(review);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid data", details: error.errors });
      }
      console.error("Error creating customer review:", error);
      res.status(500).json({ error: "Failed to create customer review", details: error instanceof Error ? error.message : String(error) });
    }
  });

  // Update customer review
  app.put("/api/customer-reviews/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const data = insertCustomerReviewSchema.partial().parse(req.body);
      const review = await storage.updateCustomerReview(id, data);
      if (!review) {
        return res.status(404).json({ error: "Customer review not found" });
      }
      res.json(review);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to update customer review" });
    }
  });

  // Delete customer review
  app.delete("/api/customer-reviews/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteCustomerReview(id);
      if (!success) {
        return res.status(404).json({ error: "Customer review not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete customer review" });
    }
  });

  // Partners Routes

  // Get all partners
  app.get("/api/partners", async (req, res) => {
    try {
      const partners = await storage.getAllPartners();
      res.json(partners);
    } catch (error) {
      console.error("Error fetching partners:", error);
      res.status(500).json({ error: "Failed to fetch partners", details: error instanceof Error ? error.message : String(error) });
    }
  });

  // Get single partner
  app.get("/api/partners/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const partner = await storage.getPartner(id);
      if (!partner) {
        return res.status(404).json({ error: "Partner not found" });
      }
      res.json(partner);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch partner" });
    }
  });

  // Create partner
  app.post("/api/partners", async (req, res) => {
    try {
      const data = insertPartnerSchema.parse(req.body);
      const partner = await storage.createPartner(data);
      res.status(201).json(partner);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid data", details: error.errors });
      }
      console.error("Error creating partner:", error);
      res.status(500).json({ error: "Failed to create partner", details: error instanceof Error ? error.message : String(error) });
    }
  });

  // Update partner
  app.put("/api/partners/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const data = insertPartnerSchema.partial().parse(req.body);
      const partner = await storage.updatePartner(id, data);
      if (!partner) {
        return res.status(404).json({ error: "Partner not found" });
      }
      res.json(partner);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to update partner" });
    }
  });

  // Delete partner
  app.delete("/api/partners/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deletePartner(id);
      if (!success) {
        return res.status(404).json({ error: "Partner not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete partner" });
    }
  });

  // Object Storage Routes for Partner Logos

  // Serve public objects
  app.get("/public-objects/:filePath(*)", async (req, res) => {
    const filePath = req.params.filePath;
    const objectStorageService = new ObjectStorageService();
    try {
      const file = await objectStorageService.searchPublicObject(filePath);
      if (!file) {
        return res.status(404).json({ error: "File not found" });
      }
      objectStorageService.downloadObject(file, res);
    } catch (error) {
      console.error("Error searching for public object:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  // Serve private objects (partner logos)
  app.get("/objects/:objectPath(*)", async (req, res) => {
    const objectStorageService = new ObjectStorageService();
    try {
      const objectFile = await objectStorageService.getObjectEntityFile(
        req.path,
      );
      objectStorageService.downloadObject(objectFile, res);
    } catch (error) {
      console.error("Error checking object access:", error);
      if (error instanceof ObjectNotFoundError) {
        return res.sendStatus(404);
      }
      return res.sendStatus(500);
    }
  });

  // Get upload URL for partner logo
  app.post("/api/objects/upload", async (req, res) => {
    const objectStorageService = new ObjectStorageService();
    const uploadURL = await objectStorageService.getObjectEntityUploadURL();
    res.json({ uploadURL });
  });

  // Update partner with logo URL
  app.put("/api/partners/:id/logo", async (req, res) => {
    if (!req.body.logoURL) {
      return res.status(400).json({ error: "logoURL is required" });
    }

    try {
      const id = parseInt(req.params.id);
      const objectStorageService = new ObjectStorageService();
      const objectPath = await objectStorageService.trySetObjectEntityAclPolicy(
        req.body.logoURL,
        {
          owner: "admin",
          visibility: "public",
        },
      );

      const partner = await storage.updatePartner(id, { logoUrl: objectPath });
      if (!partner) {
        return res.status(404).json({ error: "Partner not found" });
      }

      res.status(200).json({
        objectPath: objectPath,
        partner,
      });
    } catch (error) {
      console.error("Error setting partner logo:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Opening Discount Routes

  // Check if phone number exists
  app.get("/api/opening-discount/check-phone/:phoneNumber", async (req, res) => {
    try {
      const phoneNumber = req.params.phoneNumber;
      const exists = await storage.checkPhoneNumberExists(phoneNumber);
      res.status(200).json({ exists });
    } catch (error) {
      console.error("Error checking phone number:", error);
      res.status(500).json({ error: "Failed to check phone number" });
    }
  });

  // Check if email exists
  app.get("/api/opening-discount/check-email/:email", async (req, res) => {
    try {
      const email = req.params.email;
      const exists = await storage.checkEmailExists(email);
      res.status(200).json({ exists });
    } catch (error) {
      console.error("Error checking email:", error);
      res.status(500).json({ error: "Failed to check email" });
    }
  });

  // Create opening discount registration
  app.post("/api/opening-discount", async (req, res) => {
    try {
      const data = insertOpeningDiscountSchema.parse(req.body);
      const registration = await storage.createOpeningDiscount(data);
      
      // Send confirmation email
      try {
        await sendDiscountConfirmationEmail({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.emailAddress,
          discountCode: data.phoneNumber,
          language: req.body.language || 'en',
        });
      } catch (emailError) {
        console.error("Error sending confirmation email:", emailError);
        // Don't fail the registration if email fails
      }
      
      res.status(201).json(registration);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid data", details: error.errors });
      }
      console.error("Error creating opening discount registration:", error);
      
      // Check for unique constraint violation
      if (error && typeof error === 'object' && 'code' in error && error.code === '23505') {
        return res.status(409).json({ error: "Phone number already registered" });
      }
      
      res.status(500).json({ error: "Failed to register", details: error instanceof Error ? error.message : String(error) });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
