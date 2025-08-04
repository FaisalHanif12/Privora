import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  Animated,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Alert,
  Modal,
  TextInput,
  Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import { useUser } from './context/UserContext';
import { UserIcon } from './components/UserIcon';

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

const { width } = Dimensions.get('window');

interface ProfileOptionProps {
  icon: string;
  title: string;
  subtitle: string;
  onPress: () => void;
  isDestructive?: boolean;
}

interface SwitchOptionProps {
  icon: string;
  title: string;
  subtitle: string;
  value: boolean;
  onToggle: (value: boolean) => void;
  isDestructive?: boolean;
}

export default function ProfileScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const { user, updateUser, loading } = useUser();
  
  const [profileImage, setProfileImage] = useState(user?.profileImage || null);
  const [isFingerprintEnabled, setIsFingerprintEnabled] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [editName, setEditName] = useState(user?.fullName || '');
  const [editEmail, setEditEmail] = useState(user?.email || '');

  // Show loading state while user data is being fetched
  if (loading) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: LuxuryColors.jetBlack }]}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const imageUri = result.assets[0].uri;
      setProfileImage(imageUri);
      updateUser({ profileImage: imageUri });
    }
  };

  const handleEditProfile = () => {
    setEditName(user?.fullName || '');
    setEditEmail(user?.email || '');
    setShowEditModal(true);
  };

  const handleSaveProfile = () => {
    updateUser({ 
      fullName: editName,
      email: editEmail 
    });
    setShowEditModal(false);
    Alert.alert('Success', 'Profile updated successfully!');
  };

  const handleChangePassword = () => {
    setShowPasswordModal(true);
  };

  const handleSavePassword = () => {
    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'New passwords do not match!');
      return;
    }
    if (newPassword.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters long!');
      return;
    }
    setShowPasswordModal(false);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    Alert.alert('Success', 'Password changed successfully!');
  };

  const handleFingerprintToggle = () => {
    setIsFingerprintEnabled(!isFingerprintEnabled);
    Alert.alert(
      'Fingerprint Authentication',
      isFingerprintEnabled ? 'Fingerprint authentication disabled' : 'Fingerprint authentication enabled'
    );
  };

  const handleNotificationsToggle = () => {
    setNotificationsEnabled(!notificationsEnabled);
  };

  const handlePrivoraSupport = () => {
    Alert.alert('Privora Support', 'Contact our support team at support@privora.com or call +1-800-PRIVORA');
  };

  const handleActivityLogging = () => {
    Alert.alert('Activity Log', 'View your account activity and login history');
  };

  const handleAccountDeletion = () => {
    Alert.alert(
      'Delete Account',
      'Are you sure you want to permanently delete your account? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: () => {
            Alert.alert('Account Deleted', 'Your account has been permanently deleted.');
            router.replace('/auth/login');
          }
        }
      ]
    );
  };

  const handleLogout = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Sign Out', 
          onPress: () => router.replace('/auth/login')
        }
      ]
    );
  };

  const ProfileOption: React.FC<ProfileOptionProps> = ({ icon, title, subtitle, onPress, isDestructive = false }) => (
    <TouchableOpacity 
      style={[styles.optionCard, isDestructive && styles.destructiveOption]} 
      onPress={onPress}
    >
      <View style={styles.optionLeft}>
        <Text style={styles.optionIcon}>{icon}</Text>
        <View style={styles.optionContent}>
          <Text style={[styles.optionTitle, isDestructive && styles.destructiveText]}>{title}</Text>
          <Text style={styles.optionSubtitle}>{subtitle}</Text>
        </View>
      </View>
      <Text style={styles.optionArrow}>›</Text>
    </TouchableOpacity>
  );

  const SwitchOption: React.FC<SwitchOptionProps> = ({ icon, title, subtitle, value, onToggle, isDestructive = false }) => (
    <View style={[styles.optionCard, isDestructive && styles.destructiveOption]}>
      <View style={styles.optionLeft}>
        <Text style={styles.optionIcon}>{icon}</Text>
        <View style={styles.optionContent}>
          <Text style={[styles.optionTitle, isDestructive && styles.destructiveText]}>{title}</Text>
          <Text style={styles.optionSubtitle}>{subtitle}</Text>
        </View>
      </View>
      <Switch
        value={value}
        onValueChange={onToggle}
        trackColor={{ false: LuxuryColors.charcoalGray, true: LuxuryColors.imperialGold }}
        thumbColor={LuxuryColors.luxeWhite}
      />
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: LuxuryColors.jetBlack }]}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
              <Text style={styles.backIcon}>‹</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Profile</Text>
            <View style={styles.headerRight} />
          </View>

          {/* Profile Section */}
          <View style={styles.profileSection}>
            <TouchableOpacity onPress={pickImage} style={styles.profileImageContainer}>
              {profileImage ? (
                <Image source={{ uri: profileImage }} style={styles.profileImage} />
              ) : (
                <View style={styles.profileImagePlaceholder}>
                  <UserIcon size={40} color={LuxuryColors.coolGray} />
                  <Text style={styles.profileImageText}>Add Photo</Text>
                </View>
              )}
              <View style={styles.editImageButton}>
                <Text style={styles.editImageIcon}>📷</Text>
              </View>
            </TouchableOpacity>
            
            <Text style={styles.userName}>{user?.fullName || 'User'}</Text>
            <Text style={styles.userEmail}>{user?.email || 'user@example.com'}</Text>
            
            <TouchableOpacity style={styles.editProfileButton} onPress={handleEditProfile}>
              <Text style={styles.editProfileText}>Edit Profile</Text>
            </TouchableOpacity>
          </View>

          {/* Options Section */}
          <View style={styles.optionsSection}>
            <Text style={styles.sectionTitle}>Account Settings</Text>
            
            <ProfileOption
              icon="🔐"
              title="Change Password"
              subtitle="Update your account password"
              onPress={handleChangePassword}
            />
            
            <SwitchOption
              icon="👆"
              title="Enable Fingerprint"
              subtitle="Use fingerprint for quick login"
              value={isFingerprintEnabled}
              onToggle={handleFingerprintToggle}
            />
            
            <SwitchOption
              icon="🔔"
              title="Notifications"
              subtitle="Manage notification preferences"
              value={notificationsEnabled}
              onToggle={handleNotificationsToggle}
            />
            
            <ProfileOption
              icon="📱"
              title="Privora Support"
              subtitle="Get help and contact support"
              onPress={handlePrivoraSupport}
            />
            
            <ProfileOption
              icon="📋"
              title="Activity Logging"
              subtitle="View your account activity"
              onPress={handleActivityLogging}
            />
          </View>

          {/* Danger Zone */}
          <View style={styles.optionsSection}>
            <Text style={styles.sectionTitle}>Danger Zone</Text>
            
            <ProfileOption
              icon="🗑️"
              title="Delete Account"
              subtitle="Permanently delete your account"
              onPress={handleAccountDeletion}
              isDestructive={true}
            />
            
            <ProfileOption
              icon="🚪"
              title="Sign Out"
              subtitle="Log out of your account"
              onPress={handleLogout}
              isDestructive={true}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Edit Profile Modal */}
      <Modal
        visible={showEditModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowEditModal(false)}
      >
        <TouchableWithoutFeedback onPress={() => setShowEditModal(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Edit Profile</Text>
                
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Name</Text>
                  <TextInput
                    style={styles.textInput}
                    value={editName}
                    onChangeText={setEditName}
                    placeholder="Enter your name"
                    placeholderTextColor={LuxuryColors.coolGray}
                  />
                </View>
                
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Email</Text>
                  <TextInput
                    style={styles.textInput}
                    value={editEmail}
                    onChangeText={setEditEmail}
                    placeholder="Enter your email"
                    placeholderTextColor={LuxuryColors.coolGray}
                    keyboardType="email-address"
                  />
                </View>
                
                <View style={styles.modalButtons}>
                  <TouchableOpacity 
                    style={styles.modalButtonCancel} 
                    onPress={() => setShowEditModal(false)}
                  >
                    <Text style={styles.modalButtonTextCancel}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={styles.modalButtonSave} 
                    onPress={handleSaveProfile}
                  >
                    <Text style={styles.modalButtonTextSave}>Save</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* Change Password Modal */}
      <Modal
        visible={showPasswordModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowPasswordModal(false)}
      >
        <TouchableWithoutFeedback onPress={() => setShowPasswordModal(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Change Password</Text>
                
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Current Password</Text>
                  <TextInput
                    style={styles.textInput}
                    value={currentPassword}
                    onChangeText={setCurrentPassword}
                    placeholder="Enter current password"
                    placeholderTextColor={LuxuryColors.coolGray}
                    secureTextEntry
                  />
                </View>
                
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>New Password</Text>
                  <TextInput
                    style={styles.textInput}
                    value={newPassword}
                    onChangeText={setNewPassword}
                    placeholder="Enter new password"
                    placeholderTextColor={LuxuryColors.coolGray}
                    secureTextEntry
                  />
                </View>
                
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Confirm New Password</Text>
                  <TextInput
                    style={styles.textInput}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    placeholder="Confirm new password"
                    placeholderTextColor={LuxuryColors.coolGray}
                    secureTextEntry
                  />
                </View>
                
                <View style={styles.modalButtons}>
                  <TouchableOpacity 
                    style={styles.modalButtonCancel} 
                    onPress={() => setShowPasswordModal(false)}
                  >
                    <Text style={styles.modalButtonTextCancel}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={styles.modalButtonSave} 
                    onPress={handleSavePassword}
                  >
                    <Text style={styles.modalButtonTextSave}>Change Password</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
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
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 32,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: LuxuryColors.charcoalGray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    fontSize: 20,
    color: LuxuryColors.luxeWhite,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: LuxuryColors.luxeWhite,
  },
  headerRight: {
    width: 40,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 40,
    paddingVertical: 20,
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: LuxuryColors.imperialGold,
  },
  profileImagePlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: LuxuryColors.charcoalGray,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: LuxuryColors.imperialGold,
    borderStyle: 'dashed',
  },
  profileImageIcon: {
    fontSize: 40,
    marginBottom: 8,
  },
  profileImageText: {
    fontSize: 12,
    color: LuxuryColors.coolGray,
    textAlign: 'center',
  },
  editImageButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: LuxuryColors.imperialGold,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: LuxuryColors.jetBlack,
  },
  editImageIcon: {
    fontSize: 16,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: LuxuryColors.luxeWhite,
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    color: LuxuryColors.coolGray,
    marginBottom: 20,
  },
  editProfileButton: {
    backgroundColor: LuxuryColors.imperialGold,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 20,
  },
  editProfileText: {
    fontSize: 16,
    fontWeight: '600',
    color: LuxuryColors.jetBlack,
  },
  optionsSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: LuxuryColors.luxeWhite,
    marginBottom: 16,
  },
  optionCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: LuxuryColors.charcoalGray,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  destructiveOption: {
    borderLeftWidth: 4,
    borderLeftColor: LuxuryColors.royalRed,
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  optionIcon: {
    fontSize: 20,
    marginRight: 16,
    width: 24,
    textAlign: 'center',
  },
  optionContent: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: LuxuryColors.luxeWhite,
    marginBottom: 2,
  },
  optionSubtitle: {
    fontSize: 14,
    color: LuxuryColors.coolGray,
  },
  destructiveText: {
    color: LuxuryColors.royalRed,
  },
  optionArrow: {
    fontSize: 18,
    color: LuxuryColors.coolGray,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: LuxuryColors.charcoalGray,
    borderRadius: 16,
    padding: 24,
    width: width * 0.9,
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: LuxuryColors.luxeWhite,
    marginBottom: 24,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: LuxuryColors.luxeWhite,
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: LuxuryColors.graphiteTint,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: LuxuryColors.luxeWhite,
    borderWidth: 1,
    borderColor: LuxuryColors.coolGray,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  modalButtonCancel: {
    flex: 1,
    backgroundColor: LuxuryColors.graphiteTint,
    paddingVertical: 12,
    borderRadius: 8,
    marginRight: 8,
  },
  modalButtonSave: {
    flex: 1,
    backgroundColor: LuxuryColors.imperialGold,
    paddingVertical: 12,
    borderRadius: 8,
    marginLeft: 8,
  },
  modalButtonTextCancel: {
    fontSize: 16,
    fontWeight: '600',
    color: LuxuryColors.luxeWhite,
    textAlign: 'center',
  },
  modalButtonTextSave: {
    fontSize: 16,
    fontWeight: '600',
    color: LuxuryColors.jetBlack,
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: LuxuryColors.jetBlack,
  },
  loadingText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: LuxuryColors.luxeWhite,
  },
}); 