---
description: Repository Information Overview
alwaysApply: true
---

# Farm-Sense-Glow Information

## Summary
Farm-Sense-Glow is a React-based web application focused on agricultural assistance. It provides features like breed recognition, disease prediction, AI chatbot for farming queries, and nearby hospital locator. The project is built with modern web technologies and integrates with Supabase for backend services.

## Structure
- **src/**: Main source code directory containing React components, pages, and application logic
  - **components/**: Reusable UI components including Layout and ProtectedRoute
  - **contexts/**: React context providers including AuthContext
  - **hooks/**: Custom React hooks
  - **integrations/**: External service integrations (Supabase)
  - **pages/**: Application pages including Home, BreedRecognition, DiseasePrediction, AIChatbot, etc.
- **public/**: Static assets served directly
- **supabase/**: Supabase configuration

## Language & Runtime
**Language**: TypeScript/JavaScript
**Version**: TypeScript 5.8.3
**Build System**: Vite 5.4.19
**Package Manager**: npm

## Dependencies
**Main Dependencies**:
- React 18.3.1
- React Router 6.30.1
- Supabase JS 2.57.4
- TanStack React Query 5.83.0
- OpenAI 5.20.1
- shadcn/ui components (via Radix UI)
- Tailwind CSS 3.4.17
- Zod 3.25.76

**Development Dependencies**:
- TypeScript 5.8.3
- Vite 5.4.19
- ESLint 9.32.0
- PostCSS 8.5.6
- Tailwind plugins

## Build & Installation
```bash
# Install dependencies
npm install

# Development server
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

## Main Files & Resources
**Entry Point**: src/main.tsx
**App Configuration**: src/App.tsx
**Routing**: React Router defined in App.tsx
**API Integration**: 
- Supabase client in src/integrations/supabase/client.ts
- OpenAI integration for AI chatbot

## Key Features
- **Authentication**: Login/Signup via Supabase
- **Breed Recognition**: Animal breed identification
- **Disease Prediction**: Livestock disease diagnosis
- **AI Chatbot**: Farming assistance chatbot using OpenAI
- **Nearby Hospitals**: Location-based veterinary hospital finder

## Testing
**Test File**: test-api.js (API testing for OpenRouter integration)
**Testing Approach**: Manual testing with API endpoint verification

## Potential Issues
- API keys exposed in client-side code (Supabase, OpenRouter)
- Limited error handling in API integrations
- No comprehensive test suite
- No Docker configuration for containerized deployment