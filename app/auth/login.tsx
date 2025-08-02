import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LoginScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!password.trim()) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Navigate to main app after successful login
      router.replace('/(tabs)');
    }, 2000);
  };

  const handleSignup = () => {
    router.push('/auth/signup');
  };

  const isFormValid = email.trim() && password.trim() && !isLoading;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView 
            contentContainerStyle={{ 
              flexGrow: 1, 
              justifyContent: 'center',
              paddingHorizontal: 24,
              paddingVertical: 20
            }}
            showsVerticalScrollIndicator={false}
          >
            {/* Header */}
            <View style={{ marginBottom: 48, alignItems: 'center' }}>
              <Text style={{
                fontSize: 32,
                fontWeight: 'bold',
                color: colors.text,
                marginBottom: 8,
                textAlign: 'center'
              }}>
                Welcome Back
              </Text>
              <Text style={{
                fontSize: 16,
                color: colors.icon,
                textAlign: 'center',
                lineHeight: 24
              }}>
                Sign in to access your wealth management dashboard
              </Text>
            </View>

            {/* Form */}
            <View style={{ marginBottom: 32 }}>
              {/* Email Input */}
              <View style={{ marginBottom: 20 }}>
                <Text style={{
                  fontSize: 16,
                  fontWeight: '600',
                  color: colors.text,
                  marginBottom: 8
                }}>
                  Email Address
                </Text>
                <TextInput
                  style={{
                    borderWidth: 1,
                    borderColor: errors.email ? '#E74C3C' : colors.icon,
                    borderRadius: 12,
                    paddingHorizontal: 16,
                    paddingVertical: 16,
                    fontSize: 16,
                    color: colors.text,
                    backgroundColor: colorScheme === 'dark' ? '#1C1F26' : '#F8F9FA'
                  }}
                  placeholder="Enter your email"
                  placeholderTextColor={colors.icon}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
                {errors.email && (
                  <Text style={{ color: '#E74C3C', fontSize: 14, marginTop: 4 }}>
                    {errors.email}
                  </Text>
                )}
              </View>

              {/* Password Input */}
              <View style={{ marginBottom: 20 }}>
                <Text style={{
                  fontSize: 16,
                  fontWeight: '600',
                  color: colors.text,
                  marginBottom: 8
                }}>
                  Password
                </Text>
                <View style={{
                  borderWidth: 1,
                  borderColor: errors.password ? '#E74C3C' : colors.icon,
                  borderRadius: 12,
                  backgroundColor: colorScheme === 'dark' ? '#1C1F26' : '#F8F9FA',
                  flexDirection: 'row',
                  alignItems: 'center'
                }}>
                  <TextInput
                    style={{
                      flex: 1,
                      paddingHorizontal: 16,
                      paddingVertical: 16,
                      fontSize: 16,
                      color: colors.text
                    }}
                    placeholder="Enter your password"
                    placeholderTextColor={colors.icon}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                  />
                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                    style={{ paddingHorizontal: 16 }}
                  >
                    <Text style={{ color: colors.tint, fontSize: 16 }}>
                      {showPassword ? 'Hide' : 'Show'}
                    </Text>
                  </TouchableOpacity>
                </View>
                {errors.password && (
                  <Text style={{ color: '#E74C3C', fontSize: 14, marginTop: 4 }}>
                    {errors.password}
                  </Text>
                )}
              </View>

              {/* Remember Me & Forgot Password */}
              <View style={{ 
                flexDirection: 'row', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                marginBottom: 32
              }}>
                <TouchableOpacity
                  onPress={() => setRememberMe(!rememberMe)}
                  style={{ flexDirection: 'row', alignItems: 'center' }}
                >
                  <View style={{
                    width: 20,
                    height: 20,
                    borderWidth: 2,
                    borderColor: colors.tint,
                    borderRadius: 4,
                    marginRight: 8,
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}>
                    {rememberMe && (
                      <View style={{
                        width: 12,
                        height: 12,
                        backgroundColor: colors.tint,
                        borderRadius: 2
                      }} />
                    )}
                  </View>
                  <Text style={{ color: colors.text, fontSize: 14 }}>
                    Remember me
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => Alert.alert('Forgot Password', 'Password reset functionality would be implemented here')}>
                  <Text style={{ color: colors.tint, fontSize: 14, fontWeight: '600' }}>
                    Forgot Password?
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Login Button */}
              <TouchableOpacity
                style={{
                  backgroundColor: isFormValid ? colors.tint : colors.icon,
                  borderRadius: 12,
                  paddingVertical: 16,
                  alignItems: 'center',
                  opacity: isFormValid ? 1 : 0.6
                }}
                onPress={handleLogin}
                disabled={!isFormValid || isLoading}
              >
                {isLoading ? (
                  <ActivityIndicator color="#FFFFFF" />
                ) : (
                  <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: '600' }}>
                    Sign In
                  </Text>
                )}
              </TouchableOpacity>
            </View>

            {/* Sign Up Link */}
            <View style={{ alignItems: 'center' }}>
              <Text style={{ color: colors.icon, fontSize: 14 }}>
                Don't have an account?{' '}
                <Text 
                  style={{ color: colors.tint, fontWeight: '600' }}
                  onPress={handleSignup}
                >
                  Sign up
                </Text>
              </Text>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}