const StrategySection = async () => {
  return (
    <section className="p-8 bg-white shadow-md rounded-md max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Investment Strategy</h2>

      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Asset Selection:</h3>
        <ul className="list-disc pl-5">
          <li>
            Target stocks and ETFs with an annualized dividend yield above 6%.
          </li>
          <li>
            Prefer assets with lower 52-week volatility for reduced overall
            risk.
          </li>
          <li>Ensure moderate average trading volume for liquidity.</li>
          <li>
            Focus on mid-to-large market cap assets to further minimize risk.
          </li>
        </ul>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Capital Allocation:</h3>
        <ul className="list-disc pl-5">
          <li>Divide the investment capital into 50 equal parts.</li>
          <li>Each trade should utilize nearly one of these parts.</li>
        </ul>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Buying Strategy:</h3>
        <ul className="list-disc pl-5">
          <li>Buy before the ex-dividend date.</li>
          <li>
            Consider buying when a stock's decline exceeds its last dividend
            yield.
          </li>
          <li>
            In the future, factor in technical indicators like RSI and MACD.
          </li>
        </ul>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Selling Strategy:</h3>
        <ul className="list-disc pl-5">
          <li>
            Sell an asset when you've bought it three times, the first purchase
            current market price exceeds the buying price.
          </li>
          <li>
            Set a stop-loss: Sell after three purchases of a stock if its
            cumulative decline exceeds 30% to safeguard capital.
          </li>
        </ul>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">
          Additional Considerations:
        </h3>
        <ul className="list-disc pl-5">
          <li>
            Opt for cash-like ETFs with volatility below 0.5% and periodically
            invest unallocated funds in these ETFs.
          </li>
        </ul>
      </div>
    </section>
  );
};

export default StrategySection;
