# Overview

This is a full-stack web application built with React and Express.js, featuring a modern UI component library and PostgreSQL database integration. The project appears to be in early development with a chess-themed dashboard implementation and a robust foundation for future expansion.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript using Vite as the build tool
- **UI Components**: Shadcn/ui component library with Radix UI primitives
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **State Management**: TanStack Query (React Query) for server state management
- **Routing**: Wouter for client-side routing
- **Forms**: React Hook Form with Zod validation resolvers
- **Animations**: Framer Motion for component animations

## Backend Architecture
- **Server**: Express.js with TypeScript
- **Database ORM**: Drizzle ORM with PostgreSQL dialect
- **Session Management**: Express sessions with PostgreSQL store (connect-pg-simple)
- **API Design**: RESTful API structure with `/api` prefix
- **Development**: Hot reload with Vite development server integration

## Data Storage
- **Primary Database**: PostgreSQL using Neon Database serverless driver
- **ORM**: Drizzle ORM for type-safe database operations
- **Schema Management**: Drizzle Kit for migrations and schema management
- **Validation**: Drizzle-Zod integration for runtime schema validation
- **Fallback Storage**: In-memory storage implementation for development/testing

## Authentication & Authorization
- **Session-based Authentication**: Express sessions stored in PostgreSQL
- **User Schema**: Basic user model with username/password fields
- **Security**: Password hashing and session management (implementation pending)

## External Dependencies
- **Database**: Neon Database (PostgreSQL-compatible serverless database)
- **UI Components**: Radix UI primitives for accessibility-compliant components
- **Development Tools**: 
  - Replit integration for development environment
  - ESBuild for production builds
  - TypeScript for type safety
- **Styling**: Google Fonts (JetBrains Mono, Architects Daughter, DM Sans, Fira Code, Geist Mono)
- **Date/Time**: date-fns for date manipulation
- **Utilities**: Various utility libraries for class management (clsx, class-variance-authority)