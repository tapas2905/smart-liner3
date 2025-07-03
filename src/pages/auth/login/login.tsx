import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import alert from "../../../services/alert";
import { Link, useNavigate } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import api from "../../../services/api";
import {SendOtpResponse} from "../../../interfaces/authInterface";
import styles from './login.module.scss';
import endpoints from "../../../helpers/endpoints";
import GoogleLoginButton from "../../../components/googl-login-button/googleLoginButton";

const Login: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Google Client ID
  const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID ?? "";

  const handleSubmit = async (value: { email: string }) => {
    setLoading(true);
    try {
      const res = await api.post(endpoints.auth.sendOtp, value);
      if (res.data) {
        const data: SendOtpResponse = res.data;
        alert(data.message, "success");
        navigate(
          `/verify-otp?email=${value.email}&token=${data.verifyPageToken}`
        );
      }
    } catch (err: any) {
      alert(err?.response?.data?.detail || err?.message || "OTP send failed", "error");
    } finally {
      setLoading(false);
    }
  };

  const loginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
  });
  const initialValues = {
    email: "",
  };

  return (
    <>
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
                  <GoogleLoginButton setLoading={setLoading} loading={loading} dispatch={dispatch} />
                </div>
                <div className={styles.loginOption}>
                  <p>or</p>
                </div>
                <div className={styles.loginFormField}>
                  <label htmlFor="email">Email Address</label>
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
                    Continue
                  </button>
                </div>
                <p className={styles.loginTermsService}>
                  <Link to="https://www.smartliner-usa.com/pages/our-policies">
                    Policies & Terms of Service
                  </Link>
                </p>
              </div>
            </Form>
          </Formik>
        </GoogleOAuthProvider>
      </div>
    </div>
    </>
  );
};

export default Login;