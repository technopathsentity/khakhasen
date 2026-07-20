import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, spacing } from '../constants/theme';
import { formatCurrency, Transaction } from '../context/AppContext';

export default function TransactionItem({ transaction }: { transaction: Transaction }) {
  const date = new Date(transaction.date);
  const dateLabel = date.toLocaleDateString('en-ZA', { day: '2-digit', month: 'short' });
  const timeLabel = date.toLocaleTimeString('en-ZA', { hour: '2-digit', minute: '2-digit' });

  return (
    <View style={styles.row}>
      <View style={styles.iconWrap}>
        <Ionicons name="cart" size={18} color={colors.text} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.retailer}>{transaction.retailer}</Text>
        <Text style={styles.meta}>
          {dateLabel} · {timeLabel} · Spent {formatCurrency(transaction.amountSpent)}
        </Text>
      </View>
      <Text style={styles.reduced}>-{formatCurrency(transaction.debtReduced)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: radius.sm,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  retailer: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  meta: {
    fontSize: 11,
    color: colors.textMuted,
    marginTop: 2,
  },
  reduced: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.success,
  },
});
