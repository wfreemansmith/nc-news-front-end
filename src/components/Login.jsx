import { BsSunFill, BsSun } from "react-icons/bs";
import { FaUserCircle, FaRegUserCircle} from "react-icons/fa"
import { useContext } from "react";
import { ThemeContext } from "../contexts/Theme";

function Login({setLogin}) {
  const { theme, setTheme } = useContext(ThemeContext);

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
      ><FaUserCircle/>
      </button>
      </div>
      <div className="light-toggle">
      <button
        className={"dark-button function-button " + theme}
        onClick={() => {
          toggleDarkMode();
        }}
      >
        {theme === "" ? <BsSunFill /> : <BsSun />}
      </button>
      </div>
    </>
  );
}

export default Login;
