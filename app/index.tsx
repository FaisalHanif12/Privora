import { router } from 'expo-router';
import { useEffect } from 'react';

export default function Index() {
  useEffect(() => {
    // Redirect directly to login screen immediately
    router.replace('/auth/login');
  }, []);

  return null;
}