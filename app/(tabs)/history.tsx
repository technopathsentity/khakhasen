import React from 'react';
import { Text, StyleSheet, FlatList, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, spacing } from '../../constants/theme';
import { useApp } from '../../context/AppContext';
import TransactionItem from '../../components/TransactionItem';

export default function History() {
  const { transactions } = useApp();

  return (
    <View style={styles.container}>
      <Text style={styles.eyebrow}>ACTIVITY</Text>
      <Text style={styles.title}>Purchase history</Text>
      <Text style={styles.subtitle}>Every simulated purchase and the debt it reduced.</Text>

      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => <TransactionItem transaction={item} />}
        ListEmptyComponent={
          <View style={styles.emptyCard}>
            <Ionicons name="time-outline" size={24} color={colors.textMuted} />
            <Text style={styles.empty}>
              No purchases yet. Go to Retailers and tap "Shop & Earn" to add one.
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, paddingHorizontal: spacing.lg, paddingTop: spacing.xl + 8 },
  eyebrow: { fontSize: 11, fontWeight: '700', letterSpacing: 1.5, color: colors.textMuted },
  title: { fontSize: 26, fontWeight: '800', color: colors.text, marginTop: 4, letterSpacing: -0.5 },
  subtitle: { fontSize: 13, color: colors.textMuted, marginTop: 4, marginBottom: spacing.lg },
  list: { paddingBottom: spacing.xl },
  emptyCard: {
    backgroundColor: colors.card,
    borderRadius: radius.md,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    gap: 8,
    marginTop: spacing.md,
  },
  empty: { color: colors.textMuted, fontSize: 13, fontStyle: 'italic', textAlign: 'center' },
});
