import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Har bir marshrut (route) almashganda sahifani yuqoriga qaytaradi
// (masalan / dan /login ga o'tganda pastda qolib ketmasligi uchun).
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
