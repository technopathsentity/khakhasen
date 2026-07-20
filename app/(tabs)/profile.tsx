import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Share, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, spacing } from '../../constants/theme';
import { useApp, formatCurrency } from '../../context/AppContext';

export default function Profile() {
  const {
    studentName, studentNumber, university, referralCode,
    remainingDebt, totalReduced, resetDemo,
  } = useApp();

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Support my studies with Kha Khasen! Use my code ${referralCode} when you shop at Pick n Pay, Shoprite or SPAR and part of your spend reduces my tuition debt.`,
      });
    } catch {}
  };

  const handleReset = () => {
    Alert.alert('Reset demo?', 'This clears all simulated purchases and restores the starting balance.', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Reset', style: 'destructive', onPress: resetDemo },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.avatarWrap}>
        <View style={styles.avatar}>
          <Ionicons name="person" size={36} color="#000" />
        </View>
      </View>
      <Text style={styles.name}>{studentName}</Text>
      <Text style={styles.meta}>{studentNumber} · {university}</Text>

      <View style={styles.codeCard}>
        <Text style={styles.codeLabel}>YOUR REFERRAL CODE</Text>
        <Text style={styles.code}>{referralCode}</Text>
        <TouchableOpacity style={styles.shareButton} onPress={handleShare} activeOpacity={0.9}>
          <Ionicons name="share-social" size={16} color="#000" />
          <Text style={styles.shareText}>Share with family & friends</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.summaryRow}>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryValue}>{formatCurrency(remainingDebt)}</Text>
          <Text style={styles.summaryLabel}>Remaining</Text>
        </View>
        <View style={styles.summaryDivider} />
        <View style={styles.summaryItem}>
          <Text style={styles.summaryValue}>{formatCurrency(totalReduced)}</Text>
          <Text style={styles.summaryLabel}>Reduced so far</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.resetButton} onPress={handleReset} activeOpacity={0.8}>
        <Text style={styles.resetText}>Reset demo data</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: spacing.lg, paddingTop: spacing.xl + 8, alignItems: 'center' },
  avatarWrap: {
    padding: 4,
    borderRadius: radius.pill,
    backgroundColor: '#242020',
    marginBottom: spacing.md,
  },
  avatar: {
    width: 72, height: 72, borderRadius: 36,
    backgroundColor: colors.primary,
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 2, borderColor: '#000',
  },
  name: { fontSize: 22, fontWeight: '800', color: colors.text, letterSpacing: -0.5 },
  meta: { fontSize: 12, color: colors.textMuted, marginTop: 4, marginBottom: spacing.lg, fontWeight: '500' },

  codeCard: {
    width: '100%',
    backgroundColor: '#242020',
    borderRadius: radius.lg,
    padding: spacing.lg,
    alignItems: 'center',
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: '#000',
    shadowColor: '#000',
    shadowOpacity: 0.18,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
    elevation: 6,
  },
  codeLabel: { color: 'rgba(255,246,234,0.6)', fontSize: 11, fontWeight: '700', letterSpacing: 1.5 },
  code: { color: colors.primary, fontSize: 30, fontWeight: '800', letterSpacing: 4, marginVertical: spacing.sm },
  shareButton: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: colors.primary,
    borderRadius: radius.pill,
    paddingVertical: spacing.sm, paddingHorizontal: spacing.md,
    marginTop: spacing.sm,
    borderWidth: 1, borderColor: '#000',
  },
  shareText: { color: '#000', fontSize: 12, fontWeight: '800' },

  summaryRow: {
    flexDirection: 'row', width: '100%', marginBottom: spacing.xl,
    backgroundColor: colors.card,
    borderRadius: radius.md,
    borderWidth: 1, borderColor: colors.border,
    paddingVertical: spacing.md,
  },
  summaryItem: { flex: 1, alignItems: 'center' },
  summaryDivider: { width: 1, backgroundColor: colors.border },
  summaryValue: { fontSize: 18, fontWeight: '800', color: colors.text, letterSpacing: -0.3 },
  summaryLabel: { fontSize: 11, color: colors.textMuted, marginTop: 4, fontWeight: '600', letterSpacing: 0.5 },

  resetButton: {
    paddingVertical: spacing.sm, paddingHorizontal: spacing.lg,
    borderRadius: radius.pill,
    borderWidth: 1, borderColor: colors.border,
    backgroundColor: colors.card,
  },
  resetText: { color: colors.textMuted, fontSize: 13, fontWeight: '700' },
});
