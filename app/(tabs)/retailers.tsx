import React from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, spacing } from '../../constants/theme';
import { useApp, formatCurrency } from '../../context/AppContext';
import RetailerCard from '../../components/RetailerCard';

const RETAILERS: { name: string; icon: keyof typeof Ionicons.glyphMap; cashbackRate: string; color: string }[] = [
  { name: 'Pick n Pay',  icon: 'basket',      cashbackRate: '5%', color: '#FFD230' },
  { name: 'Shoprite',    icon: 'cart',        cashbackRate: '4%', color: '#FFDE6B' },
  { name: 'SPAR',        icon: 'storefront',  cashbackRate: '5%', color: '#FFE896' },
  { name: 'Checkers',    icon: 'bag-handle',  cashbackRate: '3%', color: '#FFD230' },
  { name: 'Woolworths',  icon: 'leaf',        cashbackRate: '3%', color: '#FFDE6B' },
];

export default function Retailers() {
  const { simulatePurchase } = useApp();

  const handleShop = (retailer: string) => {
    const tx = simulatePurchase(retailer);
    Alert.alert(
      'Purchase simulated',
      `${retailer}: spent ${formatCurrency(tx.amountSpent)}, reduced debt by ${formatCurrency(tx.debtReduced)}.`,
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.eyebrow}>PARTNERS</Text>
      <Text style={styles.title}>Participating retailers</Text>
      <Text style={styles.subtitle}>
        Shop with your referral code linked and a share of every purchase goes toward your debt.
      </Text>

      <View style={styles.infoStrip}>
        <View style={styles.infoIcon}>
          <Ionicons name="information" size={14} color="#000" />
        </View>
        <Text style={styles.infoText}>Tap any retailer to simulate a purchase</Text>
      </View>

      <View style={{ marginTop: spacing.md }}>
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
  content: { padding: spacing.lg, paddingTop: spacing.xl + 8, paddingBottom: spacing.xl },
  eyebrow: { fontSize: 11, fontWeight: '700', letterSpacing: 1.5, color: colors.textMuted },
  title: { fontSize: 26, fontWeight: '800', color: colors.text, marginTop: 4, letterSpacing: -0.5 },
  subtitle: { fontSize: 13, color: colors.textMuted, marginTop: spacing.xs, lineHeight: 19 },
  infoStrip: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    marginTop: spacing.lg,
    backgroundColor: colors.card,
    borderWidth: 1, borderColor: colors.border,
    borderRadius: radius.md,
    padding: spacing.sm + 2,
  },
  infoIcon: {
    width: 22, height: 22, borderRadius: 11,
    backgroundColor: colors.primary,
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 1, borderColor: '#000',
  },
  infoText: { fontSize: 12, color: colors.text, fontWeight: '600' },
});
