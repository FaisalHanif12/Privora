import React from 'react';
import { StyleSheet, View } from 'react-native';

interface UserIconProps {
  size?: number;
  color?: string;
}

export const UserIcon: React.FC<UserIconProps> = ({ size = 24, color = '#FFFFFF' }) => {
  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <View style={[styles.circle, { backgroundColor: color, width: size * 0.6, height: size * 0.6 }]} />
      <View style={[styles.body, { backgroundColor: color, width: size * 0.8, height: size * 0.4 }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    borderRadius: 50,
    marginBottom: 2,
  },
  body: {
    borderRadius: 4,
  },
}); 