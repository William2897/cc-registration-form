# Church Camp Registration Portal - Frontend

A modern, responsive registration system for the DAHC Church Camp 2025.

## Overview

This application provides a streamlined registration process for the Church Camp event scheduled for March 30 - April 1, 2025. The frontend is built with React, TypeScript, and Tailwind CSS, offering a multi-step registration flow with responsive design.

## Project Structure

```
frontend/
│
├── public/               # Static assets
│   └── _redirects        # Netlify redirects configuration
│
├── src/
│   ├── assets/           # Images and static resources
│   ├── components/       # UI components
│   │   ├── Confirmation.tsx
│   │   ├── PackageSelection.tsx
│   │   ├── PersonalInfo.tsx
│   │   ├── ProgressIndicator.tsx
│   │   ├── ReviewSubmit.tsx
│   │   └── WelcomeScreen.tsx
│   ├── App.tsx           # Main application component
│   ├── main.tsx          # Entry point
│   └── index.css         # Global styles
│
├── .env.development      # Development environment variables
├── .env.production       # Production environment variables
├── vite.config.ts        # Vite configuration
└── tailwind.config.js    # Tailwind CSS configuration
```

## Features

- **Multi-step registration process**: User-friendly step-by-step registration flow
- **Personal Information Collection**: Collects and validates personal details
- **Package Selection**: Offers both individual and family package options
- **Dynamic Pricing**: Calculates fees based on package type and family size
- **Family Member Management**: Allow adding multiple family members with custom information
- **Special Requirements**: Captures dietary restrictions, allergies and medical conditions
- **Guardian Information**: Collects guardian details for participants under 12
- **Mobile Responsive**: Works seamlessly across devices

## Setup and Installation

1. Clone the repository
2. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a `.env.development` file with:
   ```
   VITE_API_URL=http://localhost:5000
   ```
5. Start the development server:
   ```bash
   npm run dev
   ```

## Building for Production

```bash
npm run build
```

## Deployment Information

The frontend is deployed on Netlify. The `_redirects` file in the public directory ensures that client-side routing works correctly by redirecting all requests to index.html.

### Why Only Frontend Is in This Repository

This repository currently only contains the frontend code because:

1. **Deployment Strategy**: The frontend is deployed to Netlify while the backend is deployed to Heroku, requiring different deployment pipelines.
2. **Security Concerns**: Keeping the backend separate reduces exposure of sensitive database and server configurations.
3. **Independent Development**: This allows the frontend and backend to be developed and scaled independently.

The backend code is currently deployed directly to Heroku from a separate private repository. I plan to eventually merge both codebases into a monorepo structure

## Technologies Used

- **React**: UI framework
- **TypeScript**: Type safety
- **Vite**: Build tool and development server
- **Tailwind CSS**: Utility-first CSS framework
- **React Phone Input 2**: International phone number input
- **Lucide React**: Icon library

## Backend Communication

The frontend communicates with a Node.js/Express backend API hosted on Heroku. The connection URL is configured via environment variables.
