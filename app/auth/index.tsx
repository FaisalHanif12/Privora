import { router } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';

export default function AuthIndex() {
  useEffect(() => {
    // Redirect to login as default auth screen
    const timer = setTimeout(() => {
      try {
        router.replace('/auth/login');
      } catch (error) {
        console.log('Navigation error:', error);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0B0C10' }}>
      <ActivityIndicator size="large" color="#D4AF37" />
    </View>
  );
} 