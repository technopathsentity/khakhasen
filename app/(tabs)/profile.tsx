import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Share, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, spacing } from '../../constants/theme';
import { useApp, formatCurrency } from '../../context/AppContext';

export default function Profile() {
  const { studentName, studentNumber, university, referralCode, remainingDebt, totalReduced, resetDemo } = useApp();

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Support my studies with Kha Khasen! Use my code ${referralCode} when you shop at Pick n Pay, Shoprite or SPAR and part of your spend reduces my tuition debt.`,
      });
    } catch (e) {
      // sharing cancelled or unavailable — nothing to do
    }
  };

  const handleReset = () => {
    Alert.alert('Reset demo?', 'This clears all simulated purchases and restores the starting balance.', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Reset', style: 'destructive', onPress: resetDemo },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.avatar}>
        <Ionicons name="person" size={36} color={colors.text} />
      </View>
      <Text style={styles.name}>{studentName}</Text>
      <Text style={styles.meta}>
        {studentNumber} · {university}
      </Text>

      <View style={styles.codeCard}>
        <Text style={styles.codeLabel}>Your referral code</Text>
        <Text style={styles.code}>{referralCode}</Text>
        <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
          <Ionicons name="share-social" size={16} color={colors.text} />
          <Text style={styles.shareText}>Share with family & friends</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.summaryRow}>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryValue}>{formatCurrency(remainingDebt)}</Text>
          <Text style={styles.summaryLabel}>Remaining</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryValue}>{formatCurrency(totalReduced)}</Text>
          <Text style={styles.summaryLabel}>Reduced so far</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
        <Text style={styles.resetText}>Reset demo data</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: spacing.lg, paddingTop: spacing.xl, alignItems: 'center' },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  name: { fontSize: 20, fontWeight: '700', color: colors.text },
  meta: { fontSize: 12, color: colors.textMuted, marginTop: 2, marginBottom: spacing.lg },
  codeCard: {
    width: '100%',
    backgroundColor: colors.text,
    borderRadius: radius.lg,
    padding: spacing.lg,
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  codeLabel: { color: '#D9D9D9', fontSize: 12 },
  code: { color: colors.primary, fontSize: 24, fontWeight: '800', letterSpacing: 1, marginVertical: spacing.sm },
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: radius.pill,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    marginTop: spacing.sm,
  },
  shareText: { color: colors.text, fontSize: 12, fontWeight: '700', marginLeft: spacing.xs },
  summaryRow: { flexDirection: 'row', width: '100%', marginBottom: spacing.xl },
  summaryItem: { flex: 1, alignItems: 'center' },
  summaryValue: { fontSize: 18, fontWeight: '700', color: colors.text },
  summaryLabel: { fontSize: 11, color: colors.textMuted, marginTop: 2 },
  resetButton: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.border,
  },
  resetText: { color: colors.textMuted, fontSize: 13, fontWeight: '600' },
});
