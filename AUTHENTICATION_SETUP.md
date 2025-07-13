# Authentication System Setup

This document explains the authentication system implemented in the Nity Pulse frontend.

## Features Implemented

### 1. Professional API Service Structure
- **`lib/api.ts`**: Two axios instances - `publicApi` (for public endpoints) and `authApi` (for authenticated endpoints)
- **`lib/services/authService.ts`**: Singleton service class handling all authentication operations
- **`lib/types/auth.ts`**: TypeScript interfaces for type safety

### 2. Authentication Context
- **`lib/contexts/AuthContext.tsx`**: React context for global authentication state management
- Provides login, logout, register, and admin login functionality
- Automatic token refresh handling
- User state persistence

### 3. Authentication Pages
- **`app/login/page.tsx`**: Login page with user/admin toggle
- **`app/register/page.tsx`**: User registration page
- **`app/dashboard/page.tsx`**: Admin-only dashboard

### 4. Updated Components
- **`components/Header.tsx`**: Now includes authentication buttons and dashboard link for admins
- **`app/layout.tsx`**: Wrapped with AuthProvider

## API Endpoints Used

### Public Endpoints (no token required)
- `POST /api/core/register/` - User registration
- `POST /api/core/login/` - User login
- `POST /api/core/admin/login/` - Admin login
- `POST /api/core/login/refresh/` - Token refresh

### Protected Endpoints (token required)
- `GET /api/core/profile/` - Get user profile
- `GET /api/core/admin/profile/` - Get admin profile

## Environment Setup

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
```

## Usage

### 1. User Registration
```typescript
import { useAuth } from '@/lib/contexts/AuthContext';

const { register } = useAuth();

await register({
  first_name: 'John',
  last_name: 'Doe',
  email: 'john@example.com',
  password: 'password123',
  password_confirm: 'password123'
});
```

### 2. User Login
```typescript
const { login } = useAuth();

await login({
  email: 'john@example.com',
  password: 'password123'
});
```

### 3. Admin Login
```typescript
const { adminLogin } = useAuth();

await adminLogin({
  email: 'admin@example.com',
  password: 'admin123'
});
```

### 4. Check Authentication Status
```typescript
const { isAuthenticated, user, isLoading } = useAuth();

if (isAuthenticated && user?.is_admin) {
  // User is admin
}
```

### 5. Logout
```typescript
const { logout } = useAuth();
logout();
```

## Features

### ✅ Implemented
1. **Professional Service Architecture**: Separated API calls from components
2. **Two API Instances**: Public and authenticated endpoints
3. **Token Management**: Automatic token refresh and storage
4. **User Registration**: Complete registration flow
5. **User/Admin Login**: Separate login flows
6. **Dashboard Access**: Admin-only dashboard with protection
7. **Navigation Updates**: Header shows login/logout and dashboard button for admins
8. **Error Handling**: Comprehensive error handling with toast notifications
9. **Type Safety**: Full TypeScript support
10. **Responsive Design**: Mobile-friendly authentication pages

### 🔄 Login Flow
1. User visits `/login` or `/register`
2. After successful login, redirects to the page they came from or home
3. Admin users see a "Dashboard" button in the header
4. Non-admin users see regular navigation

### 🛡️ Security Features
- JWT token-based authentication
- Automatic token refresh
- Secure token storage in localStorage
- Protected routes (dashboard)
- Input validation and sanitization

## File Structure

```
nitypulse/
├── lib/
│   ├── api.ts                    # API instances
│   ├── services/
│   │   └── authService.ts        # Authentication service
│   ├── contexts/
│   │   └── AuthContext.tsx       # React context
│   └── types/
│       └── auth.ts               # TypeScript types
├── app/
│   ├── login/
│   │   └── page.tsx              # Login page
│   ├── register/
│   │   └── page.tsx              # Registration page
│   ├── dashboard/
│   │   └── page.tsx              # Admin dashboard
│   └── layout.tsx                # Root layout with AuthProvider
└── components/
    └── Header.tsx                # Updated header with auth
```

## Testing

1. Start the backend server (Django)
2. Start the frontend: `npm run dev`
3. Visit `http://localhost:3000`
4. Test registration and login flows
5. Test admin login and dashboard access

## Notes

- The system uses localStorage for token storage (consider using httpOnly cookies for production)
- All API calls are handled through the service layer
- Error messages are displayed using toast notifications
- The dashboard is protected and only accessible to admin users
- Responsive design works on all screen sizes 