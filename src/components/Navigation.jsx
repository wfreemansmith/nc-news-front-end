import { useNavigate } from "react-router-dom";

function Navigation({ topicList, setDescription, description }) {
  const navigate = useNavigate();
  
  const handleChange = (slug) => {
    navigate(`/${slug}`);
    setDescription(
      topicList.find((topicItem) => topicItem.slug === slug).description
    );
  };
  

  return (
    <>
      <h2 className="navigation__description">{description}</h2>
      <nav className="navigation">
        Topic:
        <select
          className="navigation__select"
          value={""}
          onChange={(event) => {
            handleChange(event.target.value);
          }}
        ><option key="blank"></option>
          {topicList.map((topic) => {
            return <option key={topic.slug}> {topic.slug}</option>;
          })}
        </select>
      </nav>
    </>
  );
}

export default Navigation;
