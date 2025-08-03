# Privora Backend API

A scalable Node.js backend for the Privora wealth management mobile app.

## 🚀 Features

- **User Authentication**: Register, login, email verification
- **Password Management**: Forgot password, reset password
- **JWT Authentication**: Secure token-based authentication
- **Email Integration**: Password reset and verification emails
- **MongoDB Integration**: Scalable database with Mongoose ODM
- **Security**: Password hashing with bcrypt, input validation

## 📁 Project Structure

```
my-backend/
├── controllers/
│   └── authController.js      # Authentication logic
├── models/
│   └── User.js               # User model with Mongoose schema
├── routes/
│   └── authRoutes.js         # Authentication routes
├── middleware/
│   └── authMiddleware.js     # JWT authentication middleware
├── config/
│   └── db.js                 # MongoDB connection
├── utils/
│   └── sendEmail.js          # Email utility
├── .env                      # Environment variables
├── .gitignore               # Git ignore file
├── package.json             # Dependencies and scripts
├── server.js                # Main server file
└── README.md                # This file
```

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd my-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/privora
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   JWT_EXPIRE=30d
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-email-password
   EMAIL_FROM=privora@example.com
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   FROM_NAME=Privora
   FROM_EMAIL=privora@example.com
   ```

4. **Start the server**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

## 📡 API Endpoints

### Authentication Routes

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/auth/register` | Register new user | Public |
| POST | `/api/auth/login` | Login user | Public |
| POST | `/api/auth/forgot-password` | Send password reset email | Public |
| PUT | `/api/auth/reset-password/:token` | Reset password | Public |
| GET | `/api/auth/verify-email/:token` | Verify email address | Public |
| GET | `/api/auth/me` | Get current user | Private |

### Request/Response Examples

#### Register User
```bash
POST /api/auth/register
Content-Type: application/json

{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "Password123"
}
```

#### Login User
```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "Password123"
}
```

#### Forgot Password
```bash
POST /api/auth/forgot-password
Content-Type: application/json

{
  "email": "john@example.com"
}
```

## 🔧 Technologies Used

- **Node.js**: Runtime environment
- **Express.js**: Web framework
- **MongoDB**: Database
- **Mongoose**: ODM for MongoDB
- **JWT**: JSON Web Tokens for authentication
- **bcryptjs**: Password hashing
- **nodemailer**: Email sending
- **cors**: Cross-origin resource sharing
- **dotenv**: Environment variables

## 🔒 Security Features

- **Password Hashing**: Using bcrypt with salt rounds
- **JWT Tokens**: Secure authentication tokens
- **Email Verification**: Required before login
- **Password Reset**: Secure token-based reset
- **Input Validation**: Request validation and sanitization
- **CORS Protection**: Cross-origin request handling

## 🚀 Deployment

1. **Set up MongoDB**
   - Install MongoDB locally or use MongoDB Atlas
   - Update `MONGO_URI` in `.env`

2. **Configure Email**
   - Set up SMTP credentials in `.env`
   - Use Gmail or other SMTP provider

3. **Deploy to Platform**
   - Heroku, Vercel, or any Node.js hosting platform
   - Set environment variables on hosting platform

## 📝 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `PORT` | Server port | No (default: 5000) |
| `MONGO_URI` | MongoDB connection string | Yes |
| `JWT_SECRET` | Secret key for JWT tokens | Yes |
| `JWT_EXPIRE` | JWT token expiration time | No (default: 30d) |
| `EMAIL_USER` | Email username | Yes |
| `EMAIL_PASS` | Email password | Yes |
| `EMAIL_FROM` | From email address | Yes |
| `SMTP_HOST` | SMTP server host | Yes |
| `SMTP_PORT` | SMTP server port | Yes |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License. 