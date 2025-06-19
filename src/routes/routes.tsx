import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../pages/auth/login/login";
import ProtectedRoute from "./protectedRoute";
import AuthRedirect from "./authRedirect";
import VerifyOtp from "../pages/auth/verify-otp/verifyOtp";
import AddProduct from "../pages/product/addProduct";
import ProductList from "../pages/product-list/productList";
import MyProfile from "../pages/my-profile/myProfile";

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route element={<AuthRedirect />}>
          <Route path="/login" element={<Login />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />
        </Route>

        {/* ProtectedRoute for routes that require authentication */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<ProductList />} />
          <Route path="/my-profile" element={<MyProfile />} />
          <Route path="/add-product" element={<AddProduct />} />
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
