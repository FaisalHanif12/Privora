Build a scalable backend project structure 
- Node.js
- Express.js
- MongoDB (via Mongoose)
- JWT for authentication
- dotenv for environment variables
- bcrypt for password hashing
- Express Router for modular routes

💡 Requirements:
1. Folder structure must follow best practices for large-scale apps.
2. Use `routes/`, `controllers/`, `models/`, `config/`, and `middleware/` folders.
3. Include `db/conn.js` or `config/db.js` to connect MongoDB with mongoose.
4. Add `server.js` as entry point.
5. Implement these routes:
   - POST `/api/auth/register` → for signup
   - POST `/api/auth/login` → for login
   - POST `/api/auth/forgot-password` → to send reset token via email
   - POST `/api/auth/reset-password/:token` → to reset password
6. Use JWT for token creation and bcrypt for hashing.
7. Add `.env` for `MONGO_URI`, `JWT_SECRET`, and `PORT`. Make sure `.env` is in `.gitignore`.
8. Organize middleware like `authMiddleware.js` for protected routes.

Return full file structure with key code snippets like:
- User model
- Auth controller (register, login)
- JWT creation
- Password hashing
- Server setup

file structure

my-backend/
├── controllers/
│   └── authController.js
├── models/
│   └── User.js
├── routes/
│   └── authRoutes.js
├── middleware/
│   └── authMiddleware.js
├── config/
│   └── db.js
├── .env
├── .gitignore
├── package.json
├── server.js
