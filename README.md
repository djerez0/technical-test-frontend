# To-Do Application

A modern to-do application built with React, TypeScript, and Vite. This application features a clean user interface, authentication, and real-time task management.

## Features

- User authentication
- Create, read, update, and delete tasks
- Modern UI with Tailwind CSS
- Responsive design
- Form validation with Zod
- State management with React Query
- Toast notifications with Sonner

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18 or higher)
- npm or yarn

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/djerez0/technical-test-frontend.git
cd technical-test-frontend
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check code quality
- `npm run test` - Run tests
- `npm run test:watch` - Run tests in watch mode

## Project Structure

```
src/
├── components/     # Reusable UI components
├── hooks/         # Custom React hooks
├── lib/           # Utility functions and configurations
├── pages/         # Page components
├── services/      # API services
├── types/         # TypeScript type definitions
└── App.tsx        # Main application component
```

## Technologies Used

- React 19
- TypeScript
- Vite
- Tailwind CSS
- React Query
- React Router
- React Hook Form
- Zod
- Radix UI
- Sonner (Toast notifications)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
