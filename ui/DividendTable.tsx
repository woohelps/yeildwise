import { createSupabaseServerClient } from "@/utils/supabase/server";
import RealTimePriceComponent from "@/components/RealtimePrice";
import RealTimeYeildComponent from "@/components/RealtimeYeild";

const DividendTable = async () => {
  const supabase = createSupabaseServerClient();

  const FREQUENCY_CHOICES: { [key: number]: string } = {
    1: "Annual",
    12: "Month",
    4: "Quarter",
    2: "Semi-Annual",
  };

  const today = new Date();

  const sevenDaysLater = new Date();
  sevenDaysLater.setDate(today.getDate() + 14);
  const todayString = today.toLocaleDateString();
  const sevenDaysLaterString = sevenDaysLater.toLocaleDateString(); // 获取七天后的日期的ISO字符串，例如："2023-11-02"

  const { data } = await supabase
    .from("stocks_dividend")
    .select(`*, stocks_equity!inner(*, stocks_volatility!inner(*))`)
    .gt("ex_dividend_date", todayString)
    // .gt("ex_dividend_date", "2023-10-23")
    .lte("ex_dividend_date", sevenDaysLaterString)
    .gt("stocks_equity.stocks_volatility.year_yld:", 0.06)
    .gt("stocks_equity.stocks_volatility.current_price", 0)
    .order("ex_dividend_date", { ascending: true });

  if (data == null) return;

  return (
    <view>
      <div className="animate-in flex-1 flex flex-col gap-20 opacity-0 max-w-6xl px-3 mb-4">
        <main className="flex-1 flex flex-col gap-6">
          <h2 className="font-bold text-3xl">
            Canadian Financial Market High Dividend Yield Stocks/ETFs{" "}
          </h2>
          <div>
            {todayString} - {sevenDaysLaterString}
          </div>
        </main>
      </div>

      <div className="overflow-x-auto w-full">
        <table className="table table-pin-rows">
          {/* head */}
          <thead>
            <tr>
              <th className="text-center">Symbol</th>
              <th className="text-center">Price</th>
              <th className="text-center">Ex-Dividend Date</th>
              <th className="text-center">Record Date</th>
              <th className="text-center">Payout Date</th>
              <th className="text-center">Cash Amount</th>
              <th className="text-center">Year Yeild</th>
              <th className="text-center">Frequency</th>
              <th className="text-center">200 Average</th>
              <th className="text-center">52 Week Volatility</th>
              <th className="text-center">Average Volumn</th>
              <th className="text-center">Type</th>
              <th className="text-center"></th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td
                  className="text-center tooltip tooltip-right"
                  data-tip={item.stocks_equity.name}
                >
                  {item.stocks_equity.symbol}
                </td>
                <td className="text-center">
                  {/* ${item.stocks_equity.stocks_volatility.current_price} */}
                  <RealTimePriceComponent
                    fullSymbol={item.stocks_equity.full_symbol}
                  />
                </td>
                <td className="text-center">{item.ex_dividend_date}</td>
                <td className="text-center">{item.record_date || "N/A"}</td>
                <td className="text-center">{item.payout_date || "N/A"}</td>
                <td className="text-center">${item.cash_amount}</td>
                <td className="text-center">
                  <RealTimeYeildComponent
                    fullSymbol={item.stocks_equity.full_symbol}
                    dividendFrequency={item.stocks_equity.dividend_frequency}
                    cashAmount={item.cash_amount}
                  />
                  <span className="badge badge-ghost badge-sm">
                    $
                    {(
                      item.stocks_equity.stocks_volatility.year_yld * 100
                    ).toFixed(2)}
                    %
                  </span>
                </td>
                <td className="text-center">
                  {FREQUENCY_CHOICES[item.stocks_equity.dividend_frequency]}
                </td>
                <td className="text-center">
                  $
                  {item.stocks_equity.stocks_volatility.two_hundred_day_average}
                </td>
                <td className="text-center">
                  {(
                    ((item.stocks_equity.stocks_volatility.fifty_two_week_high -
                      item.stocks_equity.stocks_volatility.fifty_two_week_low) /
                      item.stocks_equity.stocks_volatility
                        .fifty_two_week_high) *
                    100
                  ).toFixed(2) + "%"}
                  <br />
                  <span className="badge badge-ghost badge-sm">
                    ${item.stocks_equity.stocks_volatility.fifty_two_week_low} -{" "}
                    ${item.stocks_equity.stocks_volatility.fifty_two_week_high}
                  </span>
                </td>
                <td className="text-center">
                  {item.stocks_equity.stocks_volatility.average_volume}
                </td>
                <td className="text-center">
                  {item.stocks_equity.stocks_volatility.sector}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </view>
  );
};

export default DividendTable;
