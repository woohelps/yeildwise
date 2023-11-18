import { NextRequest } from "next/server";
import Cache from "node-cache";

// 定义缓存
const cache = new Cache({ stdTTL: 900 }); // 缓存时间设为 15 分钟 (900 秒)

export async function GET(req: NextRequest) {
  const symbol = req.nextUrl.searchParams.get("symbol");

  if (!symbol) {
    return new Response("Symbol query parameter is required", { status: 400 });
  }

  // 检查缓存
  const cachedData = cache.get(symbol);
  if (cachedData) {
    return new Response(JSON.stringify(cachedData), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  // 如果缓存中没有数据，则从 Yahoo Finance 获取
  const apiUrl = `https://query2.finance.yahoo.com/v7/finance/options/${symbol}`;
  try {
    const response = await fetch(apiUrl, {
      headers: { "User-Agent": "..." },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();
    cache.set(symbol, data); // 缓存数据
    return new Response(JSON.stringify(data), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching data from Yahoo Finance:", error);
    return new Response(JSON.stringify({ error: "Error fetching data" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
