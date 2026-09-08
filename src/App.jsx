import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { RegistrationProvider } from "./context/RegistrationContext";
import { LanguageProvider } from "./context/LanguageContext";
import { ThemeProvider } from "./context/ThemeContext";
import { ToastProvider } from "./context/ToastContext";
import Home from "./pages/Home";
import NotFound from "./components/NotFound";
import ErrorBoundary from "./components/ErrorBoundary";
import ScrollToTop from "./components/ScrollToTop";
import BackToTop from "./components/BackToTop";
import FloatingContact from "./components/FloatingContact";
import ScrollProgress from "./components/ScrollProgress";
import CursorTrail from "./effects/CursorTrail";
import useSmoothAnchorScroll from "./effects/useSmoothAnchorScroll";

// Admin sahifalari kod bo'lib (code-split) yuklanadi — oddiy tashrif
// buyuruvchilar uchun bosh sahifa yengil bo'lib qoladi.
const Admin = lazy(() => import("./pages/Admin"));
const AdminLogin = lazy(() => import("./components/AdminLogin"));

function SmoothScrollSetup() {
  useSmoothAnchorScroll();
  return null;
}

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <LanguageProvider>
          <ToastProvider>
            <AuthProvider>
              <RegistrationProvider>
                <BrowserRouter>
                  {/* Liquid/Gooey Animation uchun global SVG filtri (.gooey-layer klassi shu filterni ishlatadi) */}
                  <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
                    <filter id="goo-filter">
                      <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
                      <feColorMatrix
                        in="blur"
                        mode="matrix"
                        values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
                        result="goo"
                      />
                    </filter>
                  </svg>
                  <CursorTrail />
                  <SmoothScrollSetup />
                  <ScrollProgress />
                  <ScrollToTop />
                  <Suspense fallback={null}>
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/login" element={<AdminLogin />} />
                      <Route path="/seminar" element={<Admin />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </Suspense>
                  <FloatingContact />
                  <BackToTop />
                </BrowserRouter>
              </RegistrationProvider>
            </AuthProvider>
          </ToastProvider>
        </LanguageProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
