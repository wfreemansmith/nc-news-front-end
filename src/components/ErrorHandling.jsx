import { useLocation } from "react-router-dom";

function ErrorHandling() {
  const location = useLocation();

  const { errCode, errMsg } = location.state
    ? location.state
    : { errCode: 404, errMsg: "Page not found" };
  
    return (
    <div>
      {errCode ? (
        <>
          <p className="err-msg">{errMsg}</p>
          <p className="err-code">{errCode}</p>
        </>
      ) : (
        <p className="err-msg">Something went wrong!</p>
      )}
    </div>
  );
}

export default ErrorHandling;
