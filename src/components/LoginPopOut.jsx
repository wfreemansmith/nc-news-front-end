import { GrFormClose } from "react-icons/gr";
import { useContext, useState } from "react";
import { UserContext } from "../contexts/User";
import { getUserByUsername } from "../utils/api";

function LoginPopOut({ setLogin }) {
  const { user, setUser } = useContext(UserContext);
  const isUser = Object.keys(user).length;

  const [username, setUsername] = useState("tickle122");
  const [password, setPassword] = useState("password");
  const [validation, setValidation] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!password.length) {
      setValidation("password");
      return;
    }

    setValidation("in-progress")

    getUserByUsername(username)
      .then(({user}) => {
        setUser(user);
        setLogin(false)
      })
      .catch((err) => {
        console.log(err);
        setValidation("username");
      });
  };

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
        <form className="login-form" onSubmit={handleSubmit}>
          <label>Username</label>
          <input
            value={username}
            className={validation === "username" ? "error" : ""}
            onChange={(event) => {
              setValidation("");
              setUsername(event.target.value);
            }}
          ></input>
          <label>Password</label>
          <input
            value={password}
            className={validation === "password" ? "error" : ""}
            onChange={(event) => {
              setValidation("");
              setPassword(event.target.value);
            }}
            type="password"
          ></input>
          <button type="submit">{validation === "in-progress" ? "Logging in..." : "Login"}</button>
        </form>
      </div>
    </div>
  );
}

export default LoginPopOut;
