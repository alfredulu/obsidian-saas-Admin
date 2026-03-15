# Obsidian SaaS Admin

Obsidian SaaS Admin is a modern SaaS dashboard built with Next.js, designed to replicate the structure and interaction patterns of production-grade admin systems.

The project showcases responsive dashboard architecture, reusable UI components, and polished micro-interactions modeled after leading SaaS experiences.

## Features

### Core Dashboard
- Analytics overview with metric cards and charts
- Fully responsive layout that scales from desktop to foldable devices
- Command palette for fast navigation (Ctrl/Cmd + K)

### Productivity Tools
- Kanban-style task management
- Notes workspace with editor primitives
- Messaging interface with compact chat layout

### Management Interfaces
- User management directory with filters
- Companies directory
- Notifications feed with grouped items
- File manager for shared assets

### UX & Interface Enhancements
- Toast notification system
- Skeleton loading states
- Framer Motion-driven micro-interactions
- Glassmorphism styling anchored in the Obsidian Noir palette

## Tech Stack

- **Framework:** Next.js (App Router)
- **UI:** Tailwind CSS, Framer Motion
- **Charts:** Recharts
- **Icons:** Lucide React
- **Architecture:** Component-driven UI, reusable primitives, responsive layout contracts

## Getting Started

1. Clone the repository:
   ```bash
   git clone <repo-url>
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open http://localhost:3000 in your browser.

## Project Structure

```
/app
  pages, layouts, and route components

/components
  reusable UI building blocks

/lib
  utilities and mock data

/public
  static assets
```

## Goals of the Project

This project demonstrates architecture and interaction patterns typical of SaaS dashboards:

- Component-based UI systems
- Responsive admin layouts
- Complex navigation patterns
- Interactive dashboards
