import { useEffect, useState } from "react";
import { GrLinkTop } from "react-icons/gr";

function TopButton() {
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      let scroll = window.scrollY;
      if (scroll < 2000) setOpacity(scroll / 2000);
    };
    window.addEventListener("scroll", handleScroll);
  }, []);

  return (
    <button
      className="top-button"
      style={{ opacity: opacity }}
      onClick={() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
    >
      <GrLinkTop />
    </button>
  );
}

export default TopButton;
