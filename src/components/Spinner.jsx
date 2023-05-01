import { motion as m, AnimatePresence } from "framer-motion";

function Spinner() {
  return (
    <AnimatePresence>
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, y: -100 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        key="spinner-container"
        className="spinner-container"
      >
        <m.div
          animate={{ rotate: 360 }}
          transition={{
            type: "tween",
            repeat: Infinity,
            duration: 2,
            ease: "easeInOut",
  
          }}
          key="spinner"
          className="spinner"
        ></m.div>
      </m.div>
    </AnimatePresence>
  );
}

export default Spinner;
