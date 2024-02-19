import React, { useState } from "react";
import { ApolloProvider, ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import RestaurantList from "../components/restaurantList";
import { InputGroup, Input, InputGroupText } from "reactstrap";
import Cart from "@/components/cart";

const API_URL = process.env.STRAPI_URL || "http://localhost:1337";

const client = new ApolloClient({
  uri: `${API_URL}/graphql`,
  cache: new InMemoryCache(),
  defaultOptions: {
    mutate: {
      errorPolicy: "all",
    },
    query: {
      errorPolicy: "all",
    },
  },
});

export default function App({ Component, pageProps }) {
  const [query, setQuery] = useState("");

  return (
    <ApolloProvider client={client}>
      <div className="search">
        <h2>Local Restaurants</h2>
        <InputGroup>
          <InputGroupText addonType="append">Search</InputGroupText>
          <Input
            onChange={(e) => setQuery(e.target.value.toLocaleLowerCase())}
            value={query}
          />
        </InputGroup><br></br>
      </div>
      <RestaurantList search={query} />
      <Cart> </Cart>
    </ApolloProvider>
  );
};
