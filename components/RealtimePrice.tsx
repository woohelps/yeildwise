"use client";

import React, { useState, useEffect } from "react";
import { getCurrentPrice } from "@/utils/function";

interface RealTimePriceComponentProps {
  fullSymbol: string;
}

const RealTimePriceComponent: React.FC<RealTimePriceComponentProps> = ({
  fullSymbol,
}) => {
  const [price, setPrice] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPrice = async () => {
      setLoading(true);
      try {
        const currentPrice = await getCurrentPrice(fullSymbol);
        setPrice(currentPrice);
      } catch (err) {
        setError("Could not fetch price");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPrice();
  }, [fullSymbol]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return <div>${price?.toFixed(2) || "N/A"}</div>;
};

export default RealTimePriceComponent;
