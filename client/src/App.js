import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Toolbar from "./components/toolbar";
import ProfilePics from "./components/sidePanel";
import Home from "./pages/Home";

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
      <div className="App">
        <Toolbar />
        <div style={{ display: "flex" }}>
          <Home />
          <ProfilePics />
        </div>
      </div>
    </ApolloProvider>
  );
}

{
  /* <ApolloProvider client={client}>
     <Router>
       <div className="App">
         <Routes>
           <div style={{ display: "flex" }}>
             <Route path="/" element={<Home />} />
             <Route path="/profile" element={<ProfilePics />} />
           </div>
         </Routes>
       </div>
     </Router>
   </ApolloProvider> */
}

export default App;
