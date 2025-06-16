# Bank Promotion System Frontend

This is the frontend application for the Bank Promotion System built with React and Vite.

## Setup Instructions

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory with the following structure:
```env
# API Configuration
VITE_API_URL=http://localhost:5000
```

3. Start the development server:
```bash
npm run dev
```

## Environment Variables

### API Configuration
- `VITE_API_URL`: Backend API URL (default: http://localhost:5000)

## Available Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run preview`: Preview production build locally

## Project Structure

```
src/
  ├── App.jsx        # Main application component
  └── App.css        # Styles
```

## Features

- Create new bank accounts with introducer system
- View all accounts in a table format
- Real-time updates when new accounts are created
- Responsive design
- Error handling and loading states
