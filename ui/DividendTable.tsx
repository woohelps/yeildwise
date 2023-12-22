import RealTimePriceComponent from "@/components/RealtimePrice";
import RealTimeYeildComponent from "@/components/RealtimeYeild";
import { FREQUENCY_CHOICES } from "@/constants";

interface DividendTableProps {
  todayString: string;
  sevenDaysLaterString: string;
  data: any[];
}

const DividendTable: React.FC<DividendTableProps> = ({
  todayString,
  sevenDaysLaterString,
  data,
}) => {
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
          <thead>
            <tr>
              <th className="text-center">Symbol</th>
              <th className="text-center">Price</th>
              <th className="text-center">Ex-Dividend Date</th>
              <th className="text-center">Estimate</th>
              <th className="text-center">Record Date</th>
              <th className="text-center">Payout Date</th>
              <th className="text-center">Cash Amount</th>
              <th className="text-center">Year Yield</th>
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
                  data-tip={item.name}
                >
                  {item.symbol}
                </td>
                <td className="text-center">
                  {item.current_price}
                  {/* <RealTimePriceComponent fullSymbol={item.full_symbol} /> */}
                </td>
                <td className="text-center">{item.ex_dividend_date}</td>
                <td className="text-center">
                  {item.is_estimate === true ? "True" : "False"}
                </td>
                <td className="text-center">{item.record_date || "N/A"}</td>
                <td className="text-center">{item.payout_date || "N/A"}</td>
                <td className="text-center">${item.cash_amount}</td>
                <td className="text-center">
                  {/* <RealTimeYeildComponent
                    fullSymbol={item.full_symbol}
                    dividendFrequency={item.dividend_frequency}
                    cashAmount={item.cash_amount}
                  /> */}
                  <span className="badge badge-ghost badge-sm">
                    ${(item.year_yld * 100).toFixed(2)}%
                  </span>
                </td>
                <td className="text-center">
                  {FREQUENCY_CHOICES[item.dividend_frequency]}
                </td>
                <td className="text-center">${item.two_hundred_day_average}</td>
                <td className="text-center">
                  {item.two_hundred_volatility + "%"}
                  <br />
                  <span className="badge badge-ghost badge-sm">
                    ${item.fifty_two_week_low} - ${item.fifty_two_week_high}
                  </span>
                </td>
                <td className="text-center">{item.average_volume}</td>
                <td className="text-center">{item.sector}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </view>
  );
};

export default DividendTable;
