import React from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing } from '../../constants/theme';
import { useApp, formatCurrency } from '../../context/AppContext';
import RetailerCard from '../../components/RetailerCard';

const RETAILERS: { name: string; icon: keyof typeof Ionicons.glyphMap; cashbackRate: string; color: string }[] = [
  { name: 'Pick n Pay', icon: 'basket', cashbackRate: '5%', color: '#FFDD57' },
  { name: 'Shoprite', icon: 'cart', cashbackRate: '4%', color: '#FFE08A' },
  { name: 'SPAR', icon: 'storefront', cashbackRate: '5%', color: '#FFEAB0' },
  { name: 'Checkers', icon: 'bag-handle', cashbackRate: '3%', color: '#FFDD57' },
  { name: 'Woolworths', icon: 'leaf', cashbackRate: '3%', color: '#FFE08A' },
];

export default function Retailers() {
  const { simulatePurchase } = useApp();

  const handleShop = (retailer: string) => {
    const tx = simulatePurchase(retailer);
    Alert.alert(
      'Purchase simulated',
      `${retailer}: spent ${formatCurrency(tx.amountSpent)}, reduced debt by ${formatCurrency(tx.debtReduced)}.`
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Participating retailers</Text>
      <Text style={styles.subtitle}>
        Shop with your referral code linked and a share of every purchase goes toward your debt.
      </Text>
      <View style={{ marginTop: spacing.lg }}>
        {RETAILERS.map((r) => (
          <RetailerCard
            key={r.name}
            name={r.name}
            icon={r.icon}
            cashbackRate={r.cashbackRate}
            color={r.color}
            onPress={() => handleShop(r.name)}
          />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg, paddingTop: spacing.xl, paddingBottom: spacing.xl },
  title: { fontSize: 22, fontWeight: '700', color: colors.text },
  subtitle: { fontSize: 13, color: colors.textMuted, marginTop: spacing.xs },
});
