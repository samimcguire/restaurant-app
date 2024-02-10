import React, { useState } from "react";
import { ApolloProvider,ApolloClient,HttpLink,InMemoryCache } from "@apollo/client";
import RestaurantList from "./restaurants/restaurantList";
import { InputGroup,InputGroupAddon,Input } from "reactstrap";

function Home() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337"
  console.log(`URL: ${API_URL}`)
  const [query, setQuery] = useState("");
  const link = new HttpLink({ uri: `${API_URL}/graphql`})
  const cache = new InMemoryCache()
  const client = new ApolloClient({link,cache});

  return (
    <ApolloProvider client={client}>
      <div className="search"/>
        <RestaurantList search={query} />
    </ApolloProvider>
  );
}

export default Home;