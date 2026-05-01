Set-Content -Path "c:\Users\DELL\OneDrive\Desktop\Restaurent_FoodApp\README.md" -Value @"
# 🍔 Restaurant Food App - Backend API

A full-featured restaurant management backend API built with Node.js, Express, and MongoDB.

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [API Endpoints](#-api-endpoints)
- [Middleware](#-middleware)
- [License](#-license)

---

## 🚀 Features

- **User Authentication** - Register/Login with JWT tokens
- **Role-based Access** - Admin and regular user roles
- **Restaurant Management** - CRUD operations for restaurants
- **Category Management** - Food categories
- **Food Management** - Full CRUD for menu items
- **Order System** - Place orders and track status
- **Password Security** - Bcryptjs hashing

---

## 🛠 Tech Stack

| Technology | Purpose |
|------------|---------|
| Node.js | Runtime environment |
| Express.js | Web framework |
| MongoDB + Mongoose | Database & ODM |
| JWT | Authentication |
| Bcryptjs | Password hashing |
| Cors | Cross-origin resource sharing |
| Morgan | HTTP request logging |
| Dotenv | Environment management |

---

## 📁 Project Structure

```
restaurant-food-app/
├── config/
│   └── db.js              # MongoDB connection
├── controllers/
│   ├── authController.js  # Authentication logic
│   ├── categoryController.js
│   ├── foodController.js
│   ├── restaurantController.js
│   ├── testController.js
│   └── userController.js
├── middleware/
│   ├── adminMiddleware.js # Admin access control
│   └── authMiddleware.js  # JWT verification
├── models/
│   ├── categoryModel.js
│   ├── foodModel.js
│   ├── orderModel.js
│   ├── restaurantModel.js
│   └── userModel.js
├── routes/
│   ├── authRoutes.js
│   ├── categoryRoutes.js
│   ├── foodRoutes.js
│   ├── restaurantRoutes.js
│   ├── testRoutes.js
│   └── userRoutes.js
├── .env                   # Environment variables
├── package.json
├── server.js              # Entry point
└── README.md
```

---

## 🏃 Getting Started

### Prerequisites

- Node.js (v14+)
- MongoDB (local or Atlas)

### Installation

\`\`\`bash
# Clone the repository
git clone <your-repo-url>

# Navigate to project directory
cd restaurant-food-app

# Install dependencies
npm install
\`\`\`

### Run the App

\`\`\`bash
# Development (with nodemon)
npm run server

# Production
node server.js
\`\`\`

Server runs at: **http://localhost:8080**

---

## 🔐 Environment Variables

Create a \`.env\` file in the root directory:

\`\`\`env
PORT=8080
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
\`\`\`

---

## 📡 API Endpoints

### 🔵 Test Routes
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | \`/api/v1/test\` | Test API |

### 🟢 Auth Routes
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | \`/api/v1/auth/register\` | Register new user |
| POST | \`/api/v1/auth/login\` | Login user |

### 🟣 User Routes
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | \`/api/v1/user/getAll\` | Get all users (admin) |
| GET | \`/api/v1/user/get/:id\` | Get single user |
| PUT | \`/api/v1/user/update/:id\` | Update user |
| DELETE | \`/api/v1/user/delete/:id\` | Delete user |

### 🟠 Restaurant Routes
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | \`/api/v1/restaurant/create\` | Create restaurant |
| GET | \`/api/v1/restaurant/getAll\` | Get all restaurants |
| GET | \`/api/v1/restaurant/get/:id\` | Get single restaurant |
| PUT | \`/api/v1/restaurant/update/:id\` | Update restaurant |
| DELETE | \`/api/v1/restaurant/delete/:id\` | Delete restaurant |

### 🔵 Category Routes
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | \`/api/v1/category/create\` | Create category |
| GET | \`/api/v1/category/getAll\` | Get all categories |
| GET | \`/api/v1/category/get/:id\` | Get single category |
| PUT | \`/api/v1/category/update/:id\` | Update category |
| DELETE | \`/api/v1/category/delete/:id\` | Delete category |

### 🟡 Food Routes
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | \`/api/v1/food/create\` | Create food item | ✅ |
| GET | \`/api/v1/food/getAll\` | Get all food items | ❌ |
| GET | \`/api/v1/food/get/:id\` | Get single food | ❌ |
| GET | \`/api/v1/food/getByResturant/:id\` | Get food by restaurant | ❌ |
| PUT | \`/api/v1/food/update/:id\` | Update food | ✅ |
| DELETE | \`/api/v1/food/delete/:id\` | Delete food | ✅ |
| POST | \`/api/v1/food/placeorder\` | Place order | ✅ |
| POST | \`/api/v1/food/orderStatus/:id\` | Update order status | ✅ Admin |

---

## 🛡 Middleware

### authMiddleware.js
Verifies JWT token from Authorization header.
\`\`\`headers
Authorization: Bearer <token>
\`\`\`

### adminMiddleware.js
Restricts access to admin users only.

---

## 📄 License

ISC License - © 2026 Abhirup Dutta

---

## 🧪 Test the API

\`\`\`bash
# Test server
curl http://localhost:8080

# Register user
curl -X POST http://localhost:8080/api/v1/auth/register \\
  -H "Content-Type: application/json" \\
  -d '{"userName":"john","email":"john@example.com","password":"123456","phone":"1234567890","address":"NYC","answer":"admin"}'
\`\`\`

---

**Happy Coding!** 🎉
"@