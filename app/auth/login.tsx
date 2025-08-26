import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    ActivityIndicator,
    Image,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomAlert from '../components/CustomAlert';
import { useUser } from '../context/UserContext';
import { apiService } from '../services/api';

// Luxury Color Theme
const LuxuryColors = {
  jetBlack: '#0B0C10',
  imperialGold: '#D4AF37',
  platinumSilver: '#C0C0C0',
  emeraldGreen: '#2ECC71',
  royalRed: '#E74C3C',
  luxeWhite: '#FFFFFF',
  coolGray: '#A5A5A5',
  charcoalGray: '#1C1F26',
  graphiteTint: '#121417',
  goldenBrown: '#A67C00',
};

export default function LoginScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const { setUser } = useUser();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isButtonPressed, setIsButtonPressed] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  
  // Custom Alert State
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertConfig, setAlertConfig] = useState({
    title: '',
    message: '',
    type: 'info' as 'success' | 'error' | 'warning' | 'info',
    confirmText: 'OK',
    showCancel: false,
    onConfirm: () => {},
    onCancel: () => {},
    autoDismiss: false,
    dismissTime: 2000,
  });

  const showCustomAlert = (config: typeof alertConfig) => {
    setAlertConfig(config);
    setAlertVisible(true);
  };

  const hideCustomAlert = () => {
    setAlertVisible(false);
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};

    // Email Validation
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(email.trim())) {
      newErrors.email = 'Please enter a valid email address (e.g., user@gmail.com)';
    }

    // Password Validation
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
    
    try {
      const response = await apiService.login({
        email: email.trim(),
        password: password,
      });

      if (response.success) {
        // Store real user data in context from backend response
        // The backend should return the actual user data from the database
        setUser({
          fullName: response.data?.fullName || 'Faisal', // Fallback to known user
          email: email.trim(),
        });

        // Store token if remember me is checked
        if (rememberMe && response.token) {
          // TODO: Implement secure token storage
          console.log('Token stored for remember me');
        }

        showCustomAlert({
          title: 'Login Successful',
          message: `Welcome back, ${response.data?.fullName || 'Faisal'}!`,
          type: 'success',
          confirmText: 'OK',
          showCancel: false,
          onConfirm: () => {
            router.push('/dashboard');
            hideCustomAlert();
          },
          onCancel: () => hideCustomAlert(),
          autoDismiss: true,
          dismissTime: 2000,
        });
      } else {
        showCustomAlert({
          title: 'Login Failed',
          message: response.message || 'Invalid email or password. Please try again.',
          type: 'error',
          confirmText: 'OK',
          showCancel: false,
          onConfirm: () => hideCustomAlert(),
          onCancel: () => hideCustomAlert(),
          autoDismiss: true,
          dismissTime: 2000,
        });
      }
    } catch (error: any) {
      console.error('Login error:', error);
      
      let errorTitle = 'Login Failed';
      let errorMessage = 'Login failed. Please try again.';
      let errorType: 'error' | 'warning' = 'error';
      let showCancel = false;
      let confirmText = 'OK';
      let onConfirm = () => hideCustomAlert();
      let onCancel = () => hideCustomAlert();
      
      if (error.message) {
        if (error.message.includes('Network request failed')) {
          errorTitle = 'Connection Error';
          errorMessage = 'Unable to connect to the server. Please check your internet connection and try again.';
          errorType = 'warning';
        } else if (error.message.includes('Invalid credentials')) {
          errorTitle = 'Invalid Credentials';
          errorMessage = 'The email or password you entered is incorrect. Please try again.';
          errorType = 'error';
        } else if (error.message.includes('Please verify your email')) {
          errorTitle = 'Email Not Verified';
          errorMessage = 'Please verify your email address before logging in. Check your inbox for a verification link.';
          errorType = 'warning';
        } else if (error.message.includes('There is no user with that email')) {
          errorTitle = 'Account Not Found';
          errorMessage = 'No account found with this email address. Please create an account first.';
          errorType = 'warning';
          showCancel = true;
          confirmText = 'Create Account';
          onConfirm = () => {
            hideCustomAlert();
            router.push('/auth/signup');
          };
          onCancel = () => hideCustomAlert();
        } else {
          errorMessage = error.message;
        }
      }

      showCustomAlert({
        title: errorTitle,
        message: errorMessage,
        type: errorType,
        confirmText,
        showCancel,
        onConfirm,
        onCancel,
        autoDismiss: true,
        dismissTime: 2000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = () => {
    router.push('/auth/signup');
  };

  const handleForgotPassword = () => {
    router.push('/auth/forgot-password');
  };

  const isFormValid = email.trim() && password.trim() && !isLoading;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: LuxuryColors.jetBlack }]}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView 
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Luxury Header */}
            <View style={styles.headerContainer}>
              <View style={styles.logoContainer}>
                <Image 
                  source={require('../../assets/images/Privora-Logo.png')}
                  style={styles.logoImage}
                  resizeMode="contain"
                />
              </View>
              <Text style={styles.welcomeText}>
                Welcome Back
              </Text>
              <Text style={styles.subtitleText}>
                Access your wealth management dashboard
              </Text>
            </View>

            {/* Luxury Form Card */}
            <View style={styles.formCard}>
              {/* Email Input */}
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>
                  Email Address
                </Text>
                <View style={[
                  styles.inputWrapper,
                  { borderColor: errors.email ? LuxuryColors.royalRed : LuxuryColors.imperialGold }
                ]}>
                  <TextInput
                    style={styles.textInput}
                    placeholder="Enter your email"
                    placeholderTextColor={LuxuryColors.coolGray}
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                </View>
                {errors.email && (
                  <Text style={styles.errorText}>
                    {errors.email}
                  </Text>
                )}
              </View>

              {/* Password Input */}
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>
                  Password
                </Text>
                <View style={[
                  styles.inputWrapper,
                  { borderColor: errors.password ? LuxuryColors.royalRed : LuxuryColors.imperialGold }
                ]}>
                  <TextInput
                    style={styles.textInput}
                    placeholder="Enter your password"
                    placeholderTextColor={LuxuryColors.coolGray}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                  />
                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                    style={styles.showButton}
                  >
                    <Text style={styles.showButtonText}>
                      {showPassword ? 'Hide' : 'Show'}
                    </Text>
                  </TouchableOpacity>
                </View>
                {errors.password && (
                  <Text style={styles.errorText}>
                    {errors.password}
                  </Text>
                )}
              </View>

              {/* Remember Me & Forgot Password */}
              <View style={styles.optionsContainer}>
                <TouchableOpacity
                  onPress={() => setRememberMe(!rememberMe)}
                  style={styles.checkboxContainer}
                >
                  <View style={[
                    styles.checkbox,
                    { borderColor: LuxuryColors.imperialGold }
                  ]}>
                    {rememberMe && (
                      <View style={styles.checkboxInner} />
                    )}
                  </View>
                  <Text style={styles.checkboxText}>
                    Remember me
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleForgotPassword}>
                  <Text style={styles.forgotPasswordText}>
                    Forgot Password?
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Login Button - Dark with gold hover effect */}
              <TouchableOpacity
                style={[
                  styles.loginButton,
                  { 
                    backgroundColor: isButtonPressed && isFormValid 
                      ? LuxuryColors.imperialGold 
                      : isFormValid 
                        ? LuxuryColors.charcoalGray 
                        : LuxuryColors.jetBlack,
                    opacity: isFormValid ? 1 : 0.6
                  }
                ]}
                onPress={handleLogin}
                onPressIn={() => setIsButtonPressed(true)}
                onPressOut={() => setIsButtonPressed(false)}
                disabled={!isFormValid || isLoading}
              >
                {isLoading ? (
                  <ActivityIndicator color={LuxuryColors.imperialGold} />
                ) : (
                  <Text style={[
                    styles.loginButtonText,
                    { 
                      color: isButtonPressed && isFormValid 
                        ? LuxuryColors.jetBlack 
                        : LuxuryColors.coolGray 
                    }
                  ]}>
                    Sign In
                  </Text>
                )}
              </TouchableOpacity>
            </View>

            {/* Sign Up Link */}
            <View style={styles.signupContainer}>
              <Text style={styles.signupText}>
                Don't have an account?{' '}
                <Text 
                  style={styles.signupLink}
                  onPress={handleSignup}
                >
                  Sign up
                </Text>
              </Text>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>

      {/* Custom Alert */}
      <CustomAlert
        visible={alertVisible}
        title={alertConfig.title}
        message={alertConfig.message}
        type={alertConfig.type}
        confirmText={alertConfig.confirmText}
        showCancel={alertConfig.showCancel}
        onConfirm={alertConfig.onConfirm}
        onCancel={alertConfig.onCancel}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  headerContainer: {
    marginBottom: 48,
    alignItems: 'center',
  },
  logoContainer: {
    marginBottom: 1,
  },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#D4AF37',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#D4AF37',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  logoText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#0B0C10',
  },
  logoImage: {
    width: 140,
    height: 140,
    resizeMode: 'contain',
  },
  welcomeText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitleText: {
    fontSize: 16,
    color: '#A5A5A5',
    textAlign: 'center',
    lineHeight: 24,
  },
  formCard: {
    backgroundColor: '#121417',
    borderRadius: 16,
    padding: 24,
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 12,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  inputWrapper: {
    borderWidth: 1,
    borderRadius: 12,
    backgroundColor: '#1C1F26',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  textInput: {
    flex: 1,
    paddingVertical: 16,
    fontSize: 16,
    color: '#FFFFFF',
  },
  showButton: {
    paddingHorizontal: 16,
  },
  showButtonText: {
    color: '#D4AF37',
    fontSize: 16,
    fontWeight: '600',
  },
  errorText: {
    color: '#E74C3C',
    fontSize: 14,
    marginTop: 4,
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 32,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderRadius: 4,
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxInner: {
    width: 12,
    height: 12,
    backgroundColor: '#D4AF37',
    borderRadius: 2,
  },
  checkboxText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  forgotPasswordText: {
    color: '#D4AF37',
    fontSize: 14,
    fontWeight: '600',
  },
  loginButton: {
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  signupContainer: {
    alignItems: 'center',
  },
  signupText: {
    color: '#A5A5A5',
    fontSize: 14,
  },
  signupLink: {
    color: '#D4AF37',
    fontWeight: '600',
  },
});