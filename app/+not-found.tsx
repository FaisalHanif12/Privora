import { router } from 'expo-router';
import { useEffect } from 'react';

export default function NotFoundScreen() {
  useEffect(() => {
    // Redirect directly to login screen
    router.replace('/auth/login');
  }, []);

  return null;
}
