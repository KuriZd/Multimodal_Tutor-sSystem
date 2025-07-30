import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./pages/dashboard";
import Register from "./pages/register";
import Crud from "./pages/crud";

// ✅ PrivateRoute actualizado
function PrivateRoute({ children }) {
  const user = localStorage.getItem("user");
  return user ? children : <Navigate to="/login" replace />;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/crud"
          element={
            <PrivateRoute>
              <Crud />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;



