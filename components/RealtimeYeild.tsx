"use client";

import React, { useState, useEffect } from "react";
import { getCurrentPrice } from "@/utils/function";

interface RealTimeYeildComponentProps {
  fullSymbol: string;
  dividendFrequency: number;
  cashAmount: number;
}

const RealTimeYeildComponent: React.FC<RealTimeYeildComponentProps> = ({
  fullSymbol,
  dividendFrequency,
  cashAmount,
}) => {
  const [yeild, setYeild] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchPrice = async () => {
      setLoading(true);
      try {
        const currentPrice = await getCurrentPrice(fullSymbol);
        setYeild(
          currentPrice
            ? ((dividendFrequency * cashAmount) / currentPrice) * 100
            : 0
        );
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPrice();
  }, [fullSymbol]);

  if (loading) return <div>Loading...</div>;

  return <div>${`${yeild?.toFixed(2)}%` || "N/A"}</div>;
};

export default RealTimeYeildComponent;
