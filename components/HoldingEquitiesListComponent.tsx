"use client";

import { toLocalTime } from "@/utils/function";
import { createSupabaseBrowserClient } from "@/utils/supabase/client";
import React from "react";
import { useEffect, useState } from "react";

function HoldingEquitiesListComponent() {
  const [holdingEquities, setHoldingEquities] = useState<any[] | null>(null);
  const supabaseBrowserClient = createSupabaseBrowserClient();

  let totalHoldingEquitiesDividend = 0;
  let totalHoldingEquitiesReturn = 0;
  let totalMarketValue = 0;

  useEffect(() => {
    const getHoldingEquities = async () => {
      const { data } = await supabaseBrowserClient
        .from("stocks_view_holding_overview")
        .select()
        .eq("account_id", 1)
        .order("yield", { ascending: true });

      setHoldingEquities(data);
    };
    getHoldingEquities();
  }, []);

  const getMatchedTransactions = async (stockId, index) => {
    if (!holdingEquities[index].showMatchedTransactions) {
      const { data } = await supabaseBrowserClient
        .from("stocks_matchedtransaction")
        .select("*")
        .eq("stock_id", stockId);

      setHoldingEquities((current) => {
        const newEquities = [...current];
        newEquities[index].matchedTransactions = data;
        newEquities[index].showMatchedTransactions = true; // 设置显示标志
        return newEquities;
      });
    } else {
      setHoldingEquities((current) => {
        const newEquities = [...current];
        newEquities[index].showMatchedTransactions = false; // 取消显示标志
        return newEquities;
      });
    }
  };

  if (holdingEquities == null) return;

  holdingEquities.forEach((item) => {
    totalHoldingEquitiesDividend += item.dividend || 0;
    totalHoldingEquitiesReturn += item.unrealized_pnl || 0;
    totalMarketValue += item.market_value || 0;
  });

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Holding Equities List</h3>
      <table className="table table-pin-rows mb-12">
        <thead>
          <tr>
            <th className="text-center">Symbol</th>
            <th className="text-center">Quantity</th>
            <th className="text-center">
              Market
              <br /> Value
            </th>
            <th className="text-center">
              Market
              <br /> Price
            </th>
            <th className="text-center">
              Average
              <br /> Cost
            </th>
            <th className="text-center">
              Net <br />
              Average
              <br /> Cost
            </th>
            <th className="text-center">
              Year
              <br />
              Yield
            </th>
            <th className="text-center">
              Next
              <br /> Payable
              <br /> Date
            </th>
            <th className="text-center">Dividend</th>
            <th className="text-center">Fee</th>
            <th className="text-center">
              Unrealized
              <br /> P/L
            </th>
          </tr>
        </thead>
        <tbody>
          {holdingEquities.map((item, index) => {
            const mainRowKey = `holding-${item.Symbol}-${index}`;

            return (
              <React.Fragment key={mainRowKey}>
                <tr>
                  <td className="text-center">{item.symbol}</td>
                  <td className="text-center">{item.quantity}</td>
                  <td className="text-center">{item.market_value}</td>
                  <td className="text-center">{item.current_price}</td>
                  <td className="text-center">{item.cost}</td>
                  <td className="text-center">{item.net_cost}</td>
                  <td className="text-center">
                    {(item.yield * 100).toFixed(2)}%
                  </td>
                  <th className="text-center">{item.next_payout_date}</th>
                  <td className="text-center">{item.dividend}</td>
                  <td className="text-center">{item.fee}</td>
                  <td className="text-center">
                    {item.unrealized_pnl.toFixed(2)}
                  </td>
                  <td className="text-center">
                    <button
                      onClick={() =>
                        getMatchedTransactions(item.equity_id, index)
                      }
                    >
                      {item.showMatchedTransactions ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6 text-blue-500"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6 text-blue-500"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4.5 15.75l7.5-7.5 7.5 7.5"
                          />
                        </svg>
                      )}
                    </button>
                  </td>
                </tr>
                {item.showMatchedTransactions && item.matchedTransactions && (
                  <tr>
                    <td colSpan={11}>
                      <table>
                        <thead>
                          <tr>
                            <th>Buy Time</th>
                            <th>Buy Price</th>
                            <th>Buy Shares</th>
                            <th>Buy Amount</th>
                            <th>Sell Time</th>
                            <th>Sell Price</th>
                            <th>Sell Shares</th>
                            <th>Sell Amount</th>
                            <th>Return</th>
                            <th>Return Rate</th>
                          </tr>
                        </thead>
                        <tbody>
                          {item.matchedTransactions.map((transaction) => (
                            <tr key={`matchedTransactions-${transaction.id}`}>
                              <td>{toLocalTime(transaction.buy_time)}</td>
                              <td>{transaction.buy_price}</td>
                              <td>{transaction.buy_shares}</td>
                              <td>{transaction.buy_amount}</td>
                              <td>
                                {transaction.sell_time
                                  ? toLocalTime(transaction.sell_time)
                                  : ""}
                              </td>
                              <td>{transaction.sell_price}</td>
                              <td>{transaction.sell_shares}</td>
                              <td>{transaction.sell_amount}</td>
                              <td>
                                {transaction.sell_amount > 0
                                  ? (
                                      transaction.sell_amount -
                                      transaction.buy_amount
                                    ).toFixed(2)
                                  : ""}
                              </td>
                              <td>
                                {transaction.sell_amount > 0
                                  ? (
                                      ((transaction.sell_amount -
                                        transaction.buy_amount) /
                                        transaction.buy_amount) *
                                      100
                                    ).toFixed(2) + "%"
                                  : ""}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <th scope="row" colSpan={10} className="text-right">
              Total Dividend
            </th>
            <td className="text-right">
              {totalHoldingEquitiesDividend.toFixed(2)}
            </td>
          </tr>
          <tr>
            <th scope="row" colSpan={10} className="text-right">
              Total Market Value
            </th>
            <td className="text-right">{totalMarketValue.toFixed(2)}</td>
          </tr>
          <tr>
            <th scope="row" colSpan={10} className="text-right">
              Total Return
            </th>
            <td className="text-right">
              {totalHoldingEquitiesReturn.toFixed(2)}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default HoldingEquitiesListComponent;
