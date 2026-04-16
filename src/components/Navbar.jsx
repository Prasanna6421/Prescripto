import React, { useState, useEffect } from 'react';
import { auth } from '../firebase';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from "../assets/assets_frontend/logo.svg";
import '../styles_/Navbar.css';

function Navbar({ user, setShowAuth }) {  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 992);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 992);
      if (window.innerWidth > 992) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.isAdmin) {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, [user]);

  const handleLogout = async () => {
    await auth.signOut();
    localStorage.removeItem('currentUser');
    setIsMenuOpen(false);
    navigate('/');
    window.location.reload();
  };
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const openAuthModal = () => {
    if (setShowAuth) {
      setShowAuth(true);
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="navbar-wrapper">
      <nav className="navbar">
        <div className="logo-container" onClick={() => handleNavigation('/')}>
          <img src={logo} alt="Logo" className="logo-img" />
        </div>
        
        {isMobile && (
          <button onClick={toggleMenu} className={`hamburger ${isMenuOpen ? 'open' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </button>
        )}
        
        <div className={`nav-links ${isMobile ? 'mobile-nav' : ''} ${isMenuOpen ? 'open' : ''}`}>
          <span onClick={() => handleNavigation('/')} className={`nav-link ${isActive('/') ? 'active' : ''}`}>
            Home
          </span>
          <span onClick={() => handleNavigation('/doctors')} className={`nav-link ${isActive('/doctors') ? 'active' : ''}`}>
            All Doctor
          </span>
          <span onClick={() => handleNavigation('/about')} className={`nav-link ${isActive('/about') ? 'active' : ''}`}>
            About
          </span>
          <span onClick={() => handleNavigation('/contact')} className={`nav-link ${isActive('/contact') ? 'active' : ''}`}>
            Contact
          </span>
          
          {user && !isAdmin && (
            <span onClick={() => handleNavigation('/my-appointments')} className={`nav-link ${isActive('/my-appointments') ? 'active' : ''}`}>
              My Appointments
            </span>
          )}
          
          {isAdmin && (
            <span onClick={() => handleNavigation('/admin-panel')} className={`nav-link ${isActive('/admin-panel') ? 'active' : ''}`}>
              Admin Panel
            </span>
          )}
          
          {isMobile && (
            <div className="mobile-auth-buttons">
              {user ? (
                <button onClick={handleLogout} className="mobile-logout-btn">Logout</button>
              ) : (
                <button onClick={openAuthModal} className="mobile-create-btn">
                  Create Account
                </button>
              )}
            </div>
          )}
        </div>
        
        {!isMobile && (
          <div className="nav-right">
            {user ? (
              <button onClick={handleLogout} className="logout-btn">Logout</button>
            ) : (
              <button onClick={openAuthModal} className="create-btn">
                Create Account
              </button>
            )}
          </div>
        )}
      </nav>
    </div>
  );
}

export default Navbar;