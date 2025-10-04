# Dr. Paws Veterinary Clinic Website

## Overview

This is a single-page web application for Dr. Paws Veterinary Clinic, a veterinary care provider. The application serves as the clinic's primary digital presence, showcasing services, facilitating contact, and establishing the clinic's brand identity. Built with React, TypeScript, and modern web technologies, the site features a responsive design with smooth animations and an image slider hero section.

The application currently implements only the home page with seven main sections: hero slider, about/intro, services overview, service packages, why choose us, contact form, and footer. The codebase is structured to support future expansion with additional pages and features.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Technology Stack:**
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized production builds
- **Routing**: Wouter (lightweight client-side routing library)
- **UI Components**: Shadcn/ui component library with Radix UI primitives
- **Styling**: Tailwind CSS with custom design tokens
- **Animations**: Framer Motion for scroll-based and interactive animations
- **State Management**: TanStack Query (React Query) for server state
- **Form Handling**: React Hook Form with Zod validation

**Design System:**
The application follows a strict brand guideline documented in `design_guidelines.md`:
- **Colors**: Custom HSL color palette with Pigment Green (primary), Charcoal (text), Saffron and Sandy Brown (accents)
- **Typography**: Rubik for headings, Poppins for body text (loaded via Google Fonts)
- **Component Library**: Extensive set of pre-built UI components in `client/src/components/ui/`
- **Layout**: Responsive grid system with Tailwind spacing scale (4, 6, 8, 12, 16, 20, 24, 32)

**Component Architecture:**
- Modular section-based components (`AboutSection.tsx`, `ServicesSection.tsx`, etc.)
- Reusable UI primitives from Shadcn/ui
- Example components in `client/src/components/examples/` for development reference
- Path aliases configured for clean imports (`@/`, `@shared/`, `@assets/`)

### Backend Architecture

**Server Framework:**
- Express.js with TypeScript
- Minimal API structure currently in place (routes defined in `server/routes.ts`)
- Custom logging middleware for request tracking
- Error handling middleware

**Storage Layer:**
- Interface-based storage design (`IStorage` in `server/storage.ts`)
- Current implementation uses in-memory storage (`MemStorage`)
- Structured to support migration to database storage
- Basic user management operations (create, retrieve by ID/username)

**Build Process:**
- Development: `tsx` for running TypeScript directly with hot reload
- Production: Vite builds client, esbuild bundles server into ESM format
- Static file serving handled by Vite in development, Express in production

### Data Storage

**Database Configuration:**
- **ORM**: Drizzle ORM configured for PostgreSQL
- **Provider**: Neon Database serverless driver (`@neondatabase/serverless`)
- **Schema Location**: `shared/schema.ts` defines database tables
- **Migrations**: Managed via Drizzle Kit, output to `./migrations`

**Current Schema:**
- Users table with UUID primary keys, username, and password fields
- Zod schemas for validation using `drizzle-zod`
- Schema is minimal and ready for expansion with clinic-specific entities (appointments, pets, medical records, etc.)

**Note**: While Drizzle and PostgreSQL infrastructure is configured, the application currently uses in-memory storage. Database integration requires running migrations and updating the storage implementation.

### Authentication & Authorization

Currently not implemented. The user schema exists but authentication flow (login, session management, JWT, etc.) is not built out. The storage interface includes basic user CRUD operations as foundation for future auth implementation.

## External Dependencies

### Third-Party Services

**Google Fonts CDN:**
- Rubik (weights: 400, 500, 600)
- Poppins (weights: 300, 400, 600, 700)
- Loaded in `client/index.html` header

**Database:**
- Neon Database (PostgreSQL-compatible serverless database)
- Connection via `DATABASE_URL` environment variable
- WebSocket-based connection using Neon's serverless driver

### Key NPM Packages

**UI & Styling:**
- `@radix-ui/*` - Unstyled, accessible component primitives (20+ components)
- `tailwindcss` - Utility-first CSS framework
- `class-variance-authority` - Utility for creating variant-based component APIs
- `framer-motion` - Animation library
- `embla-carousel-react` - Carousel/slider functionality

**Data & Forms:**
- `@tanstack/react-query` - Server state management
- `react-hook-form` - Form state and validation
- `@hookform/resolvers` - Validation resolver for react-hook-form
- `zod` - TypeScript-first schema validation
- `drizzle-orm` & `drizzle-zod` - Database ORM and schema integration

**Backend:**
- `express` - Web server framework
- `connect-pg-simple` - PostgreSQL session store for Express
- `date-fns` - Date utility library

**Development Tools:**
- `@replit/*` plugins - Vite plugins for Replit environment (error overlay, dev banner, cartographer)
- `tsx` - TypeScript execution for development
- `esbuild` - Fast JavaScript bundler for production builds

### Asset Management

Static assets (images) are stored in `attached_assets/` directory and accessed via the `@assets` path alias configured in Vite. The application currently uses generated veterinary-themed images for the hero slider and about section.