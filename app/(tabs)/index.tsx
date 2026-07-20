import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { colors, radius, spacing } from '../../constants/theme';
import { useApp, formatCurrency } from '../../context/AppContext';
import StatCard from '../../components/StatCard';
import ProgressBar from '../../components/ProgressBar';
import TransactionItem from '../../components/TransactionItem';

const QUICK_RETAILERS = ['Pick n Pay', 'Shoprite', 'SPAR'];

export default function Home() {
  const {
    studentName,
    university,
    startingDebt,
    remainingDebt,
    totalReduced,
    pointsBalance,
    transactions,
    simulatePurchase,
  } = useApp();

  const percentagePaid = (totalReduced / startingDebt) * 100;

  const handleQuickPurchase = () => {
    const retailer = QUICK_RETAILERS[Math.floor(Math.random() * QUICK_RETAILERS.length)];
    const tx = simulatePurchase(retailer);
    Alert.alert(
      'Purchase simulated',
      `${retailer}: spent ${formatCurrency(tx.amountSpent)}, reduced debt by ${formatCurrency(tx.debtReduced)}.`
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.greeting}>Hi, {studentName.split(' ')[0]} 👋</Text>
      <Text style={styles.subtitle}>{university}</Text>

      <View style={styles.debtCard}>
        <Text style={styles.debtLabel}>Remaining balance</Text>
        <Text style={styles.debtValue}>{formatCurrency(remainingDebt)}</Text>
        <ProgressBar percentage={percentagePaid} />
        <Text style={styles.debtSub}>
          {formatCurrency(totalReduced)} of {formatCurrency(startingDebt)} reduced ({percentagePaid.toFixed(1)}%)
        </Text>
      </View>

      <View style={styles.statsRow}>
        <StatCard label="Points balance" value={pointsBalance.toString()} icon="star" />
        <StatCard label="Purchases logged" value={transactions.length.toString()} icon="receipt" accent={colors.border} />
      </View>

      <TouchableOpacity style={styles.simulateButton} onPress={handleQuickPurchase}>
        <Text style={styles.simulateText}>Simulate a purchase</Text>
      </TouchableOpacity>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Recent activity</Text>
      </View>

      {transactions.length === 0 ? (
        <Text style={styles.empty}>No purchases yet — tap "Simulate a purchase" above to see how it works.</Text>
      ) : (
        transactions.slice(0, 3).map((tx) => <TransactionItem key={tx.id} transaction={tx} />)
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg, paddingTop: spacing.xl, paddingBottom: spacing.xl },
  greeting: { fontSize: 24, fontWeight: '700', color: colors.text },
  subtitle: { fontSize: 13, color: colors.textMuted, marginTop: 2, marginBottom: spacing.lg },
  debtCard: {
    backgroundColor: colors.text,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
  },
  debtLabel: { color: colors.primary, fontSize: 13, fontWeight: '600' },
  debtValue: { color: '#fff', fontSize: 32, fontWeight: '800', marginTop: 4, marginBottom: spacing.md },
  debtSub: { color: '#D9D9D9', fontSize: 12, marginTop: spacing.sm },
  statsRow: { flexDirection: 'row', marginBottom: spacing.md, marginHorizontal: -spacing.xs / 2 },
  simulateButton: {
    backgroundColor: colors.primary,
    borderRadius: radius.pill,
    paddingVertical: spacing.md,
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  simulateText: { fontWeight: '700', color: colors.text, fontSize: 15 },
  sectionHeader: { marginBottom: spacing.sm },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: colors.text },
  empty: { color: colors.textMuted, fontSize: 13, fontStyle: 'italic' },
});
