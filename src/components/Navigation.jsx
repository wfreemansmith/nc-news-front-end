import { useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Transition from "./Transition";

function Navigation({ topicList, setDescription, description }) {
  const navigate = useNavigate();

  const handleChange = (slug) => {
    navigate(`/topics/${slug}`);
    setDescription(
      topicList.find((topicItem) => topicItem.slug === slug).description
    );
  };

  return (
    <div className="navigation">
      <AnimatePresence mode="wait">
        <Transition option="leftright" key={description}>
          <h2 className="navigation__description">
            {description}
          </h2>
        </Transition>
      </AnimatePresence>
      <nav className="navigation__options">
        <label htmlFor="navigation-menu">Topic:</label>
        <select
          id="navigation-menu"
          className="navigation__menu"
          value={"Topic"}
          onChange={(event) => {
            handleChange(event.target.value);
          }}
        >
          <option value="/"></option>
          {topicList.map((topic) => {
            return <option key={topic.slug}> {topic.slug}</option>;
          })}
        </select>
      </nav>
    </div>
  );
}

export default Navigation;
