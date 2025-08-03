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

export default function ForgotPasswordScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isButtonPressed, setIsButtonPressed] = useState(false);
  const [errors, setErrors] = useState<{ email?: string }>({});

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
    const newErrors: { email?: string } = {};

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(email.trim())) {
      newErrors.email = 'Please enter a valid email address (e.g., user@gmail.com)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSendOTP = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    
    try {
      const response = await apiService.forgotPassword(email.trim());

      if (response.success) {
        showCustomAlert({
          title: 'Reset Email Sent', 
          message: 'A password reset link has been sent to your email address. Please check your inbox.',
          type: 'success',
          confirmText: 'OK',
          showCancel: false,
          onConfirm: hideCustomAlert,
          onCancel: hideCustomAlert,
        });
      }
    } catch (error: any) {
      console.error('Forgot password error:', error);
      
      let errorMessage = 'Failed to send reset email. Please try again.';
      
      if (error.message) {
        if (error.message.includes('There is no user with that email')) {
          errorMessage = 'No account found with this email address. Please check your email or create a new account.';
        } else if (error.message.includes('Email could not be sent')) {
          errorMessage = 'Failed to send email. Please try again later.';
        } else {
          errorMessage = error.message;
        }
      }

             showCustomAlert({
         title: 'Error',
         message: errorMessage,
         type: 'error',
         confirmText: 'OK',
         showCancel: false,
         onConfirm: hideCustomAlert,
         onCancel: hideCustomAlert,
       });
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToLogin = () => {
    router.push('/auth/login');
  };

  const isFormValid = email.trim() && !isLoading;

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
            {/* Back Button */}
            <TouchableOpacity 
              onPress={handleBackToLogin}
              style={styles.backButton}
            >
              <Text style={styles.backButtonText}>Back to Login</Text>
            </TouchableOpacity>

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
                Forgot Password
              </Text>
              <Text style={styles.subtitleText}>
                Enter your email to receive a verification code
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
                    placeholder="Enter your email address"
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

              {/* Send OTP Button */}
              <TouchableOpacity
                style={[
                  styles.sendButton,
                  { 
                    backgroundColor: isButtonPressed && isFormValid 
                      ? LuxuryColors.imperialGold 
                      : isFormValid 
                        ? LuxuryColors.charcoalGray 
                        : LuxuryColors.jetBlack,
                    opacity: isFormValid ? 1 : 0.6
                  }
                ]}
                onPress={handleSendOTP}
                onPressIn={() => setIsButtonPressed(true)}
                onPressOut={() => setIsButtonPressed(false)}
                disabled={!isFormValid || isLoading}
              >
                {isLoading ? (
                  <ActivityIndicator color={LuxuryColors.imperialGold} />
                ) : (
                  <Text style={[
                    styles.sendButtonText,
                    { 
                      color: isButtonPressed && isFormValid 
                        ? LuxuryColors.jetBlack 
                        : LuxuryColors.coolGray 
                    }
                  ]}>
                    Send Verification Code
                  </Text>
                )}
              </TouchableOpacity>
            </View>

            {/* Help Text */}
            <View style={styles.helpContainer}>
              <Text style={styles.helpText}>
                We'll send a 6-digit verification code to your email address to help you reset your password.
              </Text>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
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
  backButton: {
    position: 'absolute',
    top: 60,
    left: 24,
    zIndex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  backButtonText: {
    color: '#D4AF37',
    fontSize: 18,
    fontWeight: '600',
  },
  headerContainer: {
    marginBottom: 48,
    alignItems: 'center',
    marginTop: 60,
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
    marginBottom: 32,
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
  errorText: {
    color: '#E74C3C',
    fontSize: 14,
    marginTop: 4,
  },
  sendButton: {
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  sendButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  helpContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  helpText: {
    color: '#A5A5A5',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
}); 