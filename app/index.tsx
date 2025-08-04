import { router } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';

export default function Index() {
  useEffect(() => {
    // Add a small delay to ensure proper initialization
    const timer = setTimeout(() => {
      try {
        // Skip authentication for development - go directly to dashboard
        router.replace('/dashboard');
        // TODO: Uncomment below line when authentication is needed
        // router.replace('/auth/login');
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