import { AiOutlineClose } from "react-icons/ai";
import { useContext } from "react";
import { UserContext } from "../../contexts/User";
import { ThemeContext } from "../../contexts/Theme";
import { motion as m, AnimatePresence } from "framer-motion";
import LoginForm from "./LoginForm";
import LoggedIn from "./LoggedIn";

function LoginPopOut({ setPopUp }) {
  const { user } = useContext(UserContext);
  const { theme } = useContext(ThemeContext);
  const isUser = Object.keys(user).length;

  return (
    <div className="container">
      <AnimatePresence>
        <m.div
          initial={{
            scale: 0.9,
            opacity: 0,
            filter: "blur(2px)",
          }}
          animate={{
            scale: 1,
            opacity: 1,
            filter: "blur(0px)",
          }}
          exit={{
            opacity: 0,
          }}
          transition={{ duration: 0.2, ease: "easeIn" }}
          key={"popup-window"}
          className={"popup-window " + theme}
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
        </m.div>
      </AnimatePresence>
    </div>
  );
}

export default LoginPopOut;
