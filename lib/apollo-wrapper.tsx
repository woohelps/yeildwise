"use client";

import {
  ApolloLink,
  createHttpLink,
  NormalizedCacheObject,
} from "@apollo/client";
import {
  ApolloNextAppProvider,
  NextSSRInMemoryCache,
  SSRMultipartLink,
  NextSSRApolloClient,
} from "@apollo/experimental-nextjs-app-support/ssr";
import { setContext } from "@apollo/client/link/context";

const authLink = setContext((_, { headers }) => {
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
    },
  };
});

const GRAPHQL_ENDPOINT = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/graphql/v1`;

const supabaseLink = createHttpLink({
  uri: GRAPHQL_ENDPOINT,
});

function makeClient(): NextSSRApolloClient<NormalizedCacheObject> {
  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache(),
    link:
      typeof window === "undefined"
        ? ApolloLink.from([
            new SSRMultipartLink({
              stripDefer: true,
            }),
            authLink.concat(supabaseLink),
          ])
        : authLink.concat(supabaseLink),
  });
}

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}
