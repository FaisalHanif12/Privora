import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { router, useLocalSearchParams } from 'expo-router';
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
  View
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

export default function ResetPasswordScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const { email, otp } = useLocalSearchParams<{ email: string; otp: string }>();
  
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isButtonPressed, setIsButtonPressed] = useState(false);
  const [errors, setErrors] = useState<{ 
    newPassword?: string; 
    confirmPassword?: string;
  }>({});

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

  const validatePassword = (password: string) => {
    const minLength = password.length >= 6;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    
    return {
      isValid: minLength && hasUpperCase && hasLowerCase && hasNumbers,
      minLength,
      hasUpperCase,
      hasLowerCase,
      hasNumbers
    };
  };

  const validateForm = () => {
    const newErrors: { 
      newPassword?: string; 
      confirmPassword?: string;
    } = {};

    // New Password Validation
    if (!newPassword.trim()) {
      newErrors.newPassword = 'New password is required';
    } else {
      const passwordValidation = validatePassword(newPassword);
      if (!passwordValidation.isValid) {
        let requirements = [];
        if (!passwordValidation.minLength) requirements.push('at least 6 characters');
        if (!passwordValidation.hasUpperCase) requirements.push('one uppercase letter');
        if (!passwordValidation.hasLowerCase) requirements.push('one lowercase letter');
        if (!passwordValidation.hasNumbers) requirements.push('one number');
        
        newErrors.newPassword = `Password must contain: ${requirements.join(', ')}`;
      }
    }

    // Confirm Password Validation
    if (!confirmPassword.trim()) {
      newErrors.confirmPassword = 'Please confirm your new password';
    } else if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleResetPassword = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    
    try {
      const response = await apiService.resetPassword(email, otp, newPassword);

      if (response.success) {
        showCustomAlert({
          title: 'Password Reset Successfully', 
          message: 'Your password has been reset successfully. You can now login with your new password.',
          type: 'success',
          confirmText: 'OK',
          showCancel: false,
          onConfirm: () => {
            hideCustomAlert();
            router.push('/auth/login');
          },
          onCancel: hideCustomAlert,
        });
      }
    } catch (error: any) {
      console.error('Reset password error:', error);
      
      let errorMessage = 'Failed to reset password. Please try again.';
      
      if (error.message) {
        if (error.message.includes('Invalid or expired OTP')) {
          errorMessage = 'Your verification code has expired. Please go back and request a new code.';
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

  const isFormValid = newPassword.trim() && confirmPassword.trim() && !isLoading;

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
                Reset Password
              </Text>
              <Text style={styles.subtitleText}>
                Create a new password for your account
              </Text>
            </View>

            {/* Luxury Form Card */}
            <View style={styles.formCard}>
              {/* New Password Input */}
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>
                  New Password
                </Text>
                <View style={[
                  styles.inputWrapper,
                  { borderColor: errors.newPassword ? LuxuryColors.royalRed : LuxuryColors.imperialGold }
                ]}>
                  <TextInput
                    style={styles.textInput}
                    placeholder="Enter new password"
                    placeholderTextColor={LuxuryColors.coolGray}
                    value={newPassword}
                    onChangeText={setNewPassword}
                    secureTextEntry={!showNewPassword}
                    autoCapitalize="none"
                  />
                  <TouchableOpacity
                    onPress={() => setShowNewPassword(!showNewPassword)}
                    style={styles.showButton}
                  >
                    <Text style={styles.showButtonText}>
                      {showNewPassword ? 'Hide' : 'Show'}
                    </Text>
                  </TouchableOpacity>
                </View>
                {errors.newPassword && (
                  <Text style={styles.errorText}>
                    {errors.newPassword}
                  </Text>
                )}
              </View>

              {/* Confirm Password Input */}
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>
                  Confirm New Password
                </Text>
                <View style={[
                  styles.inputWrapper,
                  { borderColor: errors.confirmPassword ? LuxuryColors.royalRed : LuxuryColors.imperialGold }
                ]}>
                  <TextInput
                    style={styles.textInput}
                    placeholder="Confirm new password"
                    placeholderTextColor={LuxuryColors.coolGray}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry={!showConfirmPassword}
                    autoCapitalize="none"
                  />
                  <TouchableOpacity
                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                    style={styles.showButton}
                  >
                    <Text style={styles.showButtonText}>
                      {showConfirmPassword ? 'Hide' : 'Show'}
                    </Text>
                  </TouchableOpacity>
                </View>
                {errors.confirmPassword && (
                  <Text style={styles.errorText}>
                    {errors.confirmPassword}
                  </Text>
                )}
              </View>

              {/* Reset Password Button */}
              <TouchableOpacity
                style={[
                  styles.resetButton,
                  { 
                    backgroundColor: isButtonPressed && isFormValid 
                      ? LuxuryColors.imperialGold 
                      : isFormValid 
                        ? LuxuryColors.charcoalGray 
                        : LuxuryColors.jetBlack,
                    opacity: isFormValid ? 1 : 0.6
                  }
                ]}
                onPress={handleResetPassword}
                onPressIn={() => setIsButtonPressed(true)}
                onPressOut={() => setIsButtonPressed(false)}
                disabled={!isFormValid || isLoading}
              >
                {isLoading ? (
                  <ActivityIndicator color={LuxuryColors.imperialGold} />
                ) : (
                  <Text style={[
                    styles.resetButtonText,
                    { 
                      color: isButtonPressed && isFormValid 
                        ? LuxuryColors.jetBlack 
                        : LuxuryColors.coolGray 
                    }
                  ]}>
                    Reset Password
                  </Text>
                )}
              </TouchableOpacity>
            </View>

            {/* Help Text */}
            <View style={styles.helpContainer}>
              <Text style={styles.helpText}>
                Make sure your new password is strong and different from your previous password.
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
    marginBottom: 24,
  },
  logoImage: {
    width: 120,
    height: 120,
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
  resetButton: {
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  resetButtonText: {
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