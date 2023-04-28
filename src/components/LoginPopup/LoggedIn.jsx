import { useContext } from "react";
import { UserContext } from "../../contexts/User";

function LoggedIn({setPopUp}) {
  const { setUser } = useContext(UserContext);

  const LogOut = () => {
    setUser({});
    setPopUp(false)
  }

  return (
    <div className="logged-in-screen">
      <button
      className="login__button"
        type="button"
        onClick={LogOut}
      >
        Logout
      </button>
    </div>
  );
}

export default LoggedIn;
