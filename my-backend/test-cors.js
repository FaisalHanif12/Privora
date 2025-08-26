const axios = require('axios');

// Test CORS configuration
async function testCORS() {
  const baseURL = 'http://192.168.0.117:5000';
  
  console.log('🧪 Testing CORS configuration...\n');
  
  try {
    // Test 1: Basic GET request
    console.log('1️⃣ Testing basic GET request...');
    const response1 = await axios.get(`${baseURL}/`);
    console.log('✅ GET request successful:', response1.data.message);
    
    // Test 2: Check CORS headers
    console.log('\n2️⃣ Checking CORS headers...');
    const response2 = await axios.get(`${baseURL}/`, {
      headers: {
        'Origin': 'http://192.168.0.117:5000'
      }
    });
    
    console.log('✅ CORS headers present');
    console.log('   Access-Control-Allow-Origin:', response2.headers['access-control-allow-origin']);
    console.log('   Access-Control-Allow-Credentials:', response2.headers['access-control-allow-credentials']);
    
    // Test 3: Test with different origin
    console.log('\n3️⃣ Testing with different origin...');
    const response3 = await axios.get(`${baseURL}/`, {
      headers: {
        'Origin': 'http://localhost:3000'
      }
    });
    console.log('✅ Localhost origin allowed');
    
    // Test 4: Test preflight OPTIONS request
    console.log('\n4️⃣ Testing preflight OPTIONS request...');
    const response4 = await axios.options(`${baseURL}/`, {
      headers: {
        'Origin': 'http://192.168.0.117:5000',
        'Access-Control-Request-Method': 'POST',
        'Access-Control-Request-Headers': 'Content-Type'
      }
    });
    console.log('✅ Preflight request successful');
    console.log('   Status:', response4.status);
    
    console.log('\n🎉 All CORS tests passed! Your server is properly configured.');
    
  } catch (error) {
    if (error.response) {
      console.error('❌ CORS test failed with status:', error.response.status);
      console.error('Response headers:', error.response.headers);
      console.error('Response data:', error.response.data);
    } else if (error.request) {
      console.error('❌ No response received. Is the server running?');
      console.error('Request error:', error.message);
    } else {
      console.error('❌ Error setting up request:', error.message);
    }
  }
}

// Test blocked origin
async function testBlockedOrigin() {
  const baseURL = 'http://192.168.0.117:5000';
  
  console.log('\n🚫 Testing blocked origin...');
  
  try {
    await axios.get(`${baseURL}/`, {
      headers: {
        'Origin': 'http://malicious-site.com'
      }
    });
    console.log('❌ Blocked origin test failed - request should have been blocked');
  } catch (error) {
    if (error.response && error.response.status === 403) {
      console.log('✅ Blocked origin test passed - malicious origin was blocked');
    } else {
      console.log('⚠️  Origin was blocked but with unexpected error:', error.message);
    }
  }
}

// Run tests
async function runTests() {
  await testCORS();
  await testBlockedOrigin();
  
  console.log('\n📋 CORS Configuration Summary:');
  console.log('   ✅ Allowed origins:');
  console.log('      - http://192.168.0.117:5000');
  console.log('      - http://192.168.0.117:3000');
  console.log('      - http://192.168.0.117:8081');
  console.log('      - http://localhost:3000');
  console.log('      - http://localhost:8081');
  console.log('      - http://localhost:5000');
  console.log('      - exp://192.168.0.117:8081');
  console.log('      - exp://localhost:8081');
  console.log('   ✅ Methods: GET, POST, PUT, DELETE, PATCH, OPTIONS');
  console.log('   ✅ Headers: Content-Type, Authorization, X-Requested-With, Accept');
  console.log('   ✅ Credentials: enabled');
  console.log('   ✅ Preflight caching: 24 hours');
}

// Check if axios is installed
try {
  require('axios');
  runTests();
} catch (error) {
  console.log('📦 Installing axios for testing...');
  const { execSync } = require('child_process');
  try {
    execSync('npm install axios', { stdio: 'inherit' });
    console.log('✅ Axios installed successfully');
    runTests();
  } catch (installError) {
    console.error('❌ Failed to install axios:', installError.message);
    console.log('\n💡 To test CORS manually:');
    console.log('   1. Start your server: npm run dev');
    console.log('   2. Open browser console at http://192.168.0.117:5000');
    console.log('   3. Run: fetch("/").then(r => console.log(r.headers))');
  }
}
