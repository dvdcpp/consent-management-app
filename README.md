## Getting Started

Before you begin, ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (v14 or higher recommended)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)

## Installation

```bash
# Clone the repository
git clone https://github.com/dvdcpp/consent-management-app.git
cd consent-management-app

# Install dependencies
npm install

# Start the development server
npm run dev
```

## Command Reference

```bash
npm run build      # Build the app for production
npm run test       # Run the test suite
npm run preview    # Preview the production build
npm run lint       # Lint the codebase
npm run type-check # Run TypeScript type checking
```

## Project Structure

- `src/`: Contains the main application source code.
  - `components/`: Components organized by feature or purpose.
  - `hooks/`: Custom hooks for state and side effects management.
  - `contexts/`: Contexts for global state management.
  - `pages/`: Main application views.
  - `types/`: TypeScript type definitions and interfaces.
  - `config/`: Configuration files.
  - `mocks/`: Mock data for consents.
  - `services/`: API service layers (mocked).
- `vite.config.ts`: Configuration file for Vite.
- `eslint.config.js`: ESLint configuration for code quality checks.
- `tsconfig.json`: TypeScript configuration for type checking and compiler options.

## Tech Stack
- React
- TypeScript
- Vite
- Material-UI
- React Router
- React Hook Form
- Yup
- Vitest
- ESLint

