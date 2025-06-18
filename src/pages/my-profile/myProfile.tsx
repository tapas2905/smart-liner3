import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import styles from './myProfile.module.scss';

const MyProfile: React.FC = () => {
  

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
                <Link to={'#'}>
                  <i className="fa-solid fa-pencil"></i> <span>Edit Profile</span>
                </Link>
              </div>
            </div>
            <div className={styles.myProfileRightPrt}>
              <h1>My Profile</h1>
              <div className={styles.smartLinerFormClmTwo}>
                <form>
                  <ul>
                    <li>
                      <label>Name</label>
                      <input
                        name='name'
                        value='Andrena Turing'
                        readOnly
                      />
                    </li>
                    <li>
                      <label>User Code</label>
                      <input
                        name='name'
                        value='SAD789899'
                        readOnly
                      />
                    </li>
                    <li>
                      <label>Shipping Method</label>
                      <input
                        name='name'
                        value='Please Select One'
                        readOnly
                      />
                    </li>
                    <li>
                      <label>Discount Percentage</label>
                      <input
                        name='name'
                        value='20'
                        readOnly
                      />
                      <div className={styles.percentageIcon}>
                        <span>%</span>
                      </div>
                    </li>
                    <li>
                      <label>Account Email</label>
                      <input
                        name='name'
                        value='andrena.turing@krameramerica.com'
                        readOnly
                      />
                    </li>
                    <li>
                      <label>Invoice Email</label>
                      <input
                        name='name'
                        value='andrena.turing@krameramerica.com'
                        readOnly
                      />
                    </li>
                  </ul>
                </form>
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
