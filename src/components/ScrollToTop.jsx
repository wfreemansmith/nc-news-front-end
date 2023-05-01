import { useEffect } from "react";
import { useLocation } from "react-router";

function ScrollToTop() {
  const location = useLocation();
  useEffect(() => {
    const top = document.getElementById("top");
    if (top) top.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [location.pathname]);
}

export default ScrollToTop;
