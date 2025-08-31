import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import UserList from "./components/UserList";
import PostList from "./components/PostList";

function App() {
  return (
    <Router>
      <Header />
      <main style={{ padding: "1rem" }}>
        <Routes>
          <Route path="/" element={<Navigate to="/users" />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/posts" element={<PostList />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
