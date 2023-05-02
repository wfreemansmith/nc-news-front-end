import { motion as m } from "framer-motion";

const transitions = {
  slide: {
    initial: { opacity: 0, y: "10vh" },
    animate: { opacity: 1, y: "0vh" },
    exit: { opacity: 0, x: "0%" },
    transition: { ease: "easeOut", duration: 1 },
  },
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 1 },
  },
  popup: {
    initial: {
      scale: 0.9,
      opacity: 0,
      filter: "blur(2px)",
    },
    animate: {
      scale: 1,
      opacity: 1,
      filter: "blur(0px)",
    },
    exit: {
      opacity: 0,
    },
    transition: { duration: 0.2, ease: "easeIn" },
  },
  leftright: {
    initial: { opacity: 0, x: "-10vw" },
    animate: { opacity: 1, x: "0vw" },
    exit: { opacity: 0, x: "10vw" },
    transition: { duration: 0.5 },
  },
};

function Transition({ children, option }) {
  return (
    <m.div
      variants={transitions[option]}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={transitions[option].transition}
    >
      {children}
    </m.div>
  );
}

export default Transition;
