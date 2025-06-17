import React from 'react';
import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './header.module.scss';

const Header: React.FC  = () => {

    // Profile dropdown toggle
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  // Close Profile dropdown toggle if click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !(dropdownRef.current as HTMLElement).contains(event.target as Node)
      ) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
                <Link to={'#'}>Home</Link>
              </li>
              <li>
                <Link to={'#'}>Product List</Link>
              </li>
              <li>
                <Link to={'#'}>Shop Online</Link>
              </li>
            </ul>
          </div>
          <div
            className={styles.hdrSignInPrt}
            onClick={toggleProfile}
            ref={dropdownRef}
          >
            <div className={styles.hdrSignBtn}>
              <Link to={'#'}>
                <i className="fa-regular fa-circle-user"></i>
                <span>Sign In</span>
              </Link>
            </div>
            {isProfileOpen && (
              <div className={styles.hdrProfileDropdown}>
                <ul>
                  <li>
                    <Link to="#">
                      <i className="fa-regular fa-circle-user"></i>
                      <span>Profile</span>
                    </Link></li>
                  <li>
                    <Link to="#">
                     <i className="fa-solid fa-arrow-right-from-bracket"></i>
                     <span>Logout</span>
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

};

export default Header;
