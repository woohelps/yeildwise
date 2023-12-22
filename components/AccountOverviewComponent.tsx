"use client";

import { createSupabaseBrowserClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

type Props = {};

const AccountOverviewComponent = (props: Props) => {
  const [accountAsset, setAccountAsset] = useState<any[] | null>(null);
  const supabaseBrowserClient = createSupabaseBrowserClient();

  useEffect(() => {
    const getAccountAsset = async () => {
      const { data } = await supabaseBrowserClient
        .from("stocks_view_summary_overview")
        .select()
        .eq("account_id", 1);
      setAccountAsset(data);
    };
    getAccountAsset();
  }, []);

  return (
    <div>
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
            accountAsset.map((item) => (
              <tr key={`accountAsset-${item.id}`}>
                <td>{item.initial_funds}</td>
                <td>{item.invested_funds}</td>
                <td>{item.total_dividends.toFixed(2)}</td>
                <td>{item.total_dividends}</td>
                <td>{item.total_fees}</td>
                <td>{item.remaining_cash}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default AccountOverviewComponent;
