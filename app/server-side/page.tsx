import { getClient } from "@/lib/client";
import { gql } from "@apollo/client";
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

export default async function ServerSide() {
  const data = await getClient().query({
    query,
  });

  console.log(data);

  return (
    <main style={{ maxWidth: 1200, marginInline: "auto", padding: 20 }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr 1fr",
          gap: 20,
        }}
      >
        {/* {data.data.users.map((user) => (
          <div
            key={user.id}
            style={{ border: "1px solid #ccc", textAlign: "center" }}
          >
            <img
              src={`https://robohash.org/${user.id}?set=set2&size=180x180`}
              alt={user.name}
              style={{ height: 180, width: 180 }}
            />
            <h3>{user.name}</h3>
          </div>
        ))} */}
      </div>
    </main>
  );
}
