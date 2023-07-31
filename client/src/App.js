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
import Sidebar from "./components/sidebar";
import Home from "./pages/Home";
import UserSearch from "./components/UserSearch";
import FriendRequests from "./components/FriendRequests";
// import AddAvatar from "./components/addAvatar";
// import AvatarGenerator from "./components/AvatarGenerator";

const httpLink = createHttpLink({
  uri: "http://localhost:3001/graphql",
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
        <Toolbar />
        <Routes>
          <Route
            path="/"
            element={
              <div id="homeSidebarContainer">
                <Home />
                <Sidebar />
              </div>
            }
          />
          <Route path="/search" element={<UserSearch />} />
          <Route path="/friend-requests" element={<FriendRequests />} />
          {/* <Route path="/avatar-generator" element={<AvatarGenerator />} /> */}
        </Routes>
      </Router>
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
