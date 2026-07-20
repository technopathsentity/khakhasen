import React from 'react';
import { Text, StyleSheet, FlatList, View } from 'react-native';
import { colors, spacing } from '../../constants/theme';
import { useApp } from '../../context/AppContext';
import TransactionItem from '../../components/TransactionItem';

export default function History() {
  const { transactions } = useApp();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Purchase history</Text>
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => <TransactionItem transaction={item} />}
        ListEmptyComponent={
          <Text style={styles.empty}>No purchases yet. Go to Retailers and tap "Shop & Earn" to add one.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, paddingHorizontal: spacing.lg, paddingTop: spacing.xl },
  title: { fontSize: 22, fontWeight: '700', color: colors.text, marginBottom: spacing.md },
  list: { paddingBottom: spacing.xl },
  empty: { color: colors.textMuted, fontSize: 13, fontStyle: 'italic', marginTop: spacing.lg },
});
