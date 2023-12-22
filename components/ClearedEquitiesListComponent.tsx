"use client";

import { createSupabaseBrowserClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

type Props = {};

function ClearedEquitiesListComponent(props: Props) {
  const supabaseBrowserClient = createSupabaseBrowserClient();

  const [clearedEquities, setClearedEquities] = useState<any[] | null>(null);

  useEffect(() => {
    const getClearedEquities = async () => {
      const { data } = await supabaseBrowserClient
        .from("stocks_view_cleared_position_overview")
        .select()
        .eq("account_id", 1);
      setClearedEquities(data);
    };
    getClearedEquities();
  }, []);

  let totalClearedEquitiesDividend = 0;
  let totalClearedEquitiesReturn = 0;

  if (clearedEquities == null) return;

  clearedEquities.forEach((item) => {
    totalClearedEquitiesDividend += item.dividend || 0;
    totalClearedEquitiesReturn += item.return || 0;
  });

  return (
    <div>
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
              return (
                <tr key={`clearedEquities-${item.Symbol}`}>
                  <td className="text-center">{item.symbol}</td>
                  <td className="text-center">{item.pnl}</td>
                  <td className="text-center">{item.dividend}</td>
                  <td className="text-center">{item.fee}</td>
                  <td className="text-center">{item.return}</td>
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

export default ClearedEquitiesListComponent;
