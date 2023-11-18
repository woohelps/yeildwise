import React from "react";
import { toLocalTime } from "@/utils/function";

import { TransactionType, Transaction } from "@/type";

export interface TransactionTableProps {
  transactions: Transaction[];
  transactionTypes: TransactionType;
  onEditClick: (transaction: Transaction) => void;
}

const TransactionTable: React.FC<TransactionTableProps> = ({
  transactions,
  transactionTypes,
  onEditClick,
}) => {
  return (
    <table className="table table-pin-rows mb-12">
      <thead>
        <tr>
          <th>Id</th>
          <th>Date</th>
          <th>Symbol</th>
          <th>Amount</th>
          <th>Type</th>
          <th>Price</th>
          <th>Shares</th>
          <th>Fee</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((item) => {
          return (
            <tr key={item.id}>
              <td
                onClick={() => onEditClick(item)}
                className="cursor-pointer underline text-blue-600"
              >
                {item.id}
              </td>
              <td>{toLocalTime(item.datetime)}</td>
              <td>{item.stocks_equity?.full_symbol ?? ""}</td>
              <td>{item.amount}</td>
              <td>{transactionTypes[item.type]}</td>
              <td>
                {item.price_per_share != null ? `$${item.price_per_share}` : ""}
              </td>
              <td>{item.quantity}</td>
              <td>
                {item.charge_amount && item.charge_amount > 0
                  ? item.charge_amount
                  : "N/A"}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default TransactionTable;
