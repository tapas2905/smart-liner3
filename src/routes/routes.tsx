import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "../pages/auth/login/login";
import ProtectedRoute from "./protectedRoute";
import AuthRedirect from "./authRedirect";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import Home from "../pages/home/home";
import VerifyOtp from "../pages/auth/verify-otp/verifyOtp";

function AppRouter() {
  const isAuthenticated = useSelector(
    (state: RootState) => state.user.isAuthenticated
  );

  return (
    <Router>
      {isAuthenticated && (<nav
        style={{
          padding: "10px 20px",
          backgroundColor: "#f0f0f0",
          borderBottom: "1px solid #ddd",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <ul
          style={{ listStyle: "none", margin: 0, padding: 0, display: "flex" }}
        >
          <li style={{ marginRight: "20px" }}>
            <Link
              to="/"
              style={{
                textDecoration: "none",
                color: "#007bff",
                fontWeight: "bold",
              }}
            >
              Home
            </Link>
          </li>
              <li style={{ marginRight: "20px" }}>
                <Link
                  to="/profile"
                  style={{
                    textDecoration: "none",
                    color: "#007bff",
                    fontWeight: "bold",
                  }}
                >
                  Profile
                </Link>
              </li>
        </ul>
      </nav>
)}
      <Routes>
        <Route element={<AuthRedirect />}>
          <Route path="/login" element={<Login />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />
        </Route>

        {/* ProtectedRoute for routes that require authentication */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />
          <Route
            path="/dashboard"
            element={
              <div style={{ textAlign: "center", marginTop: "50px" }}>
                <h2>Dashboard (Protected)</h2>
                <p>Welcome to your private dashboard!</p>
              </div>
            }
          />
        </Route>

        {/* Catch-all for 404 Not Found */}
        <Route
          path="*"
          element={
            <div style={{ textAlign: "center", marginTop: "50px" }}>
              <h2>404 - Page Not Found</h2>
              <p>The page you are looking for does not exist.</p>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default AppRouter;
