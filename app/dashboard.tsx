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

export default function DashboardScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  const [userName, setUserName] = useState('John Doe'); // This would come from login response or stored user data
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = () => {
    // TODO: Clear stored tokens
    router.replace('/auth/login');
  };

  const handleProfile = () => {
    // TODO: Navigate to profile screen
    console.log('Navigate to profile');
  };

  const handleSettings = () => {
    // TODO: Navigate to settings screen
    console.log('Navigate to settings');
  };

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
            <View style={styles.headerLeft}>
              <Image 
                source={require('../assets/images/Privora-Logo.png')}
                style={styles.logoImage}
                resizeMode="contain"
              />
              <View style={styles.welcomeContainer}>
                <Text style={styles.welcomeText}>
                  Welcome back,
                </Text>
                <Text style={styles.userNameText}>
                  {userName}
                </Text>
              </View>
            </View>
            <View style={styles.headerRight}>
              <TouchableOpacity onPress={handleProfile} style={styles.iconButton}>
                <Text style={styles.iconText}>👤</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleSettings} style={styles.iconButton}>
                <Text style={styles.iconText}>⚙️</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Quick Stats */}
          <View style={styles.statsContainer}>
            <Text style={styles.sectionTitle}>Portfolio Overview</Text>
            <View style={styles.statsGrid}>
              <View style={styles.statCard}>
                <Text style={styles.statValue}>$125,430</Text>
                <Text style={styles.statLabel}>Total Assets</Text>
                <Text style={[styles.statChange, { color: LuxuryColors.emeraldGreen }]}>+2.4%</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statValue}>$8,240</Text>
                <Text style={styles.statLabel}>Monthly Return</Text>
                <Text style={[styles.statChange, { color: LuxuryColors.emeraldGreen }]}>+1.8%</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statValue}>12</Text>
                <Text style={styles.statLabel}>Active Investments</Text>
                <Text style={[styles.statChange, { color: LuxuryColors.imperialGold }]}>3 New</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statValue}>$2,150</Text>
                <Text style={styles.statLabel}>Available Cash</Text>
                <Text style={[styles.statChange, { color: LuxuryColors.coolGray }]}>Ready</Text>
              </View>
            </View>
          </View>

          {/* Recent Activity */}
          <View style={styles.activityContainer}>
            <Text style={styles.sectionTitle}>Recent Activity</Text>
            <View style={styles.activityList}>
              <View style={styles.activityItem}>
                <View style={styles.activityIcon}>
                  <Text style={styles.activityIconText}>📈</Text>
                </View>
                <View style={styles.activityContent}>
                  <Text style={styles.activityTitle}>Investment Added</Text>
                  <Text style={styles.activitySubtitle}>Apple Inc. (AAPL) - $5,000</Text>
                  <Text style={styles.activityTime}>2 hours ago</Text>
                </View>
                <Text style={[styles.activityAmount, { color: LuxuryColors.emeraldGreen }]}>
                  +$5,000
                </Text>
              </View>
              
              <View style={styles.activityItem}>
                <View style={styles.activityIcon}>
                  <Text style={styles.activityIconText}>💰</Text>
                </View>
                <View style={styles.activityContent}>
                  <Text style={styles.activityTitle}>Dividend Received</Text>
                  <Text style={styles.activitySubtitle}>Microsoft Corp. (MSFT)</Text>
                  <Text style={styles.activityTime}>1 day ago</Text>
                </View>
                <Text style={[styles.activityAmount, { color: LuxuryColors.emeraldGreen }]}>
                  +$120
                </Text>
              </View>
              
              <View style={styles.activityItem}>
                <View style={styles.activityIcon}>
                  <Text style={styles.activityIconText}>📊</Text>
                </View>
                <View style={styles.activityContent}>
                  <Text style={styles.activityTitle}>Portfolio Rebalanced</Text>
                  <Text style={styles.activitySubtitle}>Automated adjustment</Text>
                  <Text style={styles.activityTime}>3 days ago</Text>
                </View>
                <Text style={[styles.activityAmount, { color: LuxuryColors.imperialGold }]}>
                  Balanced
                </Text>
              </View>
            </View>
          </View>

          {/* Quick Actions */}
          <View style={styles.actionsContainer}>
            <Text style={styles.sectionTitle}>Quick Actions</Text>
            <View style={styles.actionsGrid}>
              <TouchableOpacity style={styles.actionCard}>
                <Text style={styles.actionIcon}>💼</Text>
                <Text style={styles.actionTitle}>Invest</Text>
                <Text style={styles.actionSubtitle}>Add new investment</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.actionCard}>
                <Text style={styles.actionIcon}>📊</Text>
                <Text style={styles.actionTitle}>Analytics</Text>
                <Text style={styles.actionSubtitle}>View detailed reports</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.actionCard}>
                <Text style={styles.actionIcon}>🎯</Text>
                <Text style={styles.actionTitle}>Goals</Text>
                <Text style={styles.actionSubtitle}>Track your targets</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.actionCard}>
                <Text style={styles.actionIcon}>📱</Text>
                <Text style={styles.actionTitle}>Support</Text>
                <Text style={styles.actionSubtitle}>Get help</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Logout Button */}
          <TouchableOpacity 
            style={styles.logoutButton}
            onPress={handleLogout}
          >
            <Text style={styles.logoutButtonText}>Sign Out</Text>
          </TouchableOpacity>
        </ScrollView>
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
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 32,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoImage: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    marginRight: 12,
  },
  welcomeContainer: {
    flex: 1,
  },
  welcomeText: {
    fontSize: 14,
    color: LuxuryColors.coolGray,
  },
  userNameText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: LuxuryColors.luxeWhite,
  },
  headerRight: {
    flexDirection: 'row',
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: LuxuryColors.charcoalGray,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  iconText: {
    fontSize: 18,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: LuxuryColors.luxeWhite,
    marginBottom: 16,
  },
  statsContainer: {
    marginBottom: 32,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    width: '48%',
    backgroundColor: LuxuryColors.charcoalGray,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: LuxuryColors.luxeWhite,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: LuxuryColors.coolGray,
    marginBottom: 4,
  },
  statChange: {
    fontSize: 12,
    fontWeight: '600',
  },
  activityContainer: {
    marginBottom: 32,
  },
  activityList: {
    backgroundColor: LuxuryColors.charcoalGray,
    borderRadius: 12,
    padding: 16,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: LuxuryColors.graphiteTint,
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: LuxuryColors.imperialGold,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activityIconText: {
    fontSize: 16,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: LuxuryColors.luxeWhite,
    marginBottom: 2,
  },
  activitySubtitle: {
    fontSize: 14,
    color: LuxuryColors.coolGray,
    marginBottom: 2,
  },
  activityTime: {
    fontSize: 12,
    color: LuxuryColors.coolGray,
  },
  activityAmount: {
    fontSize: 16,
    fontWeight: '600',
  },
  actionsContainer: {
    marginBottom: 32,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionCard: {
    width: '48%',
    backgroundColor: LuxuryColors.charcoalGray,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  actionIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: LuxuryColors.luxeWhite,
    marginBottom: 4,
  },
  actionSubtitle: {
    fontSize: 12,
    color: LuxuryColors.coolGray,
    textAlign: 'center',
  },
  logoutButton: {
    backgroundColor: LuxuryColors.royalRed,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  logoutButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: LuxuryColors.luxeWhite,
  },
}); 