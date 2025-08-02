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

export default function SignupScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ 
    fullName?: string; 
    email?: string; 
    password?: string; 
    confirmPassword?: string;
    terms?: string;
  }>({});

  const validateForm = () => {
    const newErrors: { 
      fullName?: string; 
      email?: string; 
      password?: string; 
      confirmPassword?: string;
      terms?: string;
    } = {};

    if (!fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (fullName.trim().length < 2) {
      newErrors.fullName = 'Full name must be at least 2 characters';
    }

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!password.trim()) {
      newErrors.password = 'Password is required';
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
      newErrors.password = 'Password must contain uppercase, lowercase, and number';
    }

    if (!confirmPassword.trim()) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!acceptTerms) {
      newErrors.terms = 'You must accept the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert(
        'Account Created', 
        'Your account has been created successfully! Please check your email for verification.',
        [
          {
            text: 'OK',
            onPress: () => router.replace('/(tabs)')
          }
        ]
      );
    }, 2000);
  };

  const handleLogin = () => {
    router.push('/auth/login');
  };

  const isFormValid = fullName.trim() && email.trim() && password.trim() && 
                     confirmPassword.trim() && acceptTerms && !isLoading;

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
            <View style={{ marginBottom: 40, alignItems: 'center' }}>
              <Text style={{
                fontSize: 32,
                fontWeight: 'bold',
                color: colors.text,
                marginBottom: 8,
                textAlign: 'center'
              }}>
                Create Account
              </Text>
              <Text style={{
                fontSize: 16,
                color: colors.icon,
                textAlign: 'center',
                lineHeight: 24
              }}>
                Join Privora to start managing your wealth
              </Text>
            </View>

            {/* Form */}
            <View style={{ marginBottom: 32 }}>
              {/* Full Name Input */}
              <View style={{ marginBottom: 20 }}>
                <Text style={{
                  fontSize: 16,
                  fontWeight: '600',
                  color: colors.text,
                  marginBottom: 8
                }}>
                  Full Name
                </Text>
                <TextInput
                  style={{
                    borderWidth: 1,
                    borderColor: errors.fullName ? '#E74C3C' : colors.icon,
                    borderRadius: 12,
                    paddingHorizontal: 16,
                    paddingVertical: 16,
                    fontSize: 16,
                    color: colors.text,
                    backgroundColor: colorScheme === 'dark' ? '#1C1F26' : '#F8F9FA'
                  }}
                  placeholder="Enter your full name"
                  placeholderTextColor={colors.icon}
                  value={fullName}
                  onChangeText={setFullName}
                  autoCapitalize="words"
                  autoCorrect={false}
                />
                {errors.fullName && (
                  <Text style={{ color: '#E74C3C', fontSize: 14, marginTop: 4 }}>
                    {errors.fullName}
                  </Text>
                )}
              </View>

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
                    placeholder="Create a password"
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

              {/* Confirm Password Input */}
              <View style={{ marginBottom: 20 }}>
                <Text style={{
                  fontSize: 16,
                  fontWeight: '600',
                  color: colors.text,
                  marginBottom: 8
                }}>
                  Confirm Password
                </Text>
                <View style={{
                  borderWidth: 1,
                  borderColor: errors.confirmPassword ? '#E74C3C' : colors.icon,
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
                    placeholder="Confirm your password"
                    placeholderTextColor={colors.icon}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry={!showConfirmPassword}
                    autoCapitalize="none"
                  />
                  <TouchableOpacity
                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                    style={{ paddingHorizontal: 16 }}
                  >
                    <Text style={{ color: colors.tint, fontSize: 16 }}>
                      {showConfirmPassword ? 'Hide' : 'Show'}
                    </Text>
                  </TouchableOpacity>
                </View>
                {errors.confirmPassword && (
                  <Text style={{ color: '#E74C3C', fontSize: 14, marginTop: 4 }}>
                    {errors.confirmPassword}
                  </Text>
                )}
              </View>

              {/* Terms and Conditions */}
              <View style={{ marginBottom: 32 }}>
                <TouchableOpacity
                  onPress={() => setAcceptTerms(!acceptTerms)}
                  style={{ flexDirection: 'row', alignItems: 'flex-start' }}
                >
                  <View style={{
                    width: 20,
                    height: 20,
                    borderWidth: 2,
                    borderColor: colors.tint,
                    borderRadius: 4,
                    marginRight: 12,
                    marginTop: 2,
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}>
                    {acceptTerms && (
                      <View style={{
                        width: 12,
                        height: 12,
                        backgroundColor: colors.tint,
                        borderRadius: 2
                      }} />
                    )}
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{ color: colors.text, fontSize: 14, lineHeight: 20 }}>
                      I agree to the{' '}
                      <Text style={{ color: colors.tint, fontWeight: '600' }}>
                        Terms of Service
                      </Text>
                      {' '}and{' '}
                      <Text style={{ color: colors.tint, fontWeight: '600' }}>
                        Privacy Policy
                      </Text>
                    </Text>
                  </View>
                </TouchableOpacity>
                {errors.terms && (
                  <Text style={{ color: '#E74C3C', fontSize: 14, marginTop: 4, marginLeft: 32 }}>
                    {errors.terms}
                  </Text>
                )}
              </View>

              {/* Sign Up Button */}
              <TouchableOpacity
                style={{
                  backgroundColor: isFormValid ? colors.tint : colors.icon,
                  borderRadius: 12,
                  paddingVertical: 16,
                  alignItems: 'center',
                  opacity: isFormValid ? 1 : 0.6
                }}
                onPress={handleSignup}
                disabled={!isFormValid || isLoading}
              >
                {isLoading ? (
                  <ActivityIndicator color="#FFFFFF" />
                ) : (
                  <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: '600' }}>
                    Create Account
                  </Text>
                )}
              </TouchableOpacity>
            </View>

            {/* Login Link */}
            <View style={{ alignItems: 'center' }}>
              <Text style={{ color: colors.icon, fontSize: 14 }}>
                Already have an account?{' '}
                <Text 
                  style={{ color: colors.tint, fontWeight: '600' }}
                  onPress={handleLogin}
                >
                  Sign in
                </Text>
              </Text>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
} 