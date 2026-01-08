# PostgreSQL Integration for AGL Services

This project now includes a PostgreSQL database backend for persistent data storage.

## Project Structure

```
react-app/
├── src/                    # React frontend
│   ├── services/
│   │   └── api.ts         # API service for backend communication
│   └── context/
│       ├── AdminContext.tsx   # Updated to use API
│       └── BlogContext.tsx    # Updated to use API
└── server/                 # Express.js backend
    ├── package.json
    ├── .env.example
    └── src/
        ├── index.js       # Express server entry point
        ├── config/
        │   └── database.js    # PostgreSQL connection
        ├── db/
        │   └── setup.js       # Database schema setup
        └── routes/
            ├── auth.js        # Authentication routes
            └── posts.js       # Blog posts CRUD routes
```

## Setup Instructions

### 1. Install PostgreSQL

```bash
# Ubuntu/Debian
sudo apt update
sudo apt install postgresql postgresql-contrib

# macOS (with Homebrew)
brew install postgresql@15
brew services start postgresql@15

# Start PostgreSQL service
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

### 2. Create Database

```bash
# Login to PostgreSQL
sudo -u postgres psql

# Create database and user
CREATE DATABASE agl_services;
CREATE USER agl_user WITH ENCRYPTED PASSWORD 'your_secure_password';
GRANT ALL PRIVILEGES ON DATABASE agl_services TO agl_user;
\q
```

### 3. Configure Backend

```bash
# Navigate to server directory
cd server

# Copy environment file
cp .env.example .env

# Edit .env with your database credentials
nano .env
```

Update the `.env` file:
```
DATABASE_URL=postgresql://agl_user:your_secure_password@localhost:5432/agl_services
JWT_SECRET=your-very-secure-random-jwt-secret-key
PORT=3001
FRONTEND_URL=http://localhost:5173
```

### 4. Install Dependencies

```bash
# Install backend dependencies
cd server
npm install

# Install frontend dependencies (if not already)
cd ..
npm install
```

### 5. Initialize Database

```bash
cd server
npm run db:setup
```

This will create the required tables and insert:
- Default admin user (username: `admin`, password: `agl@admin2024`)
- Sample blog posts

### 6. Run the Application

```bash
# Terminal 1: Start backend server
cd server
npm run dev

# Terminal 2: Start frontend
cd ..
npm run dev
```

## API Endpoints

### Authentication
- `POST /api/auth/login` - Login with username/password
- `GET /api/auth/verify` - Verify JWT token
- `POST /api/auth/change-password` - Change password (authenticated)

### Blog Posts
- `GET /api/posts/published` - Get all published posts (public)
- `GET /api/posts` - Get all posts (admin only)
- `GET /api/posts/id/:id` - Get post by ID
- `GET /api/posts/slug/:slug` - Get post by slug
- `POST /api/posts` - Create new post (admin only)
- `PUT /api/posts/:id` - Update post (admin only)
- `DELETE /api/posts/:id` - Delete post (admin only)

## Default Credentials

- **Username:** `admin`
- **Password:** `agl@admin2024`

⚠️ **Important:** Change these credentials in production!

## Environment Variables

### Backend (.env)
| Variable | Description | Default |
|----------|-------------|---------|
| DATABASE_URL | PostgreSQL connection string | - |
| JWT_SECRET | Secret key for JWT tokens | - |
| PORT | Server port | 3001 |
| FRONTEND_URL | Frontend URL for CORS | http://localhost:5173 |

### Frontend (.env)
| Variable | Description | Default |
|----------|-------------|---------|
| VITE_API_URL | Backend API URL | http://localhost:3001/api |
