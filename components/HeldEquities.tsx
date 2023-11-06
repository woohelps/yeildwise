"use client";

import { createSupabaseBrowserClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

export default function HeldEquities() {
  const [holdingEquities, setHoldingEquities] = useState<any[] | null>(null);
  const [clearedEquities, setClearedEquities] = useState<any[] | null>(null);
  const [accountAsset, setAccountAsset] = useState<any[] | null>(null);
  const supabaseBrowserClient = createSupabaseBrowserClient();

  const [totalMarketValue, setTotalMarketValue] = useState(0);

  let totalClearedEquitiesDividend = 0;
  let totalClearedEquitiesReturn = 0;
  let totalHoldingEquitiesDividend = 0;
  let totalHoldingEquitiesReturn = 0;

  useEffect(() => {
    if (holdingEquities) {
      let newTotalMarketValue = 0;

      holdingEquities.forEach((item) => {
        newTotalMarketValue += item.MarketValue || 0;
      });

      setTotalMarketValue(newTotalMarketValue);
    }
  }, [holdingEquities]);

  useEffect(() => {
    const getAccountAsset = async () => {
      const { data } = await supabaseBrowserClient
        .from("account_summary_overview")
        .select()
        .eq("account_id", 1);
      setAccountAsset(data);
    };
    getAccountAsset();
  }, []);

  useEffect(() => {
    const getHoldingEquities = async () => {
      const { data } = await supabaseBrowserClient
        .from("holding_overview")
        .select()
        .eq("AccountId", 1)
        .order("Yeild", { ascending: true });

      setHoldingEquities(data);
    };
    getHoldingEquities();
  }, []);

  useEffect(() => {
    const getClearedEquities = async () => {
      const { data } = await supabaseBrowserClient
        .from("cleared_position_overview")
        .select()
        .eq("AccountId", 1);
      setClearedEquities(data);
    };
    getClearedEquities();
  }, []);

  if (holdingEquities == null) return;

  return (
    <div className="overflow-x-auto w-full p-8">
      <h3 className="text-xl font-semibold mb-4">Account Overview</h3>
      <table className="table table-pin-rows mb-12">
        <thead>
          <tr>
            <th>Initial Funds</th>
            <th>Invested Funds</th>
            <th>Total Market Value</th>
            <th>Total Dividends</th>
            <th>Total Fees</th>
            <th>Remaining Cash</th>
          </tr>
        </thead>
        <tbody>
          {accountAsset &&
            accountAsset.map((item) => {
              return (
                <tr key={`accountAsset-${item.id}`}>
                  <td>{item.InitialFunds}</td>
                  <td>{item.InvestedFunds}</td>
                  <td>{totalMarketValue.toFixed(2)}</td>
                  <td>{item.TotalDividends}</td>
                  <td>{item.TotalFees}</td>
                  <td>{item.RemainingCash}</td>
                </tr>
              );
            })}
        </tbody>
      </table>

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
              Yeild
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
          {holdingEquities.map((item) => {
            totalHoldingEquitiesDividend += item.Dividend;
            totalHoldingEquitiesReturn += item.UnrealizedPnL;
            return (
              <tr key={`holding-${item.Symbol}`}>
                <td className="text-center">{item.Symbol}</td>
                <td className="text-center">{item.Quantity}</td>
                <td className="text-center">{item.MarketValue}</td>
                <td className="text-center">{item.CurrentPrice}</td>
                <td className="text-center">{item.Cost}</td>
                <td className="text-center">{item.NetCost}</td>
                <td className="text-center">
                  {(item.Yeild * 100).toFixed(2)}%
                </td>
                <th className="text-center">{item.NextPayoutDate}</th>
                <td className="text-center">{item.Dividend}</td>
                <td className="text-center">{item.Fee}</td>
                <td className="text-center">{item.UnrealizedPnL}</td>
              </tr>
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

      <h3 className="text-xl font-semibold my-4">Cleared Equities List</h3>
      <table className="table table-pin-rows mb-12">
        <thead>
          <tr>
            <th className="text-center">Symbol</th>
            <th className="text-center">Profit/Lost</th>
            <th className="text-center">Dividend</th>
            <th className="text-center">Fee</th>
            <th className="text-center">Return</th>
          </tr>
        </thead>
        <tbody>
          {clearedEquities &&
            clearedEquities.map((item) => {
              totalClearedEquitiesDividend += item.Dividend;
              totalClearedEquitiesReturn += item.Return;
              return (
                <tr key={`clearedEquities-${item.Symbol}`}>
                  <td className="text-center">{item.Symbol}</td>
                  <td className="text-center">{item.PNL}</td>
                  <td className="text-center">{item.Dividend}</td>
                  <td className="text-center">{item.Fee}</td>
                  <td className="text-center">{item.Return}</td>
                </tr>
              );
            })}
        </tbody>
        <tfoot>
          <tr>
            <th scope="row" colSpan={4} className="text-right">
              Total Dividend
            </th>
            <td className="text-right">
              {totalClearedEquitiesDividend.toFixed(2)}
            </td>
          </tr>
          <tr>
            <th scope="row" colSpan={4} className="text-right">
              Total Return
            </th>
            <td className="text-right">
              {totalClearedEquitiesReturn.toFixed(2)}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
