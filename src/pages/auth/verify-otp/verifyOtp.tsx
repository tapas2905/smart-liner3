import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import alert from "../../../services/alert";
import api from "../../../services/api";
import {
  LoginResponse,
  VerifyOtpPayload,
} from "../../../interfaces/authInterface";
import { useDispatch } from "react-redux";
import { setLogin } from "../../../store/userSlice";
import { AppDispatch } from "../../../store";

const VerifyOtp: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [email, setEmail] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    const emailParam = searchParams.get("email");
    const tokenParam = searchParams.get("token");

    if (!emailParam || !tokenParam) {
      alert("Something went wrong. Please try again.", "error");
      navigate("/login");
      return;
    }

    setEmail(emailParam);
    setToken(tokenParam);

    // Clear query params from URL
    window.history.replaceState({}, document.title, "/verify-otp");
  }, [searchParams]);

  const handleVerify = async (value: { otp: string }) => {
    if (!value.otp || !email || !token) {
      alert("Something went wrong. Please try again.", "error");
      return;
    }
    const payload: VerifyOtpPayload = {
      otp: value.otp,
      email,
      verifyPageToken: token,
    };
    try {
      const res = await api.post("auth/verify-otp", payload);
      if (res.data) {
        const data: LoginResponse = res.data;
        alert(
          res.data?.message || "You have successfully logged in.",
          "success"
        );
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
    } catch (error: any) {
      alert(error?.message, "error");
    }
  };
  const verifyOtpSchema = Yup.object().shape({
    otp: Yup.string()
      .required("OTP is required")
      .length(6, "OTP must be 6 digits"),
  });
  const initialValues = {
    otp: "",
  };
  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.currentTarget;
    input.value = input.value.replace(/\D/g, "").slice(0, 6);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={verifyOtpSchema}
      onSubmit={(value) => handleVerify(value)}
    >
      <Form>
        <div style={{ maxWidth: "400px", margin: "auto" }}>
          <h2>Enter Code</h2>
          {email && <p>Sent to {email}</p>}
          <div>
            <label>Your verification code</label>
            <Field
              type="text"
              placeholder="Enter 6-digit code"
              name="otp"
              maxLength={6}
              onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                handleOtpChange(e);
              }}
            />
            <ErrorMessage name="otp" />
          </div>
          <button type="submit">Submit</button>
        </div>
      </Form>
    </Formik>
  );
};

export default VerifyOtp;
