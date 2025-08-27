import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const client = new ApolloClient({
  link: new HttpLink({
    uri: "https://graphql-api-brown.vercel.app/api/graphql",
  }),
  cache: new InMemoryCache(),
});

export default client;
