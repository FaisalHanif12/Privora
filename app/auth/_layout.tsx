import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen 
        name="index"
        options={{ 
          headerShown: false,
          title: 'Auth'
        }} 
      />
      <Stack.Screen 
        name="login" 
        options={{ 
          headerShown: false,
          title: 'Sign In'
        }} 
      />
      <Stack.Screen 
        name="signup" 
        options={{ 
          headerShown: false,
          title: 'Sign Up'
        }} 
      />
      <Stack.Screen 
        name="forgot-password" 
        options={{ 
          headerShown: false,
          title: 'Forgot Password'
        }} 
      />
      <Stack.Screen 
        name="verify-otp" 
        options={{ 
          headerShown: false,
          title: 'Verify OTP'
        }} 
      />
      <Stack.Screen 
        name="reset-password" 
        options={{ 
          headerShown: false,
          title: 'Reset Password'
        }} 
      />
      <Stack.Screen 
        name="terms-of-service" 
        options={{ 
          headerShown: false,
          title: 'Terms of Service'
        }} 
      />
      <Stack.Screen 
        name="privacy-policy" 
        options={{ 
          headerShown: false,
          title: 'Privacy Policy'
        }} 
      />
    </Stack>
  );
}