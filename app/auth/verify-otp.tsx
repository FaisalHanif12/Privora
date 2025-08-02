import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { router } from 'expo-router';
import React, { useRef, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
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

export default function VerifyOTPScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [isButtonPressed, setIsButtonPressed] = useState(false);
  const [errors, setErrors] = useState<{ otp?: string }>({});
  const inputRefs = useRef<TextInput[]>([]);

  const validateOTP = () => {
    const otpString = otp.join('');
    if (otpString.length !== 6) {
      setErrors({ otp: 'Please enter the complete 6-digit code' });
      return false;
    }
    if (!/^\d{6}$/.test(otpString)) {
      setErrors({ otp: 'Please enter only numbers' });
      return false;
    }
    setErrors({});
    return true;
  };

  const handleOTPChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // Auto-focus next input
    if (text && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerifyOTP = async () => {
    if (!validateOTP()) return;

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert(
        'OTP Verified', 
        'Your verification code has been verified successfully.',
        [
          {
            text: 'OK',
            onPress: () => router.push('/auth/reset-password')
          }
        ]
      );
    }, 2000);
  };

  const handleResendOTP = () => {
    Alert.alert(
      'OTP Resent', 
      'A new verification code has been sent to your email.',
      [{ text: 'OK' }]
    );
  };

  const handleBackToForgotPassword = () => {
    router.push('/auth/forgot-password');
  };

  const isFormValid = otp.join('').length === 6 && !isLoading;

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
              onPress={handleBackToForgotPassword}
              style={styles.backButton}
            >
              <Text style={styles.backButtonText}>← Back</Text>
            </TouchableOpacity>

            {/* Luxury Header */}
            <View style={styles.headerContainer}>
              <View style={styles.logoContainer}>
                <View style={styles.logoCircle}>
                  <Text style={styles.logoText}>P</Text>
                </View>
              </View>
              <Text style={styles.welcomeText}>
                Verify OTP
              </Text>
              <Text style={styles.subtitleText}>
                Enter the 6-digit code sent to your email
              </Text>
            </View>

            {/* Luxury Form Card */}
            <View style={styles.formCard}>
              {/* OTP Input */}
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>
                  Verification Code
                </Text>
                <View style={styles.otpContainer}>
                  {otp.map((digit, index) => (
                    <TextInput
                      key={index}
                      ref={(ref) => {
                        if (ref) inputRefs.current[index] = ref;
                      }}
                      style={[
                        styles.otpInput,
                        { borderColor: errors.otp ? LuxuryColors.royalRed : LuxuryColors.imperialGold }
                      ]}
                      value={digit}
                      onChangeText={(text) => handleOTPChange(text, index)}
                      onKeyPress={(e) => handleKeyPress(e, index)}
                      keyboardType="numeric"
                      maxLength={1}
                      textAlign="center"
                      placeholder="0"
                      placeholderTextColor={LuxuryColors.coolGray}
                    />
                  ))}
                </View>
                {errors.otp && (
                  <Text style={styles.errorText}>
                    {errors.otp}
                  </Text>
                )}
              </View>

              {/* Verify Button */}
              <TouchableOpacity
                style={[
                  styles.verifyButton,
                  { 
                    backgroundColor: isButtonPressed && isFormValid 
                      ? LuxuryColors.imperialGold 
                      : isFormValid 
                        ? LuxuryColors.charcoalGray 
                        : LuxuryColors.jetBlack,
                    opacity: isFormValid ? 1 : 0.6
                  }
                ]}
                onPress={handleVerifyOTP}
                onPressIn={() => setIsButtonPressed(true)}
                onPressOut={() => setIsButtonPressed(false)}
                disabled={!isFormValid || isLoading}
              >
                {isLoading ? (
                  <ActivityIndicator color={LuxuryColors.imperialGold} />
                ) : (
                  <Text style={[
                    styles.verifyButtonText,
                    { 
                      color: isButtonPressed && isFormValid 
                        ? LuxuryColors.jetBlack 
                        : LuxuryColors.coolGray 
                    }
                  ]}>
                    Verify Code
                  </Text>
                )}
              </TouchableOpacity>

              {/* Resend OTP */}
              <TouchableOpacity
                onPress={handleResendOTP}
                style={styles.resendContainer}
              >
                <Text style={styles.resendText}>
                  Didn't receive the code?{' '}
                  <Text style={styles.resendLink}>
                    Resend
                  </Text>
                </Text>
              </TouchableOpacity>
            </View>

            {/* Help Text */}
            <View style={styles.helpContainer}>
              <Text style={styles.helpText}>
                The verification code will expire in 10 minutes. Please check your email and enter the code above.
              </Text>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
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
  },
  backButtonText: {
    color: '#D4AF37',
    fontSize: 16,
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
    marginBottom: 16,
    textAlign: 'center',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  otpInput: {
    width: 45,
    height: 55,
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#1C1F26',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  errorText: {
    color: '#E74C3C',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
  },
  verifyButton: {
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    marginBottom: 24,
  },
  verifyButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  resendContainer: {
    alignItems: 'center',
  },
  resendText: {
    color: '#A5A5A5',
    fontSize: 14,
  },
  resendLink: {
    color: '#D4AF37',
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