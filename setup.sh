#!/bin/bash

# Create Next.js app
cd apps/web
pnpm dlx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-pnpm << EOF
No
Yes
Yes
Yes
Yes
Yes
Yes
@/*
EOF

# Install additional dependencies
pnpm add @supabase/auth-helpers-nextjs @supabase/supabase-js react-hook-form zod @hookform/resolvers react-hot-toast tailwind-merge @radix-ui/react-slot class-variance-authority clsx lucide-react

# Create required directories
mkdir -p src/lib/supabase src/components/ui src/app/dashboard/borrower/apply

# Return to root
cd ../..

# Make the script executable
chmod +x setup.sh 