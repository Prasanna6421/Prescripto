import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";

import Doctors from "./components/Doctors";
import DoctorDetail from "./components/DoctorDetail";
import Auth from "./components/Auth";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import MyAppointments from "./components/MyAppointments";
import AdminPanel from "./components/AdminPanel";
import ProtectedRoute from "./components/ProtectedRoute";
import PageTransition from "./components/PageTransition";

import { auth } from "./firebase";

import "./index.css";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAuth, setShowAuth] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div style={styles.loading}>
        Loading...
      </div>
    );
  }

  return (
    <>
      <Navbar
        user={user}
        setShowAuth={setShowAuth}
      />

      <PageTransition>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/doctors" element={<Doctors />} />
    <Route path="/doctors/:id" element={<DoctorDetail />} />
    <Route path="/about" element={<About />} />
    <Route path="/contact" element={<Contact />} />

    <Route
      path="/my-appointments"
      element={
        <ProtectedRoute>
          <MyAppointments />
        </ProtectedRoute>
      }
    />

    <Route
      path="/admin-panel"
      element={
        <ProtectedRoute adminOnly>
          <AdminPanel />
        </ProtectedRoute>
      }
    />

    <Route path="*" element={<Home />} />
  </Routes>
</PageTransition>

      <Footer />

      {showAuth && (
        <Auth
          onClose={() => setShowAuth(false)}
        />
      )}
    </>
  );
}

const styles = {
  loading: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "50vh",
    fontSize: "20px",
  },
};

export default App;