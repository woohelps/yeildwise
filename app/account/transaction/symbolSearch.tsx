import React, { useCallback, useEffect, useState } from "react";
import debounce from "lodash.debounce";
import {
  useFormContext,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
  FieldValues,
} from "react-hook-form";
import { createSupabaseBrowserClient } from "@/utils/supabase/client";

interface SymbolSearchProps {
  register: UseFormRegister<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
  watch: UseFormWatch<FieldValues>;
  stockId?: number;
}

interface StockSymbol {
  id: string; // 根据你的实际数据类型来调整
  symbol: string;
}

const SymbolSearch: React.FC<SymbolSearchProps> = ({
  register,
  setValue,
  watch,
  stockId,
}) => {
  const [stockSymbols, setStockSymbols] = useState<StockSymbol[]>([]);
  const [selectedSymbol, setSelectedSymbol] = useState("");
  const supabaseBrowserClient = createSupabaseBrowserClient();

  const fetchSymbols = useCallback(
    debounce(async (searchText: string) => {
      if (!searchText || searchText.length < 2) {
        setStockSymbols([]);
        return;
      }

      const { data, error } = await supabaseBrowserClient
        .from("stocks_equity")
        .select("id, symbol")
        .ilike("symbol", `%${searchText}%`);

      if (error) {
        console.error("Error fetching symbols:", error);
      } else {
        setStockSymbols(data || []);
      }
    }, 300),
    []
  );

  const symbolInputValue = watch("symbolInput");

  useEffect(() => {
    fetchSymbols(symbolInputValue);
  }, [symbolInputValue, fetchSymbols]);

  useEffect(() => {
    if (stockId) {
      const fetchSymbol = async () => {
        const { data, error } = await supabaseBrowserClient
          .from("stocks_equity")
          .select("symbol")
          .eq("id", stockId)
          .single();

        if (error) {
          console.error("Error fetching the symbol:", error);
        } else if (data) {
          setSelectedSymbol(data.symbol);
        }
      };

      fetchSymbol();
    }
  }, [stockId]);

  const handleSymbolSelect = (symbolId: string, symbol: string) => {
    setValue("stock_id", symbolId); // Set the stock_id in the form
    setSelectedSymbol(symbol); // Update the selected symbol state
    setStockSymbols([]); // Clear the suggestions
  };

  return (
    <div className="mb-4">
      <label
        className="block text-grey-darker text-sm mb-2"
        htmlFor="symbolInput"
      >
        Symbol
      </label>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
        type="text"
        id="symbolInput"
        {...register("symbolInput")}
        placeholder="Type to search symbols"
        autoComplete="on"
        value={selectedSymbol}
        onChange={(e) => {
          setValue("symbolInput", e.target.value);
          setSelectedSymbol(e.target.value);
        }}
      />
      {stockSymbols.length > 0 && (
        <ul className="absolute z-10 list-none bg-white shadow-lg rounded mt-1 w-full overflow-auto max-h-60">
          {stockSymbols.map((symbol) => (
            <li
              key={symbol.id}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSymbolSelect(symbol.id, symbol.symbol)}
            >
              {symbol.symbol}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SymbolSearch;
