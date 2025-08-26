const express = require('express');
const dotenv = require('dotenv');
const { corsMiddleware, securityHeaders } = require('./config/cors');
const connectDB = require('./config/db');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Body parser
app.use(express.json());

// Enable CORS with specific configuration
app.use(corsMiddleware(process.env.NODE_ENV || 'development'));

// Add security headers
app.use(securityHeaders);

// Add request logging for debugging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path} - Origin: ${req.headers.origin || 'No Origin'}`);
  next();
});

// Mount routers
app.use('/api/auth', require('./routes/authRoutes'));

// Basic route
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Privora Backend API is running',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    cors: 'Enabled',
    allowedOrigins: ['http://192.168.0.117:5000', 'http://localhost:5000', 'exp://192.168.0.117:8081']
  });
});

// Handle 404
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
  console.log(`🌐 Server accessible at:`);
  console.log(`   - Local: http://localhost:${PORT}`);
  console.log(`   - Network: http://192.168.0.117:${PORT}`);
  console.log(`🔒 CORS enabled for development origins`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`❌ Error: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
}); 