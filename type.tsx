export type TransactionType = {
  [key: number]: string;
};

export interface Transaction {
  id: string;
  datetime: string;
  count_id: number;
  amount: number;
  price_per_share: number;
  quantity: number;
  charge_amount: number;
  stock_id: number;
  type: number;
  stocks_equity?: { full_symbol: string };
}

export type Transactions = Transaction[] | null;
