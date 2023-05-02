import { AiOutlineClose } from "react-icons/ai";
import { useContext } from "react";
import { ThemeContext } from "../../contexts/Theme";
import { UserContext } from "../../contexts/User";
import Transition from "../Transition";
import LoginForm from "./LoginForm";
import LoggedIn from "./LoggedIn";

function LoginPopOut({ popUp, setPopUp}) {
  const { user } = useContext(UserContext);
  const { theme } = useContext(ThemeContext);
  const isUser = Object.keys(user).length;

  return (
    <div className="container">
      <Transition option="popup">
        <div
          key={popUp}
          className={`popup-window ${theme}background ${theme}`}
        >
          <button
            className={"close-button function-button " + theme}
            onClick={() => {
              setPopUp(false);
            }}
          >
            <AiOutlineClose />
          </button>
          {!isUser ? (
            <LoginForm setPopUp={setPopUp} />
          ) : (
            <LoggedIn setPopUp={setPopUp} />
          )}
        </div>
      </Transition>
    </div>
  );
}

export default LoginPopOut;
