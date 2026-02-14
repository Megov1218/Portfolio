# Portfolio CMS Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                         USER                                │
│                           │                                 │
│                           ▼                                 │
│              ┌────────────────────────┐                     │
│              │   Browser / Device     │                     │
│              └────────────────────────┘                     │
│                     │            │                          │
│         ┌───────────┘            └──────────┐               │
│         ▼                                   ▼               │
│  ┌─────────────┐                    ┌─────────────┐        │
│  │  Portfolio  │                    │  CMS Admin  │        │
│  │   Website   │                    │   /admin/   │        │
│  └─────────────┘                    └─────────────┘        │
└─────────────────────────────────────────────────────────────┘
         │                                      │
         │                                      │
         ▼                                      ▼
┌─────────────────┐                  ┌──────────────────┐
│  Netlify CDN    │                  │ Netlify Identity │
│  (Static Site)  │                  │  (Auth Service)  │
└─────────────────┘                  └──────────────────┘
         │                                      │
         │                                      │
         ▼                                      ▼
┌─────────────────┐                  ┌──────────────────┐
│  GitHub Repo    │◄─────────────────│  Git Gateway     │
│  (Source Code)  │                  │  (CMS Backend)   │
└─────────────────┘                  └──────────────────┘
```

---

## Content Flow

### Viewing Content (User)
```
User visits site
    ↓
Netlify CDN serves static HTML/CSS/JS
    ↓
React app loads
    ↓
Components mount
    ↓
contentLoader functions called
    ↓
Content files loaded (JSON/Markdown)
    ↓
Content rendered in components
    ↓
User sees portfolio
```

### Editing Content (Admin)
```
Admin visits /admin/
    ↓
Netlify Identity authentication
    ↓
CMS interface loads
    ↓
Admin edits content
    ↓
Admin clicks "Publish"
    ↓
Git Gateway commits to GitHub
    ↓
Netlify detects commit
    ↓
Build triggered
    ↓
Site rebuilt with new content
    ↓
New version deployed
    ↓
Users see updated content
```

---

## Component Architecture

```
┌─────────────────────────────────────────────────────────┐
│                        App.jsx                          │
│                     (Main App)                          │
└─────────────────────────────────────────────────────────┘
                           │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
        ▼                  ▼                  ▼
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│   Navbar     │  │    Hero      │  │    About     │
└──────────────┘  └──────────────┘  └──────────────┘
                         │                  │
                         ▼                  ▼
                  ┌─────────────┐    ┌─────────────┐
                  │  settings   │    │  settings   │
                  │   .json     │    │   .json     │
                  └─────────────┘    └─────────────┘
        │                  │                  │
        ▼                  ▼                  ▼
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│   Services   │  │    Skills    │  │   Projects   │
└──────────────┘  └──────────────┘  └──────────────┘
        │                  │                  │
        ▼                  ▼                  ▼
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│ services/   │    │  skills/    │    │ projects/   │
│  *.json     │    │ skills.json │    │   *.md      │
└─────────────┘    └─────────────┘    └─────────────┘
        │                  │                  │
        ▼                  ▼                  ▼
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│ Testimonials │  │   Contact    │  │    Footer    │
└──────────────┘  └──────────────┘  └──────────────┘
        │                  │                  │
        ▼                  ▼                  ▼
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│testimonials/│    │  settings   │    │  settings   │
│  *.json     │    │   .json     │    │   .json     │
└─────────────┘    └─────────────┘    └─────────────┘
```

---

## Content Loading System

```
┌─────────────────────────────────────────────────────────┐
│              src/lib/contentLoader.js                   │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │  loadSettings()                                 │   │
│  │  - Loads site/settings.json                     │   │
│  │  - Returns hero, about, contact, footer         │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │  loadServices()                                 │   │
│  │  - Loads all services/*.json                    │   │
│  │  - Sorts by order field                         │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │  loadTestimonials()                             │   │
│  │  - Loads all testimonials/*.json                │   │
│  │  - Sorts by order field                         │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │  loadSkills()                                   │   │
│  │  - Loads skills/skills.json                     │   │
│  │  - Returns categories array                     │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │  loadProjects()                                 │   │
│  │  - Loads all projects/*.md                      │   │
│  │  - Parses frontmatter                           │   │
│  │  - Sorts by date                                │   │
│  └─────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
                           │
                           │ Used by
                           ▼
┌─────────────────────────────────────────────────────────┐
│                    Components                           │
│                                                         │
│  Hero.jsx → loadSettings() → settings.hero             │
│  About.jsx → loadSettings() → settings.about           │
│  Services.jsx → loadServices() → services[]            │
│  Skills.jsx → loadSkills() → skills.categories[]       │
│  Projects.jsx → loadProjects() → projects[]            │
│  Testimonials.jsx → loadTestimonials() → testimonials[]│
│  Contact.jsx → loadSettings() → settings.contact       │
└─────────────────────────────────────────────────────────┘
```

---

## CMS Configuration

```
┌─────────────────────────────────────────────────────────┐
│           public/admin/config.yml                       │
│                                                         │
│  backend:                                               │
│    name: git-gateway                                    │
│    branch: main                                         │
│                                                         │
│  collections:                                           │
│    ┌─────────────────────────────────────────────┐     │
│    │  Site Settings (settings)                   │     │
│    │  - Hero, About, Contact, Footer             │     │
│    │  - Single file: site/settings.json          │     │
│    └─────────────────────────────────────────────┘     │
│    ┌─────────────────────────────────────────────┐     │
│    │  Projects (projects)                        │     │
│    │  - Folder: projects/                        │     │
│    │  - Format: Markdown with frontmatter        │     │
│    │  - Create/Edit/Delete enabled               │     │
│    └─────────────────────────────────────────────┘     │
│    ┌─────────────────────────────────────────────┐     │
│    │  Services (services)                        │     │
│    │  - Folder: services/                        │     │
│    │  - Format: JSON                             │     │
│    │  - Create/Edit/Delete enabled               │     │
│    └─────────────────────────────────────────────┘     │
│    ┌─────────────────────────────────────────────┐     │
│    │  Skills (skills)                            │     │
│    │  - Single file: skills/skills.json          │     │
│    │  - Nested categories and skills             │     │
│    └─────────────────────────────────────────────┘     │
│    ┌─────────────────────────────────────────────┐     │
│    │  Testimonials (testimonials)                │     │
│    │  - Folder: testimonials/                    │     │
│    │  - Format: JSON                             │     │
│    │  - Create/Edit/Delete enabled               │     │
│    └─────────────────────────────────────────────┘     │
└─────────────────────────────────────────────────────────┘
```

---

## Deployment Pipeline

```
┌─────────────────────────────────────────────────────────┐
│                    Developer                            │
└─────────────────────────────────────────────────────────┘
                           │
                           │ git push
                           ▼
┌─────────────────────────────────────────────────────────┐
│                  GitHub Repository                      │
│                                                         │
│  - Source code                                          │
│  - Content files                                        │
│  - Configuration                                        │
└─────────────────────────────────────────────────────────┘
                           │
                           │ webhook
                           ▼
┌─────────────────────────────────────────────────────────┐
│                   Netlify Build                         │
│                                                         │
│  1. Clone repository                                    │
│  2. Install dependencies (npm install)                  │
│  3. Build site (npm run build)                          │
│  4. Generate static files                               │
│  5. Deploy to CDN                                       │
└─────────────────────────────────────────────────────────┘
                           │
                           │ deploy
                           ▼
┌─────────────────────────────────────────────────────────┐
│                    Netlify CDN                          │
│                                                         │
│  - Serves static files                                  │
│  - Global distribution                                  │
│  - HTTPS enabled                                        │
│  - Fast delivery                                        │
└─────────────────────────────────────────────────────────┘
                           │
                           │ access
                           ▼
┌─────────────────────────────────────────────────────────┐
│                        Users                            │
└─────────────────────────────────────────────────────────┘
```

---

## Authentication Flow

```
┌─────────────────────────────────────────────────────────┐
│              Admin visits /admin/                       │
└─────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────┐
│         Netlify Identity Widget Loads                   │
└─────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────┐
│              Login with Credentials                     │
└─────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────┐
│         Netlify Identity Validates                      │
└─────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────┐
│              JWT Token Issued                           │
└─────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────┐
│              CMS Interface Loads                        │
└─────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────┐
│         Git Gateway Authorized with Token               │
└─────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────┐
│         Admin Can Edit and Publish Content              │
└─────────────────────────────────────────────────────────┘
```

---

## Data Structure

### Site Settings (settings.json)
```json
{
  "hero": {
    "title": "string",
    "titleHighlight": "string",
    "titleEnd": "string",
    "subtitle": "string",
    "primaryButtonText": "string",
    "secondaryButtonText": "string"
  },
  "about": {
    "title": "string",
    "paragraphs": ["string", "string", ...]
  },
  "contact": {
    "title": "string",
    "subtitle": "string",
    "email": "string"
  },
  "footer": {
    "copyright": "string"
  }
}
```

### Project (project.md)
```markdown
---
title: "string"
date: "YYYY-MM-DD"
description: "string"
featured: boolean
tech: ["string", "string", ...]
liveUrl: "string"
githubUrl: "string"
thumbnail: "/img/filename.jpg"
---
Markdown content here...
```

### Service (service.json)
```json
{
  "title": "string",
  "description": "string",
  "icon": "IconName",
  "items": ["string", "string", ...],
  "order": number
}
```

### Skills (skills.json)
```json
{
  "categories": [
    {
      "title": "string",
      "skills": ["string", "string", ...]
    }
  ]
}
```

### Testimonial (testimonial.json)
```json
{
  "name": "string",
  "role": "string",
  "company": "string",
  "quote": "string",
  "order": number
}
```

---

## Technology Stack

```
┌─────────────────────────────────────────────────────────┐
│                    Frontend Layer                       │
│                                                         │
│  React 19          - UI framework                       │
│  Vite 7            - Build tool                         │
│  Tailwind CSS 3    - Styling                            │
│  Framer Motion     - Animations                         │
│  Lucide React      - Icons                              │
└─────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────┐
│                   Content Layer                         │
│                                                         │
│  Decap CMS         - Content management                 │
│  front-matter      - Markdown parsing                   │
│  import.meta.glob  - Dynamic imports                    │
└─────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────┐
│                  Backend Layer                          │
│                                                         │
│  Netlify Identity  - Authentication                     │
│  Git Gateway       - CMS backend                        │
│  GitHub            - Content storage                    │
└─────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────┐
│                 Deployment Layer                        │
│                                                         │
│  Netlify           - Hosting & CDN                      │
│  GitHub Actions    - CI/CD (optional)                   │
└─────────────────────────────────────────────────────────┘
```

---

## Security Architecture

```
┌─────────────────────────────────────────────────────────┐
│                   Public Access                         │
│                                                         │
│  - Portfolio website (read-only)                        │
│  - Static files served via CDN                          │
│  - HTTPS enforced                                       │
│  - Security headers configured                          │
└─────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────┐
│                  Protected Access                       │
│                                                         │
│  - CMS admin interface (/admin/)                        │
│  - Netlify Identity authentication                      │
│  - Invite-only registration                             │
│  - JWT token-based sessions                             │
└─────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────┐
│                  Content Security                       │
│                                                         │
│  - Git Gateway authorization                            │
│  - GitHub repository access                             │
│  - Commit signing                                       │
│  - Version control                                      │
└─────────────────────────────────────────────────────────┘
```

---

## Performance Optimization

```
┌─────────────────────────────────────────────────────────┐
│                  Build Optimization                     │
│                                                         │
│  - Vite code splitting                                  │
│  - Tree shaking                                         │
│  - Minification                                         │
│  - Asset optimization                                   │
└─────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────┐
│                 Runtime Optimization                    │
│                                                         │
│  - Lazy loading images                                  │
│  - Dynamic imports for content                          │
│  - React component optimization                         │
│  - Efficient state management                           │
└─────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────┐
│                Delivery Optimization                    │
│                                                         │
│  - CDN distribution                                     │
│  - Caching headers                                      │
│  - Compression (gzip/brotli)                            │
│  - HTTP/2 support                                       │
└─────────────────────────────────────────────────────────┘
```

---

This architecture provides a scalable, secure, and performant solution for managing portfolio content through a user-friendly CMS interface.
