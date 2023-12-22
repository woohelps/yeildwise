"use client";

import React, { useState, useEffect } from "react";
import { createSupabaseBrowserClient } from "@/utils/supabase/client";
import DividendTable from "@/ui/DividendTable";
import { EQUITY_TYPES, FREQUENCY_CHOICES } from "@/constants";

const DividendTableClient = () => {
  const today = new Date();
  const sevenDaysLater = new Date(today);
  sevenDaysLater.setDate(today.getDate() + 7);

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString("en-CA");
  };

  const todayString = formatDate(today);
  const sevenDaysLaterString = formatDate(sevenDaysLater);

  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [yieldRange, setYieldRange] = useState({ min: 0.06, max: 1 });
  const [exDivDateRange, setExDivDateRange] = useState({
    start: todayString,
    end: sevenDaysLaterString,
  });
  const [frequency, setFrequency] = useState(0);
  const [volatilityRange, setVolatilityRange] = useState({ min: 0.1, max: 60 });
  const [type, setType] = useState("");

  const supabase = createSupabaseBrowserClient();

  const fetchData = async () => {
    setLoading(true);

    // 转换分红频率为整数
    const frequencyInt = FREQUENCY_CHOICES[frequency] || null;

    try {
      // 使用 Supabase 的 RPC 功能调用数据库函数
      const { data, error } = await supabase.rpc("search_dividends", {
        p_search_term: searchTerm || null,
        p_start_date: exDivDateRange.start,
        p_end_date: exDivDateRange.end,
        p_yield_min: yieldRange.min || null,
        p_yield_max: yieldRange.max || null,
        p_frequency: frequencyInt,
        p_volatility_min: volatilityRange.min || null,
        p_volatility_max: volatilityRange.max || null,
        p_type: type || null,
      });

      if (error) throw error;

      setData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="mb-5 space-y-3">
        {/* 搜索输入框 */}
        <label
          htmlFor="searchInput"
          className="block text-sm font-medium text-gray-700"
        >
          Search (Name or Symbol)
        </label>
        <input
          type="text"
          placeholder="Search by name or symbol"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border rounded-md"
        />

        {/* 年化收益率范围输入框 */}

        <div className="flex space-x-3">
          <label
            htmlFor="minYield"
            className="block text-sm font-medium text-gray-700"
          >
            最小年化收益率 (%)
          </label>
          <input
            type="number"
            placeholder="Min yield (%)"
            value={yieldRange.min}
            onChange={(e) =>
              setYieldRange({ ...yieldRange, min: Number(e.target.value) || 0 })
            }
            className="w-full px-4 py-2 border rounded-md"
          />
          <label
            htmlFor="maxYield"
            className="block text-sm font-medium text-gray-700"
          >
            最大年化收益率 (%)
          </label>
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
          <label
            htmlFor="exDividendStartDate"
            className="block text-sm font-medium text-gray-700"
          >
            Ex-Dividend Start Date
          </label>
          <input
            type="date"
            value={exDivDateRange.start}
            onChange={(e) =>
              setExDivDateRange({ ...exDivDateRange, start: e.target.value })
            }
            className="w-full px-4 py-2 border rounded-md"
          />
          <label
            htmlFor="exDividendEndDate"
            className="block text-sm font-medium text-gray-700"
          >
            Ex-Dividend End Date
          </label>
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
        <label
          htmlFor="dividendFrequency"
          className="block text-sm font-medium text-gray-700"
        >
          分红频率
        </label>
        <select
          value={frequency}
          onChange={(e) => setFrequency(e.target.value)}
          className="w-full px-4 py-2 border rounded-md"
        >
          {Object.entries(FREQUENCY_CHOICES).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>

        {/* 52周波动率范围输入框 */}
        <div className="flex space-x-3">
          <label
            htmlFor="dividendFrequency"
            className="block text-sm font-medium text-gray-700"
          >
            最小波动率
          </label>
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
          <label
            htmlFor="dividendFrequency"
            className="block text-sm font-medium text-gray-700"
          >
            最大波动率
          </label>
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
        <label
          htmlFor="stockType"
          className="block text-sm font-medium text-gray-700"
        >
          股票类型
        </label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full px-4 py-2 border rounded-md"
        >
          {EQUITY_TYPES.map((sector, index) => (
            <option key={index} value={sector}>
              {sector}
            </option>
          ))}
        </select>

        {/* 搜索按钮 */}
        <button
          onClick={fetchData}
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
