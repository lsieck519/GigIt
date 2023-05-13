import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import Home from "./pages/Home";
import GigProfile from "./pages/GigProfile";
import Nav from "./components/Nav";

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
          {/* <GigProvider> */}
          <Nav />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/profile/:userId"
              element={<GigProfile />}
              getKey={(params) => params.userId}
            />
          </Routes>
          {/* </GigProvider> */}
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
