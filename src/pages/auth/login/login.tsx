import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setLogin } from "../../../store/userSlice";
import { AppDispatch } from "../../../store";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import alert from "../../../services/alert";
import { Link, useNavigate } from "react-router-dom";
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
import { AxiosError } from "axios";
import Header from "../../../components/header/header";
import Footer from "../../../components/footer/footer";
import styles from './login.module.scss';

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
      const axiosError = err as AxiosError;
      console.log(err);
      if(axiosError.response) {
         const errorMessage =
           typeof axiosError.response.data === "object" &&
           axiosError.response.data !== null &&
           "message" in axiosError.response.data
             ? (axiosError.response.data as { message?: string }).message
             : undefined;
         alert(errorMessage || "OTP send failed", "error");
      }
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
    <>
    <Header/>

    <div className={styles.loginBodyPrt}>
      <div className={styles.container}>
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
          <Formik
            initialValues={initialValues}
            validationSchema={loginSchema}
            onSubmit={(value) => handleSubmit(value)}
          >
            <Form>
              <div className={styles.loginFormBox}>
                <div className={styles.loginBoxHdn}>
                  <h2>Sign in</h2>
                  <p>Choose how you'd like to sign in</p>
                </div>
                <div className={styles.googleSign}>
                  <GoogleLogin
                    onSuccess={handleGoogleSuccess}
                    onError={handleGoogleFailure}
                  />
                </div>
                <div className={styles.loginOption}>
                  <p>or</p>
                </div>
                <div className={styles.loginFormField}>
                  <label
                    htmlFor="email"
                  >
                    Email Address
                  </label>
                  <Field
                    name="email"
                    type="email"
                    placeholder="Enter Your Email Address"
                  />
                  <ErrorMessage name="email" component="p" className={styles.loginError} />

                  <button
                    type="submit"
                    disabled={loading}
                    className={styles.submitBtn}
                  >
                    {loading ? "Logging in..." : "Continue"}
                  </button>
                </div>
                <p className={styles.loginTermsService}>
                  <Link to="#">
                    Policies & Terms of Service
                  </Link>
                </p>
              </div>
            </Form>
          </Formik>
        </GoogleOAuthProvider>
      </div>
    </div>

    <Footer/>
    </>
  );
};

export default Login;
