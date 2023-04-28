import { BsSunFill, BsSun } from "react-icons/bs";
import { FaUserCircle, FaRegUserCircle } from "react-icons/fa";
import { useContext } from "react";
import { ThemeContext } from "../contexts/Theme";
import { UserContext } from "../contexts/User";

function Login({ setLogin }) {
  const { theme, setTheme } = useContext(ThemeContext);
  const { user } = useContext(UserContext);

  const isUser = Object.keys(user).length

  const toggleDarkMode = () => {
    theme === "" ? setTheme("dark") : setTheme("");
  };

  return (
    <>
      <div className="login">
        <button
          className={"dark-button function-button " + theme}
          onClick={() => {
            setLogin(true);
          }}
        >
          {isUser ? <FaUserCircle /> : <FaRegUserCircle/>}
        </button>
      </div>
      <div className="light-toggle">
        <button
          className={"dark-button function-button " + theme}
          onClick={() => {
            toggleDarkMode();
          }}
        >
          {theme === "dark" ? <BsSunFill /> : <BsSun />}
        </button>
      </div>
    </>
  );
}

export default Login;
