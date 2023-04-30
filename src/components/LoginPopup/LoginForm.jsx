import { useContext, useState } from "react";
import { UserContext } from "../../contexts/User";
import { ThemeContext } from "../../contexts/Theme";
import { getUserByUsername } from "../../utils/api";

function LoginForm({setPopUp}) {
  const { setUser } = useContext(UserContext);
  const { theme } = useContext(ThemeContext);

  const [username, setUsername] = useState("tickle122");
  const [password, setPassword] = useState("password");
  const [validation, setValidation] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!password.length) {
      setValidation("password");
      return;
    }

    setValidation("in-progress");

    getUserByUsername(username)
      .then(({ user }) => {
        setUser(user);
        setPopUp(false);
      })
      .catch((err) => {
        console.log(err);
        setValidation("username");
      });
  };

  return (
    <form className="login__form" onSubmit={handleSubmit}>
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
      <button type="submit" className={"login__button " + theme}>
        {validation === "in-progress" ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}

export default LoginForm;
