# System Patterns

## Architecture Overview

### Application Structure
```
lendingapp/
├── apps/
│   ├── web/                 # Next.js frontend
│   │   ├── src/
│   │   │   ├── app/        # App Router pages
│   │   │   ├── components/ # React components
│   │   │   ├── lib/       # Utilities and helpers
│   │   │   └── styles/    # Global styles
│   │   └── public/         # Static assets
│   └── api/                # API routes
├── packages/
│   ├── shared/             # Shared utilities
│   └── ui/                 # UI component library
└── supabase/              # Supabase configuration
    ├── functions/         # Edge Functions
    ├── migrations/        # Database migrations
    └── seed/             # Seed data
```

### Design Patterns

1. Component Patterns
   ```typescript
   // Compound Components
   const Table = ({ children }) => <table>{children}</table>
   Table.Header = ({ children }) => <thead>{children}</thead>
   Table.Body = ({ children }) => <tbody>{children}</tbody>
   Table.Row = ({ children }) => <tr>{children}</tr>
   
   // Higher Order Components
   const withAuth = (Component) => {
     return (props) => {
       const { user } = useAuth()
       if (!user) return <Redirect to="/login" />
       return <Component {...props} user={user} />
     }
   }
   
   // Custom Hooks
   const useDebounce = (value, delay) => {
     const [debouncedValue, setDebouncedValue] = useState(value)
     useEffect(() => {
       const timer = setTimeout(() => setDebouncedValue(value), delay)
       return () => clearTimeout(timer)
     }, [value, delay])
     return debouncedValue
   }
   ```

2. State Management
   ```typescript
   // Context Provider
   export const AppContext = createContext<AppContextType>({})
   
   export const AppProvider = ({ children }) => {
     const [state, dispatch] = useReducer(reducer, initialState)
     return (
       <AppContext.Provider value={{ state, dispatch }}>
         {children}
       </AppContext.Provider>
     )
   }
   
   // Actions and Reducers
   type Action = 
     | { type: 'SET_USER'; payload: User }
     | { type: 'SET_THEME'; payload: Theme }
   
   const reducer = (state: State, action: Action): State => {
     switch (action.type) {
       case 'SET_USER':
         return { ...state, user: action.payload }
       case 'SET_THEME':
         return { ...state, theme: action.payload }
       default:
         return state
     }
   }
   ```

3. Data Fetching
   ```typescript
   // API Client
   const api = {
     get: async <T>(url: string): Promise<T> => {
       const response = await fetch(url)
       if (!response.ok) throw new Error('Network error')
       return response.json()
     },
     post: async <T>(url: string, data: any): Promise<T> => {
       const response = await fetch(url, {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify(data)
       })
       if (!response.ok) throw new Error('Network error')
       return response.json()
     }
   }
   
   // Data Hooks
   const useLoans = (userId: string) => {
     const { data, error } = useSWR(
       `/api/loans?userId=${userId}`,
       api.get
     )
     return {
       loans: data,
       isLoading: !error && !data,
       isError: error
     }
   }
   ```

### Routing Patterns

1. Route Groups
   ```typescript
   // (auth) group
   app/(auth)/login/page.tsx
   app/(auth)/register/page.tsx
   app/(auth)/layout.tsx
   
   // (dashboard) group
   app/(dashboard)/page.tsx
   app/(dashboard)/loans/page.tsx
   app/(dashboard)/clients/page.tsx
   app/(dashboard)/layout.tsx
   ```

2. Parallel Routes
   ```typescript
   // @modal parallel route
   app/@modal/default.tsx
   app/@modal/loading.tsx
   app/@modal/error.tsx
   
   // @sidebar parallel route
   app/@sidebar/default.tsx
   app/@sidebar/loading.tsx
   ```

3. Intercepting Routes
   ```typescript
   // (..)photo intercepting route
   app/photos/[id]/page.tsx
   app/photos/[id]/(..)photo/page.tsx
   ```

### Database Patterns

1. Schema Design
   ```sql
   -- Base tables
   create table users (
     id uuid primary key,
     email text unique,
     name text,
     created_at timestamptz default now()
   );
   
   create table loans (
     id uuid primary key,
     user_id uuid references users,
     amount decimal,
     status text,
     created_at timestamptz default now()
   );
   
   -- Junction tables
   create table loan_documents (
     loan_id uuid references loans,
     document_id uuid references documents,
     primary key (loan_id, document_id)
   );
   ```

2. Row Level Security
   ```sql
   -- Enable RLS
   alter table loans enable row level security;
   
   -- Define policies
   create policy "Users can view own loans"
     on loans for select
     using (auth.uid() = user_id);
   
   create policy "Users can create own loans"
     on loans for insert
     with check (auth.uid() = user_id);
   ```

3. Database Functions
   ```sql
   -- Calculate loan metrics
   create function calculate_loan_metrics(loan_id uuid)
   returns json
   language plpgsql
   security definer
   as $$
   declare
     result json;
   begin
     select json_build_object(
       'total_paid', sum(amount),
       'remaining', l.amount - sum(p.amount)
     )
     into result
     from loans l
     left join payments p on p.loan_id = l.id
     where l.id = loan_id
     group by l.id, l.amount;
     
     return result;
   end;
   $$;
   ```

### Security Patterns

1. Authentication
   ```typescript
   // Auth middleware
   export const middleware = async (req: NextRequest) => {
     const token = req.cookies.get('token')
     if (!token) {
       return NextResponse.redirect('/login')
     }
     try {
       await verifyToken(token)
       return NextResponse.next()
     } catch {
       return NextResponse.redirect('/login')
     }
   }
   
   // Protected routes
   export const config = {
     matcher: ['/dashboard/:path*', '/api/:path*']
   }
   ```

2. Input Validation
   ```typescript
   // Zod schema
   const LoanSchema = z.object({
     amount: z.number().min(1000).max(50000),
     term: z.number().min(6).max(60),
     purpose: z.string().min(10).max(200)
   })
   
   // Validation middleware
   const validate = (schema: ZodSchema) => {
     return async (req: NextRequest) => {
       try {
         await schema.parseAsync(req.body)
         return NextResponse.next()
       } catch (error) {
         return NextResponse.json(
           { error: 'Validation failed' },
           { status: 400 }
         )
       }
     }
   }
   ```

### Testing Patterns

1. Component Testing
   ```typescript
   // Component test
   describe('LoanCard', () => {
     it('renders loan details correctly', () => {
       const loan = {
         id: '123',
         amount: 5000,
         term: 12
       }
       
       render(<LoanCard loan={loan} />)
       
       expect(screen.getByText('$5,000')).toBeInTheDocument()
       expect(screen.getByText('12 months')).toBeInTheDocument()
     })
   })
   ```

2. Integration Testing
   ```typescript
   // API route test
   describe('POST /api/loans', () => {
     it('creates a new loan', async () => {
       const loan = {
         amount: 5000,
         term: 12,
         purpose: 'Home renovation'
       }
       
       const response = await fetch('/api/loans', {
         method: 'POST',
         body: JSON.stringify(loan)
       })
       
       expect(response.status).toBe(201)
       const data = await response.json()
       expect(data.id).toBeDefined()
     })
   })
   ```

3. E2E Testing
   ```typescript
   // Cypress test
   describe('Loan Application', () => {
     it('completes loan application flow', () => {
       cy.login()
       cy.visit('/apply')
       cy.fillLoanForm({
         amount: 5000,
         term: 12,
         purpose: 'Home renovation'
       })
       cy.get('[data-testid="submit"]').click()
       cy.url().should('include', '/dashboard')
     })
   })
   ```

## Current Implementation Focus

### Performance Optimization
1. Static page generation
2. Dynamic imports
3. Image optimization
4. API route caching

### Accessibility Improvements
1. ARIA labels
2. Keyboard navigation
3. Color contrast
4. Screen reader support

### Mobile Responsiveness
1. Fluid typography
2. Responsive layouts
3. Touch interactions
4. Mobile-first design 