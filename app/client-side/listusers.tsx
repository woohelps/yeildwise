"use client";

import { gql } from "@apollo/client";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import React from "react";

const query = gql`
  query getDividend {
    stocks_dividendCollection(
      filter: { ex_dividend_date: { gt: "2023-10-26", lt: "2023-11-01" } }
    ) {
      edges {
        node {
          cash_amount
          ex_dividend_date
          is_estimate
          payout_date
          record_date
        }
      }
    }
  }
`;

export default function ListUsers() {
  const { data, error } = useSuspenseQuery(query);

  console.log(data);

  return (
    <main style={{ maxWidth: 1200, marginInline: "auto", padding: 20 }}></main>
  );
}
