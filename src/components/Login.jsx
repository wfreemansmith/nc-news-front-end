import { BsSunFill, BsSun } from "react-icons/bs";
import { useContext } from "react";
import { ThemeContext } from "../contexts/Theme";

function Login() {
  const { theme, setTheme } = useContext(ThemeContext);

  const toggleDarkMode = () => {
    theme === "" ? setTheme("dark") : setTheme("");
  };

  return (
    <div className="login">
      <button
        className={"dark-button " + theme}
        onClick={() => {
          toggleDarkMode();
        }}
      >
        {theme === "" ? <BsSunFill /> : <BsSun />}
      </button>
    </div>
  );
}

export default Login;
