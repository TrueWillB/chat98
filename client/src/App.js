import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { setContext } from "@apollo/client/link/context";

import Home from "./pages/Home";
import FriendsList from "./components/FriendsList";
import Login from "./components/Login";
import SuccessLogin from "./components/SuccessLogin";
import Users from "./components/Users";
import UsersList from "./components/UsersList";

const httpLink = createHttpLink({
  uri: "/graphql",
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/friends" element={<FriendsList />} />
            <Route path="/login" element={<Login />} />
            <Route path="/successlogin" element={<SuccessLogin />} />
            <Route path="/users" element={<Users />} />
            <Route path="/userslist" element={<UsersList />} />
          </Routes>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
