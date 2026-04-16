import React, { useState } from 'react';
import { signUp, logIn } from '../firebase';

function Auth({ onClose, setUser }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        const userCredential = await logIn(email, password);
        
        const isAdmin = email === 'admin@prescripto.com';
        
        if (isAdmin) {
          localStorage.setItem('currentUser', JSON.stringify({
            uid: userCredential.user.uid,
            email: email,
            name: 'Admin',
            isAdmin: true
          }));
          alert('Admin login successful!');
          if (onClose) onClose();
          window.location.reload(); 
        } else {
          const storedUser = localStorage.getItem(`user_${userCredential.user.uid}`);
          if (storedUser) {
            const userInfo = JSON.parse(storedUser);
            localStorage.setItem('currentUser', JSON.stringify({
              uid: userCredential.user.uid,
              email: email,
              name: userInfo.name,
              mobile: userInfo.mobile,
              isAdmin: false
            }));
          } else {
            localStorage.setItem('currentUser', JSON.stringify({
              uid: userCredential.user.uid,
              email: email,
              name: email.split('@')[0],
              isAdmin: false
            }));
          }
          alert('Login successful!');
          if (onClose) onClose();
          window.location.reload(); 
        }
      } else {
        // Signup
        if (!name.trim()) {
          throw new Error('Please enter your name');
        }
        if (!mobile.trim()) {
          throw new Error('Please enter your mobile number');
        }
        if (mobile.length < 10) {
          throw new Error('Please enter valid mobile number');
        }
        
        const userCredential = await signUp(email, password);
        
        localStorage.setItem(`user_${userCredential.user.uid}`, JSON.stringify({
          uid: userCredential.user.uid,
          email: email,
          name: name,
          mobile: mobile
        }));
        
        alert('Signup successful! Please login.');
        setIsLogin(true);
        setEmail('');
        setPassword('');
        setName('');
        setMobile('');
        setError('');
      }
    } catch (err) {
      console.error("Auth error:", err);
      let errorMessage = err.message;
      if (err.code === 'auth/email-already-in-use') {
        errorMessage = 'Email already in use. Please login.';
      } else if (err.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email format.';
      } else if (err.code === 'auth/weak-password') {
        errorMessage = 'Password should be at least 6 characters.';
      } else if (err.code === 'auth/user-not-found') {
        errorMessage = 'User not found. Please sign up.';
      } else if (err.code === 'auth/wrong-password') {
        errorMessage = 'Wrong password. Please try again.';
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container} onClick={(e) => {
      if (e.target === e.currentTarget) onClose();
    }}>
      <div style={styles.card}>
        <button onClick={onClose} style={styles.closeBtn}>✕</button>
        
        <h2 style={styles.title}>{isLogin ? 'Login' : 'Sign Up'}</h2>
        
        {error && <div style={styles.error}>{error}</div>}
        
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={styles.input}
                required
              />
              
              <input
                type="tel"
                placeholder="Mobile Number"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                style={styles.input}
                required
              />
            </>
          )}
          
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            required
          />
          
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            required
          />
          
          <button 
            type="submit" 
            style={styles.button}
            disabled={loading}
          >
            {loading ? 'Loading...' : (isLogin ? 'Login' : 'Sign Up')}
          </button>
        </form>
        
        <button 
          onClick={() => {
            setIsLogin(!isLogin);
            setError('');
          }}
          style={styles.switchButton}
        >
          {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
        </button>
        
        {isLogin && (
          <div style={styles.adminInfo}>
            <hr />
            <p style={styles.adminCredentials}>Admin: admin@prescripto.com / admin123</p>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 1000
  },
  card: {
    position: 'relative',
    backgroundColor: 'white',
    padding: '40px',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    width: '380px',
    maxHeight: '90vh',
    overflowY: 'auto'
  },
  title: {
    textAlign: 'center',
    marginBottom: '20px',
    color: '#333'
  },
  closeBtn: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    background: 'none',
    border: 'none',
    fontSize: '20px',
    cursor: 'pointer',
    color: '#666'
  },
  input: {
    width: '100%',
    padding: '10px',
    margin: '10px 0',
    borderRadius: '4px',
    border: '1px solid #ddd',
    fontSize: '16px',
    boxSizing: 'border-box'
  },
  button: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#4285f4',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    cursor: 'pointer',
    marginTop: '10px'
  },
  switchButton: {
    width: '100%',
    padding: '10px',
    backgroundColor: 'transparent',
    color: '#4285f4',
    border: 'none',
    cursor: 'pointer',
    marginTop: '10px',
    fontSize: '14px'
  },
  error: {
    backgroundColor: '#ffebee',
    color: '#c62828',
    padding: '10px',
    borderRadius: '4px',
    marginBottom: '10px',
    fontSize: '14px'
  },
  adminInfo: {
    marginTop: '15px',
    textAlign: 'center'
  },
  adminCredentials: {
    fontSize: '12px',
    color: '#666',
    margin: '5px 0'
  }
};

export default Auth;