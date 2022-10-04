import React, { useEffect, useState } from "react";
import { Link } from "gatsby";
import BlogConfig from "../../../blog-config";
import { FiFolder, FiMoon, FiSun } from "react-icons/fi";
import { useGlobalContext } from "../../context/GlobalContext";

const profileImageRoot =
  typeof window !== "undefined" && window.location.host === "localhost:8000"
    ? "http://localhost:8000"
    : BlogConfig.siteUrl;

const Header = () => {
  const { theme, toggleTheme } = useGlobalContext();
  const [scrollY, setScrollY] = useState<number>(0);
  const [hidden, setHidden] = useState(false);

  const detectScrollDirection = () => {
    if (scrollY >= window.scrollY) {
      // scroll up
      setHidden(false);
    } else if (scrollY < window.scrollY && 400 <= window.scrollY) {
      // scroll down
      setHidden(true);
    }

    setScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", detectScrollDirection);

    return () => {
      window.removeEventListener("scroll", detectScrollDirection);
    };
  }, [scrollY]);

  useEffect(() => {
    setScrollY(window.scrollY);
  }, []);

  return (
    <header
      className={`fixed block ${
        hidden ? "-top-40 opacity-0" : "top-0"
      } left-0 right-0 px-10 pt-10 [transition:top_0.5s,opacity_0.5s] z-[999]`}
    >
      <div className="flex justify-between max-w-[680px] m-auto">
        <Link to="/">
          <img
            className="w-7 h-7"
            src={`${profileImageRoot}/favicon.png`}
            alt="logo"
          />
        </Link>
        <div className="flex justify-between items-center">
          <div className="w-5 h-5 mr-4 overflow-hidden box-border">
            <div
              className={`relative flex flex-col justify-between h-10 [transition:top_0.4s] ${
                theme === "light" ? "-top-5" : "top-0"
              }`}
            >
              <FiSun
                onClick={() => toggleTheme({ currentTheme: theme })}
                className={`w-5 h-5 cursor-pointer stroke-1 [transition:opacity_0.25s] ${
                  theme === "light" ? "opacity-0" : "opacity-100"
                }`}
              />
              <FiMoon
                onClick={() => toggleTheme({ currentTheme: theme })}
                className={`w-5 h-5 cursor-pointer stroke-1 [transition:opacity_0.25s] ${
                  theme === "dark" ? "opacity-0" : "opacity-100"
                }`}
              />
            </div>
          </div>
          <Link to="/series">
            <FiFolder className="w-5 h-5 cursor-pointer stroke-1" />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
