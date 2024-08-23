import React, { useState, useEffect } from "react";
import styles from "./style";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Loader from "./loader/index";
import Panel from "./pages/panel/dashboard";
import DefaultLayout from "./layout/DefaultLayout";
import SignIn from "./authentication/SignIn";
import SignUp from "./authentication/SignUp";
import ForgotPassword from "./authentication/ForgotPassword";
import { useAuth } from "./authentication/AuthContext";
import { Billing, Business, CardDeal, Clients, CTA, Footer, Navbar, Stats, Testimonials, Hero } from "./components";
import Admin from "./pages/admin/Admin";

// Componente para el diseño general
const MainLayout = () => (
  <div className="bg-primary w-full overflow-hidden">
    <div className={`${styles.paddingX} ${styles.flexCenter}`}>
      <div className={`${styles.boxWidth}`}>
        <Navbar />
      </div>
    </div>

    <div className={`bg-primary ${styles.flexStart}`}>
      <div className={`${styles.boxWidth}`}>
        <Hero />
      </div>
    </div>

    <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
      <div className={`${styles.boxWidth}`}>
        <Stats />
        <Business />
        <Billing />
        <CardDeal />
        <Testimonials />
        <Clients />
        <CTA />
        <Footer />
      </div>
    </div>
  </div>
);

// Componente para manejar rutas protegidas (sin usar actualmente)
const ProtectedRoute = ({ children, requiredRoles }) => {
  // Puedes reactivar la autenticación aquí si necesitas
  // const { token, role } = useAuth();
  // const token = "5555555555555"; // Ejemplo de token

  // Si no hay token, redirige al login
  // if (!token) {
  //   return <Navigate to="/login" />;
  // }

  // Si el rol no está en los roles permitidos, redirige a /home
  // if (requiredRoles && !requiredRoles.includes(role)) {
  //   return <Navigate to="/home" />;
  // }

  return children; // Permite acceso si se comentan las validaciones
};

const App = () => {
  const [loading, setLoading] = useState(true);
  const { pathname } = useLocation();
  // const { token } = useAuth();
  // const token = "5555555555555"; // Ejemplo de token

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000); // Simula una carga de 1 segundo
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <Routes>
      {/* Rutas Públicas */}
      <Route
        path="/"
        element={<MainLayout />} // Diseño general disponible en la raíz
      />
      {/* Rutas de autenticación, redirige a /home/panel si se descomenta el token */}
      {/* 
      <Route
        path="/login"
        element={!token ? <SignIn /> : <Navigate to="/home/panel" />}
      />
      <Route
        path="/signup"
        element={!token ? <SignUp /> : <Navigate to="/home/panel" />}
      />
      <Route
        path="/forgotPassword"
        element={!token ? <ForgotPassword /> : <Navigate to="/home/panel" />}
      />
      */}
      <Route
        path="/login"
        element={<SignIn />} // Puedes modificar según si deseas redirigir o no
      />
      <Route
        path="/signup"
        element={<SignUp />} // Puedes modificar según si deseas redirigir o no
      />
      <Route
        path="/forgotPassword"
        element={<ForgotPassword />} // Puedes modificar según si deseas redirigir o no
      />

      {/* Rutas Protegidas */}
      <Route
        path="/home"
        element={
          <ProtectedRoute requiredRoles={["1", "2", "3"]}>
            <DefaultLayout />
          </ProtectedRoute>
        }
      >
        <Route
          path="panel"
          element={
            <ProtectedRoute requiredRoles={["1", "2", "3"]}>
              <Panel />
            </ProtectedRoute>
          }
        />
        <Route path="administrador" element={<Admin />} />
        {/* <Route path="recomendaciones" element={<Recomendations />} /> */}
      </Route>

      {/* Ruta de Redirección por Defecto */}
      <Route
        path="*"
        element={
          // Redirige a /home/panel si hay token, o a /login si no hay token
          // Puedes modificar esto según la lógica deseada
          // token ? <Navigate to="/home/panel" /> : <Navigate to="/login" />
          <Navigate to="/login" />
        }
      />
    </Routes>
  );
};

export default App;
