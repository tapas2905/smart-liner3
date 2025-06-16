import React from 'react';
import { Link } from 'react-router-dom';
import styles from './header.module.scss';

const Header = () => {

  return (
    <div className={styles.header}>
      <div className={styles.container}>
        <div className={styles.headerRow}>
          <div className={styles.headerLogoPrt}>
            <Link to="/"><img src='images/logo.svg' alt='Logo' /></Link>
          </div>
          <div className={styles.headerMenuPrt}>
            <ul>
              <li>
                <Link>Home</Link>
              </li>
              <li>
                <Link>Product List</Link>
              </li>
              <li>
                <Link>Shop Online</Link>
              </li>
            </ul>
          </div>
          <div className={styles.hdrSignBtn}>
            <Link>
              <img src='images/sign-user-icon.svg' alt='sign user icon' />
              <span>Sign In</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );

};

export default Header;
