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
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { UserIcon } from './components/UserIcon';
import { useUser } from './context/UserContext';

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

export default function DashboardScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const { user, loading } = useUser();
  
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [sidebarAnimation] = useState(new Animated.Value(-width * 0.8));

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

  const handleLogout = () => {
    // TODO: Clear stored tokens
    router.replace('/auth/login');
  };

  const handleProfile = () => {
    router.push('/profile');
  };

  const handleSettings = () => {
    router.push('/profile');
  };

  const toggleSidebar = () => {
    if (isSidebarOpen) {
      Animated.timing(sidebarAnimation, {
        toValue: -width * 0.8,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(sidebarAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    if (isSidebarOpen) {
      Animated.timing(sidebarAnimation, {
        toValue: -width * 0.8,
        duration: 300,
        useNativeDriver: false,
      }).start();
      setIsSidebarOpen(false);
    }
  };

  const Sidebar = () => (
    <Animated.View style={[styles.sidebar, { transform: [{ translateX: sidebarAnimation }] }]}>
      <View style={styles.sidebarHeader}>
        <Image 
          source={require('../assets/images/Privora-Logo.png')}
          style={styles.sidebarLogo}
          resizeMode="contain"
        />
        <Text style={styles.sidebarTitle}>Privora</Text>
      </View>
      
      <View style={styles.sidebarMenu}>
        <TouchableOpacity style={styles.sidebarMenuItem}>
          <Text style={styles.sidebarMenuIcon}>🏠</Text>
          <Text style={styles.sidebarMenuText}>Dashboard</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.sidebarMenuItem}>
          <Text style={styles.sidebarMenuIcon}>📊</Text>
          <Text style={styles.sidebarMenuText}>Portfolio</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.sidebarMenuItem}>
          <Text style={styles.sidebarMenuIcon}>💼</Text>
          <Text style={styles.sidebarMenuText}>Investments</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.sidebarMenuItem}>
          <Text style={styles.sidebarMenuIcon}>📈</Text>
          <Text style={styles.sidebarMenuText}>Analytics</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.sidebarMenuItem}>
          <Text style={styles.sidebarMenuIcon}>🎯</Text>
          <Text style={styles.sidebarMenuText}>Goals</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.sidebarMenuItem} onPress={handleProfile}>
          <Text style={styles.sidebarMenuIcon}>⚙️</Text>
          <Text style={styles.sidebarMenuText}>Settings</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.sidebarMenuItem}>
          <Text style={styles.sidebarMenuIcon}>📱</Text>
          <Text style={styles.sidebarMenuText}>Support</Text>
        </TouchableOpacity>
      </View>
      
      <TouchableOpacity style={styles.sidebarLogout} onPress={handleLogout}>
        <Text style={styles.sidebarMenuIcon}>🚪</Text>
        <Text style={styles.sidebarMenuText}>Sign Out</Text>
      </TouchableOpacity>
    </Animated.View>
  );

  const BottomNavbar = () => (
    <View style={styles.bottomNavbar}>
      <TouchableOpacity style={styles.bottomNavItem}>
        <Text style={styles.bottomNavIcon}>🏠</Text>
        <Text style={styles.bottomNavText}>Home</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.bottomNavItem}>
        <Text style={styles.bottomNavIcon}>📊</Text>
        <Text style={styles.bottomNavText}>Portfolio</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.bottomNavItem}>
        <Text style={styles.bottomNavIcon}>💼</Text>
        <Text style={styles.bottomNavText}>Invest</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.bottomNavItem}>
        <Text style={styles.bottomNavIcon}>📈</Text>
        <Text style={styles.bottomNavText}>Analytics</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.bottomNavItem} onPress={handleProfile}>
        <Text style={styles.bottomNavIcon}>👤</Text>
        <Text style={styles.bottomNavText}>Profile</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: LuxuryColors.jetBlack }]}>
      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <TouchableWithoutFeedback onPress={closeSidebar}>
          <View style={styles.sidebarOverlay} />
        </TouchableWithoutFeedback>
      )}
      
      {/* Sidebar */}
      <Sidebar />
      
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
              <TouchableOpacity onPress={toggleSidebar} style={styles.menuButton}>
                <Text style={styles.menuIcon}>☰</Text>
              </TouchableOpacity>
              <View style={styles.welcomeContainer}>
                <Text style={styles.welcomeText}>
                  Welcome back,
                </Text>
                <Text style={styles.userNameText}>
                  {user?.fullName || 'User'}
                </Text>
              </View>
            </View>
            <TouchableOpacity onPress={handleProfile} style={styles.profileButton}>
              {user?.profileImage ? (
                <Image 
                  source={{ uri: user.profileImage }} 
                  style={styles.profileImage}
                  resizeMode="cover"
                />
              ) : (
                <UserIcon size={24} color={LuxuryColors.luxeWhite} />
              )}
            </TouchableOpacity>
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
        </ScrollView>
      </KeyboardAvoidingView>
      
      {/* Bottom Navbar */}
      <BottomNavbar />
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
    paddingBottom: 100, // Space for bottom navbar
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
    flex: 1,
  },
  menuButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: LuxuryColors.charcoalGray,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  menuIcon: {
    fontSize: 18,
    color: LuxuryColors.luxeWhite,
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
  profileButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: LuxuryColors.charcoalGray,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: LuxuryColors.imperialGold,
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 25,
  },
  profileIcon: {
    fontSize: 24,
    color: LuxuryColors.luxeWhite,
  },
  // Sidebar Styles
  sidebarOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1000,
  },
  sidebar: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width * 0.8,
    height: '100%',
    backgroundColor: LuxuryColors.charcoalGray,
    zIndex: 1001,
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  sidebarHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: LuxuryColors.graphiteTint,
  },
  sidebarLogo: {
    width: 30,
    height: 30,
    marginRight: 12,
  },
  sidebarTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: LuxuryColors.luxeWhite,
  },
  sidebarMenu: {
    flex: 1,
  },
  sidebarMenuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: LuxuryColors.graphiteTint,
  },
  sidebarMenuIcon: {
    fontSize: 20,
    marginRight: 16,
    width: 24,
    textAlign: 'center',
  },
  sidebarMenuText: {
    fontSize: 16,
    color: LuxuryColors.luxeWhite,
    fontWeight: '500',
  },
  sidebarLogout: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: LuxuryColors.graphiteTint,
  },
  // Bottom Navbar Styles
  bottomNavbar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: LuxuryColors.charcoalGray,
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 12,
    paddingBottom: 30,
    borderTopWidth: 1,
    borderTopColor: LuxuryColors.graphiteTint,
  },
  bottomNavItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  bottomNavIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  bottomNavText: {
    fontSize: 12,
    color: LuxuryColors.coolGray,
    textAlign: 'center',
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: LuxuryColors.jetBlack,
  },
  loadingText: {
    fontSize: 20,
    color: LuxuryColors.luxeWhite,
    fontWeight: 'bold',
  },
}); 