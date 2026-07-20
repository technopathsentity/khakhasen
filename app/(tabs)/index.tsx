import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, spacing } from '../../constants/theme';
import { useApp, formatCurrency } from '../../context/AppContext';
import StatCard from '../../components/StatCard';
import ProgressBar from '../../components/ProgressBar';
import TransactionItem from '../../components/TransactionItem';

const QUICK_RETAILERS = ['Pick n Pay', 'Shoprite', 'SPAR'];

export default function Home() {
  const {
    studentName, university, startingDebt, remainingDebt,
    totalReduced, pointsBalance, transactions, simulatePurchase,
  } = useApp();

  const percentagePaid = (totalReduced / startingDebt) * 100;

  const handleQuickPurchase = () => {
    const retailer = QUICK_RETAILERS[Math.floor(Math.random() * QUICK_RETAILERS.length)];
    const tx = simulatePurchase(retailer);
    Alert.alert(
      'Purchase simulated',
      `${retailer}: spent ${formatCurrency(tx.amountSpent)}, reduced debt by ${formatCurrency(tx.debtReduced)}.`,
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.headerRow}>
        <View style={{ flex: 1 }}>
          <Text style={styles.eyebrow}>WELCOME BACK</Text>
          <Text style={styles.greeting}>Hi, {studentName.split(' ')[0]}</Text>
          <Text style={styles.subtitle}>{university}</Text>
        </View>
        <View style={styles.headerBadge}>
          <Ionicons name="sparkles" size={18} color={colors.text} />
        </View>
      </View>

      <View style={styles.debtCard}>
        <View style={styles.debtHeaderRow}>
          <Text style={styles.debtLabel}>Remaining balance</Text>
          <View style={styles.debtChip}>
            <Text style={styles.debtChipText}>{percentagePaid.toFixed(1)}% paid</Text>
          </View>
        </View>
        <Text style={styles.debtValue}>{formatCurrency(remainingDebt)}</Text>
        <ProgressBar percentage={percentagePaid} />
        <Text style={styles.debtSub}>
          {formatCurrency(totalReduced)} of {formatCurrency(startingDebt)} reduced
        </Text>
      </View>

      <View style={styles.statsRow}>
        <StatCard label="Points balance" value={pointsBalance.toString()} icon="star" />
        <StatCard label="Purchases logged" value={transactions.length.toString()} icon="receipt" accent={colors.border} />
      </View>

      <TouchableOpacity style={styles.simulateButton} onPress={handleQuickPurchase} activeOpacity={0.9}>
        <Ionicons name="flash" size={18} color={colors.text} />
        <Text style={styles.simulateText}>Simulate a purchase</Text>
      </TouchableOpacity>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Recent activity</Text>
        <Text style={styles.sectionLink}>View all</Text>
      </View>

      {transactions.length === 0 ? (
        <View style={styles.emptyCard}>
          <Ionicons name="receipt-outline" size={22} color={colors.textMuted} />
          <Text style={styles.empty}>
            No purchases yet — tap "Simulate a purchase" above to see how it works.
          </Text>
        </View>
      ) : (
        transactions.slice(0, 3).map((tx) => <TransactionItem key={tx.id} transaction={tx} />)
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg, paddingTop: spacing.xl + 8, paddingBottom: spacing.xl },

  headerRow: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.lg },
  eyebrow: { fontSize: 11, fontWeight: '700', letterSpacing: 1.5, color: colors.textMuted },
  greeting: { fontSize: 28, fontWeight: '800', color: colors.text, marginTop: 4, letterSpacing: -0.5 },
  subtitle: { fontSize: 13, color: colors.textMuted, marginTop: 2 },
  headerBadge: {
    width: 44, height: 44, borderRadius: radius.pill,
    backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center',
    borderWidth: 1, borderColor: '#000',
  },

  debtCard: {
    backgroundColor: '#242020',
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: '#000',
    shadowColor: '#000',
    shadowOpacity: 0.18,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
    elevation: 6,
  },
  debtHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  debtLabel: { color: colors.primary, fontSize: 12, fontWeight: '700', letterSpacing: 1 },
  debtChip: {
    backgroundColor: colors.primary,
    paddingHorizontal: 10, paddingVertical: 4,
    borderRadius: radius.pill,
  },
  debtChipText: { color: '#000', fontSize: 11, fontWeight: '700' },
  debtValue: { color: '#FFF6EA', fontSize: 36, fontWeight: '800', marginTop: 8, marginBottom: spacing.md, letterSpacing: -1 },
  debtSub: { color: 'rgba(255,246,234,0.7)', fontSize: 12, marginTop: spacing.sm, fontWeight: '500' },

  statsRow: { flexDirection: 'row', marginBottom: spacing.md, marginHorizontal: -spacing.xs / 2 },

  simulateButton: {
    backgroundColor: colors.primary,
    borderRadius: radius.pill,
    paddingVertical: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: '#000',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  simulateText: { fontWeight: '800', color: '#000', fontSize: 15, letterSpacing: 0.3 },

  sectionHeader: {
    marginBottom: spacing.sm,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  sectionTitle: { fontSize: 17, fontWeight: '800', color: colors.text, letterSpacing: -0.3 },
  sectionLink: { fontSize: 12, fontWeight: '700', color: colors.textMuted },

  emptyCard: {
    backgroundColor: colors.card,
    borderRadius: radius.md,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    gap: 8,
  },
  empty: { color: colors.textMuted, fontSize: 13, fontStyle: 'italic', textAlign: 'center' },
});
