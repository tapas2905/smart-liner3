import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import styles from './myProfile.module.scss';
import { Formik, Form, Field, ErrorMessage, FormikProps  } from 'formik';
import { ProfileInterface } from '../../interfaces/profileInterface';
import * as Yup from 'yup';

const MyProfile: React.FC = () => {
  const [editableForm, setEditableForm] = useState<boolean>(false);
  const formikRef = useRef<FormikProps<ProfileInterface>>(null);
  const initialProfile: ProfileInterface = {
    name: "John Doe",
    userCode: "SL5899",
    shippingMethod: "By Road",
    discountPercentage: 20,
    email: "user@gmail.com",
    invoiceEmail: "invoice@gmail.com",
  };
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    userCode: Yup.string().required("User Code is required"),
    shippingMethod: Yup.string().required("Shipping Method is required"),
    discountPercentage: Yup.number()
      .required("Discount Percentage is required")
      .min(0, "Discount Percentage must be at least 0")
      .max(100, "Discount Percentage cannot exceed 100"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    invoiceEmail: Yup.string()
      .email("Invalid email format")
      .required("Invoice Email is required"),
  });
  const handleSubmit = (Value: ProfileInterface) => {
    console.log(Value);
    setEditableForm(false);
  };
  const editProfile = () => {
    if(!editableForm) {
      setEditableForm(true);
    } else {
      if (formikRef.current) {
        formikRef.current.submitForm();
      }
    }
  };
  return (
    <>
      <Header/>

      <div className={styles.myProfileBdyPrt}>
        <div className={styles.container}>
          <div className={styles.myProfileBdyRow}>
            <div className={styles.myProfileLeftPrt}>
              <div className={styles.profileImgPrt}>
                <img
                  src='images/product-image1.png'
                  alt='Profile'
                  className={styles.profileImg}
                />
                <div className={styles.profileCameraIcon}>
                  <img
                    src='images/camera-icon.svg'
                    alt='camera icon'
                  />
                </div>
              </div>
              <div className={styles.editProfileBtn}>
               <button onClick={editProfile}>
                  <i className={`fa-solid ${editableForm ? "fa-save" : "fa-pencil"}`}></i> <span>{editableForm ? "Save" : "Edit Profile"}</span>
                </button>
              </div>
            </div>
            <div className={styles.myProfileRightPrt}>
              <h1>My Profile</h1>
              <div className={styles.smartLinerFormClmTwo}>
                <Formik
                initialValues={initialProfile}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                innerRef={formikRef}
                >
                  <Form>
                  <ul>
                    <li>
                      <label>Name</label>
                      <Field
                        name='name'
                        readOnly={!editableForm}
                      />
                      {editableForm && <ErrorMessage name="name" component="p" className={styles.errorMessage} />}
                    </li>
                    <li>
                      <label>User Code</label>
                      <Field
                        name='userCode'
                        readOnly={!editableForm}
                      />
                      {editableForm && <ErrorMessage name="userCode" component="p" className={styles.errorMessage} />}
                    </li>
                    <li>
                      <label>Shipping Method</label>
                      <Field
                        name='shippingMethod'
                        readOnly={!editableForm}
                      />
                     {editableForm && <ErrorMessage name="shippingMethod" component="p" className={styles.errorMessage} />}
                    </li>
                    <li>
                      <label>Discount Percentage</label>
                      <Field
                        name='discountPercentage'
                        readOnly={!editableForm}
                      />
                      <div className={styles.percentageIcon}>
                        <span>%</span>
                      </div>
                     {editableForm && <ErrorMessage name="discountPercentage" component="p" className={styles.errorMessage} />}
                    </li>
                    <li>
                      <label>Account Email</label>
                      <Field
                        name='email'
                        readOnly={!editableForm}
                      />
                     {editableForm && <ErrorMessage name="email" component="p" className={styles.errorMessage} />}
                    </li>
                    <li>
                      <label>Invoice Email</label>
                      <Field
                        name='invoiceEmail'
                        readOnly={!editableForm}
                      />
                     {editableForm && <ErrorMessage name="invoiceEmail" component="p" className={styles.errorMessage} />}
                    </li>
                  </ul>
                  </Form>
                </Formik>
              </div>
              <p>If you would like to change anything in your account, to reach out to 
                <Link to={'#'}>orders@krameramerica.com</Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer/>
    </>
  );
};
export default MyProfile;
