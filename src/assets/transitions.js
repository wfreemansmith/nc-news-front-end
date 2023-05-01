export const slide = {
  initial: { opacity: 0, y: "10vh" },
  animate: { opacity: 1, y: "0vh" },
  exit: { backgroundColor: "red", opacity: 0, x: "0%" },
  transition: { ease: "easeOut", duration: 1 },
};

export const fade = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 1}
}
