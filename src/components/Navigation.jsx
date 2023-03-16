import { useNavigate } from "react-router-dom";

function Navigation({ topicList, setDescription, description, setErrCode, setErrMsg }) {
  const navigate = useNavigate();

  const handleChange = (slug) => {
    navigate(`/topics/${slug}`);
    setDescription(
      topicList.find((topicItem) => topicItem.slug === slug).description
    );
    setErrCode(null);
    setErrMsg(null);
  };


  return (
    <>
      <h2 className="navigation__description">{description}</h2>
      <nav className="navigation">
        <label htmlFor="navigation-menu">Topic:</label>
        <select
          id="navigation-menu"
          className="navigation__select"
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
    </>
  );
}

export default Navigation;
