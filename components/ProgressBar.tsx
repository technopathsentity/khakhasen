import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors, radius } from '../constants/theme';

export default function ProgressBar({ percentage }: { percentage: number }) {
  const clamped = Math.min(100, Math.max(0, percentage));
  return (
    <View style={styles.track}>
      <View style={[styles.fill, { width: `${clamped}%` }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    height: 12,
    backgroundColor: colors.border,
    borderRadius: radius.pill,
    overflow: 'hidden',
    width: '100%',
  },
  fill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: radius.pill,
  },
});
