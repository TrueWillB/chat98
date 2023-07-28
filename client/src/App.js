import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { setContext } from "@apollo/client/link/context";

import Home from "./pages/Home";
// import friendsList from "./components/friendsList";
// import login from "./components/login";
// import successLogin from "./components/successLogin";
// import users from "./components/users";
// import usersList from "./components/usersList";

function App() {
  return (
    // <ApolloProvider client={client}>
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/friends" element={<FriendsList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/successlogin" element={<SuccessLogin />} />
          <Route path="/users" element={<Users />} />
          <Route path="/userslist" element={<UsersList />} /> */}
        </Routes>
      </div>
    </Router>
    // </ApolloProvider>
  );
}

export default App;
