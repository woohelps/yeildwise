"use client";

import { createSupabaseBrowserClient } from "@/utils/supabase/client";
import React, { useCallback, useEffect, useState } from "react";
import TransactionForm from "./transactionForm";
import TransactionModal from "./transactionModal";
import TransactionTable from "./transactionTable";

import { TransactionType, Transaction, Transactions } from "@/type";

const Transaction = () => {
  const [transactions, setTransactions] = useState<Transactions>(null);
  const supabaseBrowserClient = createSupabaseBrowserClient();
  const [showModal, setShowModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);

  const transactionType: TransactionType = {
    0: "in",
    1: "out",
    2: "dividend",
    3: "buy",
    4: "sell",
  };

  const handleEditClick = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setShowModal(true);
  };

  const clearSelectedTransaction = () => {
    setSelectedTransaction(null);
    setShowModal(false);
  };

  const fetchTransactions = useCallback(async () => {
    const { data, error } = await supabaseBrowserClient
      .from("stocks_transaction")
      .select(`*, stocks_equity(full_symbol)`)
      .eq("account_id", 1)
      .order("datetime", { ascending: false });

    if (error) {
      console.error("Error fetching transactions:", error);
    } else {
      setTransactions(data);
    }
  }, [supabaseBrowserClient]);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  if (transactions == null) {
    return <div>Loading...</div>; // 或者其他的加载指示器
  }

  return (
    <div className="overflow-x-auto w-full p-8">
      <button
        className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700"
        onClick={() => setShowModal(true)}
      >
        Add New Transaction
      </button>
      <TransactionTable
        transactions={transactions}
        transactionTypes={transactionType}
        onEditClick={handleEditClick}
      />
      <TransactionModal
        showModal={showModal}
        setShowModal={clearSelectedTransaction}
      >
        <TransactionForm
          setShowModal={clearSelectedTransaction}
          fetchTransactions={fetchTransactions}
          selectedTransaction={selectedTransaction}
        />
      </TransactionModal>
    </div>
  );
};

export default Transaction;
