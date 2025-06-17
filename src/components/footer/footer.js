import React from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form, Field } from "formik";
import styles from './footer.module.scss';

const Footer = () => {

  return (
    <>

    <div className={styles.bottomFooter}>
      <div className={styles.container}>
        <div className={styles.footerRow}>
          <div className={styles.footerClm}>
            <h2>Customer Service</h2>
            <ul className={styles.footerMenu}>
              <li>
                <Link>
                  Help Center
                </Link>
              </li>
              <li>
                <Link>
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link>
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          <div className={styles.footerClm}>
            <h2>Information</h2>
            <ul className={styles.footerMenu}>
              <li>
                <Link>
                  Information
                </Link>
              </li>
              <li>
                <Link>
                  Our Story
                </Link>
              </li>
              <li>
                <Link>
                  Policies & Terms of Service
                </Link>
              </li>
            </ul>
          </div>
          <div className={`${styles.footerClm} ${styles.footerSocialMediaClm}`}>
            <h2>Follow Us</h2>
            <ul className={styles.footerSocialMedia}>
              <li>
                <Link>
                  <img src='images/facebook-icon.svg' alt='facebook icon' />
                </Link>
              </li>
              <li>
                <Link>
                  <img src='images/instagram-icon.svg' alt='instagram icon' />
                </Link>
              </li>
              <li>
                <Link>
                  <img src='images/youtube-icon.svg' alt='youtube icon' />
                </Link>
              </li>
              <li>
                <Link>
                  <img src='images/tiktok-icon.svg' alt='tiktok icon' />
                </Link>
              </li>
            </ul>
          </div>
          <div className={`${styles.footerClm} ${styles.footerNewsLetterClm}`}>
            <h2>Sign up for our newsletter</h2>
            <div className={styles.footerNewsLetter}>
              <p>Your Weekly/Monthly Dose of Knowledge and Inspiration</p>
              <Formik>
                <Form>
                  <Field
                    name="email"
                    type="email"
                    placeholder="Enter Your Email Address"
                  />
                  <button
                    type="submit"
                    className={styles.submitBtn}
                  >
                    Submit
                  </button>
                </Form>
              </Formik>
            </div>
          </div>
        </div>        
      </div>      
    </div>

    <div className={styles.copyrightPrt}>
      <div className={styles.container}>
        <p>Copyright &copy; 2025, Tour & Travel Pvt. Ltd</p>
      </div>
    </div>

    </>
  );

};

export default Footer;