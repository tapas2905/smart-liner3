import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setLogin } from "../../../store/userSlice";
import { AppDispatch } from "../../../store";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import alert from "../../../services/alert";
import { useNavigate } from "react-router-dom";
import {
  GoogleOAuthProvider,
  GoogleLogin,
  CredentialResponse,
} from "@react-oauth/google";
import api from "../../../services/api";
import {
  DecodeGoogleTokenResponse,
  LoginResponse,
  SendOtpResponse,
} from "../../../interfaces/authInterface";
import { jwtDecode } from "jwt-decode";

const Login: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Replace with your actual Google Client ID
  const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID ?? "";

  const handleSubmit = async (value: { email: string }) => {
    setLoading(true);
    try {
      const res = await api.post("auth/send-otp", value);
      if (res.data) {
        const data: SendOtpResponse = res.data;
        alert(data.message, "success");
        navigate(
          `/verify-otp?email=${value.email}&token=${data.verifyPageToken}`
        );
      }
    } catch (err: any) {
      alert(err?.message || "OTP send failed", "error");
    } finally {
      setLoading(false);
    }
  };

  // Handler for successful Google login
  const handleGoogleSuccess = async (
    credentialResponse: CredentialResponse
  ) => {
    setLoading(true);
    try {
      // credentialResponse.credential contains the ID token
      const idToken = credentialResponse.credential;
      if (idToken) {
        const decodedToken: DecodeGoogleTokenResponse = jwtDecode(idToken);
        const payload = {
          email: decodedToken.email,
          name: decodedToken.name,
        };
        const res = await api.post("auth/google-login", payload);
        if (res.data) {
          const data: LoginResponse = res.data;
          alert(res.data?.message || "You have successfully logged in.", "success");
          dispatch(
            setLogin({
              token: data.accessToken,
              userInfo: {
                id: data.user.id,
                email: data.user.email,
                name: data.user.name,
              },
            })
          );
        }
      }
    } catch (err: any) {
      alert(err?.message || "Google login failed", "error");
    } finally {
      setLoading(false);
    }
  };

  // Handler for failed Google login
  const handleGoogleFailure = (errorResponse?: any) => {
    alert("Google login failed. Please try again.", "error");
  };

  const loginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
  });
  const initialValues = {
    email: "",
  };

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <Formik
        initialValues={initialValues}
        validationSchema={loginSchema}
        onSubmit={(value) => handleSubmit(value)}
      >
        <Form>
          <div
            style={{
              padding: "20px",
              border: "1px solid #ccc",
              borderRadius: "8px",
              maxWidth: "400px",
              margin: "50px auto",
            }}
          >
            <h2>Login</h2>
            <div style={{ marginBottom: "15px" }}>
              <label
                htmlFor="email"
                style={{ display: "block", marginBottom: "5px" }}
              >
                Email:
              </label>
              <Field
                name="email"
                type="email"
                style={{
                  width: "100%",
                  padding: "8px",
                  boxSizing: "border-box",
                }}
              />
              <ErrorMessage name="email" component="div" />
            </div>
            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                padding: "10px",
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                marginBottom: "15px",
              }}
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            <div style={{ textAlign: "center", marginBottom: "15px" }}>
              <p>- OR -</p>
            </div>

            <div style={{ display: "flex", justifyContent: "center" }}>
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleFailure}
              />
            </div>
          </div>
        </Form>
      </Formik>
    </GoogleOAuthProvider>
  );
};

export default Login;
