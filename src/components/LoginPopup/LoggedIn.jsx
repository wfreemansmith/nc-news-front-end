import { useContext } from "react";
import { UserContext } from "../../contexts/User";
import { ThemeContext } from "../../contexts/Theme";

function LoggedIn({setPopUp}) {
  const { user, setUser } = useContext(UserContext);
  const { theme } = useContext(ThemeContext);

  const LogOut = () => {
    setUser({});
    setPopUp(false)
  }

  return (
    <div className="logged-in-screen">
      <section className="logged-in-screen__user-info">
          <img
            src={user.avatar_url}
            alt={user.name}
            className="user-profile__profile-pic"
          ></img>
          <h3 className="user-details">{user.name}</h3>
          <p className="user-details">{user.username}</p>
        </section>
      <button
      className={"login__button " + theme}
        type="button"
        onClick={LogOut}
      >
        Logout
      </button>
    </div>
  );
}

export default LoggedIn;
