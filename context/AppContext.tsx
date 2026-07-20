import React, { createContext, useContext, useState, useCallback } from 'react';

export type Transaction = {
  id: string;
  retailer: string;
  amountSpent: number;
  pointsEarned: number;
  debtReduced: number;
  date: string;
};

type AppState = {
  studentName: string;
  studentNumber: string;
  university: string;
  referralCode: string;
  startingDebt: number;
  remainingDebt: number;
  totalReduced: number;
  pointsBalance: number;
  transactions: Transaction[];
  simulatePurchase: (retailer: string) => Transaction;
  resetDemo: () => void;
};

const STARTING_DEBT = 42500;

const AppContext = createContext<AppState | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [remainingDebt, setRemainingDebt] = useState(STARTING_DEBT);
  const [totalReduced, setTotalReduced] = useState(0);
  const [pointsBalance, setPointsBalance] = useState(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const simulatePurchase = useCallback((retailer: string) => {
    const amountSpent = Math.floor(150 + Math.random() * 650); // R150 - R800
    const pointsEarned = Math.round(amountSpent * 0.05); // 5% redirected to debt
    const debtReduced = pointsEarned;

    const transaction: Transaction = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      retailer,
      amountSpent,
      pointsEarned,
      debtReduced,
      date: new Date().toISOString(),
    };

    setTransactions((prev) => [transaction, ...prev]);
    setPointsBalance((prev) => prev + pointsEarned);
    setTotalReduced((prev) => prev + debtReduced);
    setRemainingDebt((prev) => Math.max(0, prev - debtReduced));

    return transaction;
  }, []);

  const resetDemo = useCallback(() => {
    setRemainingDebt(STARTING_DEBT);
    setTotalReduced(0);
    setPointsBalance(0);
    setTransactions([]);
  }, []);

  const value: AppState = {
    studentName: 'Lindiwe Nkosi',
    studentNumber: 'UFH20231145',
    university: 'University of Fort Hare',
    referralCode: 'KHASEN-LN482',
    startingDebt: STARTING_DEBT,
    remainingDebt,
    totalReduced,
    pointsBalance,
    transactions,
    simulatePurchase,
    resetDemo,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}

export function formatCurrency(value: number) {
  return `R${value.toLocaleString('en-ZA', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
}
