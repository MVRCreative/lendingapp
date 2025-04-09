# LendingApp

A modern lending platform built with Next.js, Supabase, and TypeScript.

## Features

- 🏦 Loan Management System
- 👥 Multi-tenant Organizations
- 💰 Payment Processing
- 📄 Document Management
- 🔐 Row Level Security
- 📱 Responsive Design

## Tech Stack

- **Frontend**: Next.js 14, React, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **Language**: TypeScript
- **Deployment**: Vercel
- **Package Manager**: pnpm
- **Monorepo**: Turborepo

## Project Structure

```
lendingapp/
├── apps/
│   ├── web/           # Next.js frontend
│   └── api/           # Edge Functions
├── packages/
│   ├── shared/        # Shared types and utilities
│   └── ui/            # Shared UI components
└── memory-bank/       # Project documentation
```

## Getting Started

1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Set up environment variables:
   ```bash
   cp apps/web/.env.example apps/web/.env.local
   ```

3. Start the development server:
   ```bash
   pnpm dev
   ```

## Development

- `pnpm dev`: Start development server
- `pnpm build`: Build all apps and packages
- `pnpm lint`: Run ESLint
- `pnpm test`: Run tests
- `pnpm format`: Format code with Prettier

## Contributing

1. Create a feature branch
2. Make your changes
3. Run tests and linting
4. Submit a pull request

## License

MIT 