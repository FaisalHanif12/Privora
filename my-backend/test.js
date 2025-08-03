const express = require('express');
const app = express();

app.use(express.json());

// Test route
app.get('/test', (req, res) => {
  res.json({
    success: true,
    message: 'Backend is working!',
    timestamp: new Date().toISOString()
  });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Test server running on port ${PORT}`);
  console.log('✅ Backend setup is complete!');
  console.log('\n📁 File Structure:');
  console.log('├── controllers/authController.js');
  console.log('├── models/User.js');
  console.log('├── routes/authRoutes.js');
  console.log('├── middleware/authMiddleware.js');
  console.log('├── config/db.js');
  console.log('├── utils/sendEmail.js');
  console.log('├── server.js');
  console.log('└── package.json');
  console.log('\n🚀 Next Steps:');
  console.log('1. Create .env file with your configuration');
  console.log('2. Set up MongoDB database');
  console.log('3. Configure email settings');
  console.log('4. Run: npm run dev');
}); 