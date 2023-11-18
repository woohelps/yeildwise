"use client";

import React, { useState, useEffect } from "react";
import { createSupabaseBrowserClient } from "@/utils/supabase/client";
import DividendTable from "@/ui/DividendTable";

const DividendTableClient = () => {
  const today = new Date();
  const sevenDaysLater = new Date(today);
  sevenDaysLater.setDate(today.getDate() + 7);
  const todayString = today.toLocaleDateString();
  const sevenDaysLaterString = sevenDaysLater.toLocaleDateString();

  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [yieldRange, setYieldRange] = useState({ min: 0.06, max: 1 });
  const [exDivDateRange, setExDivDateRange] = useState({
    start: todayString,
    end: sevenDaysLaterString,
  });
  const [frequency, setFrequency] = useState("");
  const [volatilityRange, setVolatilityRange] = useState({ min: 0, max: 100 });
  const [type, setType] = useState("");

  useEffect(() => {
    const supabase = createSupabaseBrowserClient();

    let query = supabase
      .from("stocks_dividend")
      .select(`*, stocks_equity!inner(*, stocks_volatility!inner(*))`);

    // 根据过滤条件更新查询
    if (searchTerm) {
      query
        .ilike("stocks_equity.symbol", `%${searchTerm}%`)
        .or(`stocks_equity.name.ilike.%${searchTerm}%`);
    }
    if (yieldRange.min !== 0 || yieldRange.max !== 1) {
      query
        .gte("stocks_equity.stocks_volatility.year_yld", yieldRange.min)
        .lte("stocks_equity.stocks_volatility.year_yld", yieldRange.max);
    }
    if (exDivDateRange.start && exDivDateRange.end) {
      query
        .gte("ex_dividend_date", exDivDateRange.start)
        .lte("ex_dividend_date", exDivDateRange.end);
    }
    if (frequency) {
      query.eq("stocks_equity.dividend_frequency", frequency);
    }
    if (volatilityRange.min !== 0 || volatilityRange.max !== 100) {
      // 添加关于波动率的过滤逻辑
    }
    if (type) {
      query.eq("stocks_equity.type", type);
    }

    query.then(({ data, error }) => {
      if (!error && data) {
        setData(data);
      }
      setLoading(false);
    });
  }, [
    searchTerm,
    yieldRange,
    exDivDateRange,
    frequency,
    volatilityRange,
    type,
  ]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="mb-5 space-y-3">
        {/* 搜索输入框 */}
        <input
          type="text"
          placeholder="Search by name or symbol"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border rounded-md"
        />

        {/* 年化收益率范围输入框 */}
        <div className="flex space-x-3">
          <input
            type="number"
            placeholder="Min yield (%)"
            value={yieldRange.min}
            onChange={(e) =>
              setYieldRange({ ...yieldRange, min: Number(e.target.value) || 0 })
            }
            className="w-full px-4 py-2 border rounded-md"
          />
          <input
            type="number"
            placeholder="Max yield (%)"
            value={yieldRange.max}
            onChange={(e) =>
              setYieldRange({ ...yieldRange, max: Number(e.target.value) || 0 })
            }
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>

        {/* Ex-Dividend Date 范围选择器 */}
        <div className="flex space-x-3">
          <input
            type="date"
            value={exDivDateRange.start}
            onChange={(e) =>
              setExDivDateRange({ ...exDivDateRange, start: e.target.value })
            }
            className="w-full px-4 py-2 border rounded-md"
          />
          <input
            type="date"
            value={exDivDateRange.end}
            onChange={(e) =>
              setExDivDateRange({ ...exDivDateRange, end: e.target.value })
            }
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>

        {/* 分红频率选择器 */}
        <select
          value={frequency}
          onChange={(e) => setFrequency(e.target.value)}
          className="w-full px-4 py-2 border rounded-md"
        >
          {/* 分红频率选项 */}
        </select>

        {/* 52周波动率范围输入框 */}
        <div className="flex space-x-3">
          <input
            type="number"
            placeholder="Min volatility (%)"
            value={volatilityRange.min}
            onChange={(e) =>
              setVolatilityRange({
                ...volatilityRange,
                min: Number(e.target.value) || 0,
              })
            }
            className="w-full px-4 py-2 border rounded-md"
          />
          <input
            type="number"
            placeholder="Max volatility (%)"
            value={volatilityRange.max}
            onChange={(e) =>
              setVolatilityRange({
                ...volatilityRange,
                max: Number(e.target.value) || 0,
              })
            }
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>

        {/* 股票类型选择器 */}
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full px-4 py-2 border rounded-md"
        >
          {/* 股票类型选项 */}
        </select>

        {/* 搜索按钮 */}
        <button
          onClick={() => {
            /* 触发重新查询的逻辑 */
          }}
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Apply Filters
        </button>
      </div>

      {/* 表格渲染 */}
      <DividendTable
        todayString={exDivDateRange.start}
        sevenDaysLaterString={exDivDateRange.end}
        data={data}
      />
    </div>
  );
};

export default DividendTableClient;
