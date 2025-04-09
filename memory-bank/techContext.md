# Technical Context

## Technology Stack

### Frontend
- **Framework**: Next.js 14
  - App Router
  - React Server Components
  - Server Actions
  - Streaming SSR
  - Route Handlers

- **State Management**
  - React Hooks
  - Context API
  - Server Components
  - Supabase Real-time

- **UI Components**
  - Tailwind CSS
  - Radix UI
  - Framer Motion
  - React Hook Form
  - Zod validation

### Backend (Supabase)
- **Database**
  - PostgreSQL 15
  - PostGIS extensions
  - Row Level Security
  - Database Functions
  - Real-time subscriptions

- **Authentication**
  - Supabase Auth
  - JWT tokens
  - OAuth providers
  - Magic links
  - Role-based access

- **Edge Functions**
  - Deno runtime
  - TypeScript support
  - Edge deployment
  - Serverless execution

- **Storage**
  - S3-compatible
  - CDN delivery
  - Access controls
  - Image transformations

### Development Tools
- **IDE/Editor**
  - VS Code
  - ESLint
  - Prettier
  - TypeScript

- **Version Control**
  - Git
  - GitHub
  - Conventional commits
  - Branch protection

- **Package Management**
  - pnpm
  - Workspace support
  - Lock file
  - Dependency audit

### Testing Tools
- **Unit Testing**
  - Jest
  - React Testing Library
  - MSW for mocking
  - Test coverage

- **E2E Testing**
  - Cypress
  - Playwright
  - Screenshot testing
  - Network mocking

- **Performance Testing**
  - Lighthouse CI
  - Web Vitals
  - Performance budgets
  - Load testing

### Monitoring
- **Error Tracking**
  - Sentry
  - Error boundaries
  - Source maps
  - Release tracking

- **Analytics**
  - Vercel Analytics
  - Custom events
  - User journeys
  - Performance metrics

- **Logging**
  - Supabase logs
  - Edge Function logs
  - Application logs
  - Audit trails

## Development Setup

### Local Environment
```bash
# Required tools
node >= 18.0.0
pnpm >= 8.0.0
git >= 2.0.0
supabase cli >= 1.0.0

# Environment variables
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Development database
supabase start
supabase db push

# Development server
pnpm dev
```

### Project Structure
```
lendingapp/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   └── register/
│   ├── (dashboard)/
│   │   ├── loans/
│   │   └── settings/
│   ├── api/
│   │   └── edge/
│   └── layout.tsx
├── components/
│   ├── ui/
│   └── forms/
├── lib/
│   ├── supabase/
│   └── utils/
├── styles/
│   └── globals.css
└── supabase/
    ├── functions/
    ├── migrations/
    └── seed.sql
```

### Database Schema
```sql
-- Core tables
create table public.users (
  id uuid references auth.users not null primary key,
  email text not null unique,
  full_name text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table public.loans (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.users not null,
  amount decimal not null,
  term integer not null,
  status text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS Policies
alter table public.users enable row level security;
alter table public.loans enable row level security;

create policy "Users can read own profile"
  on users for select
  using (auth.uid() = id);

create policy "Users can read own loans"
  on loans for select
  using (auth.uid() = user_id);
```

## Technical Constraints

### Performance
- First Contentful Paint < 1.5s
- Time to Interactive < 3.5s
- Largest Contentful Paint < 2.5s
- Cumulative Layout Shift < 0.1
- First Input Delay < 100ms

### Security
- HTTPS only
- CSP headers
- CORS policies
- Rate limiting
- Input validation
- Output sanitization
- Secure sessions
- Audit logging

### Scalability
- Edge Function limits
  - Execution time: 50s
  - Memory: 150MB
  - Payload size: 6MB

- Database limits
  - Connections: Based on plan
  - Storage: Based on plan
  - Row size: 1GB
  - Query timeout: 30s

- Storage limits
  - File size: 50MB
  - Bucket size: Based on plan
  - Upload timeout: 30s

### Browser Support
- Chrome >= 87
- Firefox >= 78
- Safari >= 14
- Edge >= 88
- iOS >= 14
- Android >= 87

## Dependencies

### Core Dependencies
```json
{
  "dependencies": {
    "@supabase/auth-helpers-nextjs": "^0.8.0",
    "@supabase/supabase-js": "^2.38.0",
    "next": "^14.0.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "typescript": "^5.2.0"
  }
}
```

### Development Dependencies
```json
{
  "devDependencies": {
    "@types/node": "^20.0.0",
    "@types/react": "^18.2.0",
    "@typescript-eslint/eslint-plugin": "^6.0.0",
    "@typescript-eslint/parser": "^6.0.0",
    "eslint": "^8.0.0",
    "eslint-config-next": "^14.0.0",
    "prettier": "^3.0.0",
    "supabase": "^1.100.0"
  }
}
```

## Configuration

### Next.js Config
```typescript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    domains: [
      'your-project.supabase.co'
    ]
  }
}

module.exports = nextConfig
```

### TypeScript Config
```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### ESLint Config
```json
{
  "extends": [
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended"
  ],
  "parser": "@typescript-eslint/parser",
  "plugins": ["@typescript-eslint"],
  "root": true
}
```

### Prettier Config
```json
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5"
}
``` 