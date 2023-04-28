import { GrFormClose } from "react-icons/gr";
import { useContext } from "react";
import { UserContext } from "../../contexts/User";
import LoginForm from "./LoginForm";
import LoggedIn from "./LoggedIn";

function LoginPopOut({ setPopUp }) {
  const { user } = useContext(UserContext);
  const isUser = Object.keys(user).length;

  return (
    <div className="container">
      <div className="popup-window">
        <button
          className="close-button function-button"
          onClick={() => {
            setPopUp(false);
          }}
        >
          <GrFormClose />
        </button>
        {!isUser ? <LoginForm setPopUp={setPopUp} /> : <LoggedIn setPopUp={setPopUp}/>}
      </div>
    </div>
  );
}

export default LoginPopOut;
