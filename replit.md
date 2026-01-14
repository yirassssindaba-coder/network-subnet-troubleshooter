# Network Tools - Subnet Calculator & Troubleshooting

## Overview

A professional network troubleshooting and subnet calculator web application. The tool provides two main features:

1. **Subnet Calculator** - Calculate network address, broadcast address, host range, subnet mask, wildcard mask, and other IP networking details from an IP address and CIDR notation
2. **Network Troubleshooting Guide** - Step-by-step diagnostic procedures for common network connectivity issues with executable commands and expected results

The application is built as a responsive single-page application optimized for both desktop and mobile use.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight client-side router)
- **State Management**: TanStack React Query for server state, React useState for local state
- **Build Tool**: Vite with hot module replacement
- **Styling**: Tailwind CSS with CSS variables for theming (light/dark mode support)
- **Component Library**: shadcn/ui components built on Radix UI primitives
- **Typography**: Inter (primary) and JetBrains Mono (technical data/code)

### Backend Architecture
- **Runtime**: Node.js with Express
- **Language**: TypeScript (compiled with tsx for development, esbuild for production)
- **API Pattern**: RESTful endpoints prefixed with `/api`
- **Session Storage**: In-memory storage with interface for database migration

### Data Layer
- **ORM**: Drizzle ORM configured for PostgreSQL
- **Schema Location**: `shared/schema.ts` (shared between client and server)
- **Validation**: Zod schemas with drizzle-zod integration
- **Current Storage**: In-memory implementation (MemStorage class) - database can be added later

### Project Structure
```
├── client/           # React frontend application
│   └── src/
│       ├── components/   # Reusable UI components
│       ├── pages/        # Route page components
│       ├── hooks/        # Custom React hooks
│       └── lib/          # Utility functions and data
├── server/           # Express backend
│   ├── routes.ts     # API route definitions
│   ├── storage.ts    # Data access layer
│   └── static.ts     # Static file serving
├── shared/           # Shared types and schemas
└── migrations/       # Drizzle database migrations
```

### Key Design Decisions

**Client-side Subnet Calculations**: All subnet calculations run in the browser (`client/src/lib/subnet-calculator.ts`) for instant results without server round-trips. This is appropriate since calculations are pure mathematical operations.

**Shared Type Definitions**: Network types (`shared/network-types.ts`) and database schemas (`shared/schema.ts`) are shared between client and server, ensuring type consistency across the stack.

**Component-Based UI**: Uses shadcn/ui pattern where components are copied into the project (`client/src/components/ui/`) rather than installed as dependencies, allowing full customization.

**Theme System**: CSS variables defined in `client/src/index.css` power both light and dark modes with smooth transitions.

## External Dependencies

### UI Component Primitives
- Radix UI - Accessible, unstyled component primitives (dialog, accordion, select, tabs, etc.)
- Lucide React - Icon library

### Database & ORM
- Drizzle ORM - TypeScript-first ORM
- PostgreSQL driver (pg) - Database connectivity (requires DATABASE_URL environment variable)
- connect-pg-simple - PostgreSQL session store

### Validation
- Zod - Runtime schema validation
- drizzle-zod - Generate Zod schemas from Drizzle tables

### Build & Development
- Vite - Frontend build tool and dev server
- tsx - TypeScript execution for Node.js
- esbuild - Production bundling for server code

### Styling
- Tailwind CSS - Utility-first CSS framework
- class-variance-authority - Component variant management
- tailwind-merge - Intelligent class merging