import { GrFormClose } from "react-icons/gr";

function LoginPopOut({ setLogin }) {
  return (
      <div className="container">
        <div className="popup-window">
          <button
            className="close-button function-button"
            onClick={() => {
              setLogin(false);
            }}
          >
            <GrFormClose />
          </button>
          <form className="login-form">
            <label>Username</label>
            <input></input>
            <label>Password</label>
            <input type="password"></input>
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
  );
}

export default LoginPopOut;
