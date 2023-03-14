import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getTopics } from "../utils/api";

function Navigation({ setTopicList, topicList }) {
  const navigate = useNavigate();
  const [description, setDescription] = useState(topicList[0].description)

  useEffect(() => {
    getTopics().then(({ topics }) => {
      setTopicList([...topicList, ...topics]);
    });
  }, []);

  const handleChange = (slug) => {
    setDescription(topicList.find((topic) => {
      return topic.slug === slug
    }).description)
    navigate(`/${slug}`);
  };

  return (
    <>
    <h2 className="navigation__description">{description}</h2>
    <nav className="navigation">
      Topic:
      <select className="navigation__select"
        onChange={(event) => {
          handleChange(event.target.value);
        }}
      >
        {topicList.map((topic) => {
          return <option key={topic.slug}> {topic.slug}</option>;
        })}
      </select>
    </nav>
        </>
  );
}

export default Navigation;
