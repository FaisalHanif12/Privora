import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';

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

interface CustomAlertProps {
  visible: boolean;
  title: string;
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  onConfirm: () => void;
  confirmText?: string;
  showCancel?: boolean;
  onCancel?: () => void;
  cancelText?: string;
}

const { width } = Dimensions.get('window');

export default function CustomAlert({
  visible,
  title,
  message,
  type = 'info',
  onConfirm,
  confirmText = 'OK',
  showCancel = false,
  onCancel,
  cancelText = 'Cancel',
}: CustomAlertProps) {
  const getTypeColors = () => {
    switch (type) {
      case 'success':
        return {
          icon: '✓',
          backgroundColor: LuxuryColors.emeraldGreen,
          borderColor: LuxuryColors.emeraldGreen,
        };
      case 'error':
        return {
          icon: '✕',
          backgroundColor: LuxuryColors.royalRed,
          borderColor: LuxuryColors.royalRed,
        };
      case 'warning':
        return {
          icon: '⚠',
          backgroundColor: LuxuryColors.imperialGold,
          borderColor: LuxuryColors.imperialGold,
        };
      default:
        return {
          icon: 'ℹ',
          backgroundColor: LuxuryColors.imperialGold,
          borderColor: LuxuryColors.imperialGold,
        };
    }
  };

  const typeColors = getTypeColors();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel || onConfirm}
    >
      <View style={styles.overlay}>
        <View style={styles.alertContainer}>
          {/* Icon */}
          <View style={[styles.iconContainer, { backgroundColor: typeColors.backgroundColor }]}>
            <Text style={styles.iconText}>{typeColors.icon}</Text>
          </View>

          {/* Title */}
          <Text style={styles.title}>{title}</Text>

          {/* Message */}
          <Text style={styles.message}>{message}</Text>

          {/* Buttons */}
          <View style={styles.buttonContainer}>
            {showCancel && (
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={onCancel}
              >
                <Text style={styles.cancelButtonText}>{cancelText}</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={[
                styles.button,
                styles.confirmButton,
                { backgroundColor: typeColors.backgroundColor },
                showCancel && styles.confirmButtonWithCancel,
              ]}
              onPress={onConfirm}
            >
              <Text style={styles.confirmButtonText}>{confirmText}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  alertContainer: {
    backgroundColor: LuxuryColors.graphiteTint,
    borderRadius: 20,
    padding: 24,
    width: width - 40,
    maxWidth: 400,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 15,
    borderWidth: 1,
    borderColor: LuxuryColors.charcoalGray,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  iconText: {
    fontSize: 24,
    color: LuxuryColors.luxeWhite,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: LuxuryColors.luxeWhite,
    textAlign: 'center',
    marginBottom: 12,
  },
  message: {
    fontSize: 16,
    color: LuxuryColors.coolGray,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 24,
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    gap: 12,
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  cancelButton: {
    backgroundColor: LuxuryColors.charcoalGray,
    borderWidth: 1,
    borderColor: LuxuryColors.coolGray,
  },
  confirmButton: {
    backgroundColor: LuxuryColors.imperialGold,
  },
  confirmButtonWithCancel: {
    flex: 1,
  },
  cancelButtonText: {
    color: LuxuryColors.coolGray,
    fontSize: 16,
    fontWeight: '600',
  },
  confirmButtonText: {
    color: LuxuryColors.jetBlack,
    fontSize: 16,
    fontWeight: '600',
  },
}); 