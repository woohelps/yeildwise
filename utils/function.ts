const apiKey = "0uQ5fRYSzqA2AuZi8SxBtCjgwhPlzmS3";

interface YahooFinanceResponse {
  optionChain: {
    result: Array<{
      quote: {
        regularMarketPrice: number;
      };
    }>;
  };
}

export const getCurrentPrice = async (
  symbol: string
): Promise<number | null> => {
  // 构建API请求URL
  const apiUrl = `https://financialmodelingprep.com/api/v3/quote-short/${symbol}?apikey=${apiKey}`;

  try {
    const response = await fetch(apiUrl);
    if (response.ok) {
      const data = await response.json();
      if (data.length > 0) {
        return data[0].price;
      }
    }
    throw new Error(`Failed to fetch data for ${symbol}`);
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getCurrentPriceYahoo = async (
  fullSymbol: string
): Promise<number | null> => {
  try {
    const response = await fetch(`/api/yahooFinance?symbol=${fullSymbol}`);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const jsonResponse: YahooFinanceResponse = await response.json();
    const result = jsonResponse.optionChain.result;

    if (
      result.length === 0 ||
      !result[0].quote ||
      !result[0].quote.regularMarketPrice
    ) {
      console.error(`No quote information found for ${fullSymbol}`);
      return null;
    }

    return result[0].quote.regularMarketPrice;
  } catch (error) {
    console.error("Error fetching the current price:", error);
    return null;
  }
};

export const toLocalTime = (isoString: string): string => {
  const date = new Date(isoString);
  const localTime = date.toLocaleString(); // 默认为运行代码时的本地环境设置
  return localTime;
};

export function toLocalISOTime(utcDateString: string): string {
  const date = new Date(utcDateString);
  const timeZoneOffset = new Date().getTimezoneOffset() * 60000;
  const localISOTime = new Date(date.getTime() - timeZoneOffset)
    .toISOString()
    .slice(0, -1);
  return localISOTime.substring(0, 16); // 返回 "YYYY-MM-DDThh:mm" 格式的字符串
}
