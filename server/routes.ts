import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertServicePackageSchema } from "@shared/schema";
import { z } from "zod";

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

  const httpServer = createServer(app);

  return httpServer;
}
