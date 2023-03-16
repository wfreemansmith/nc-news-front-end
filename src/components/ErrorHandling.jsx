import { useLocation } from "react-router-dom";

function ErrorHandling() {
  const location = useLocation()

  const errCode = location.state.errCode
  const errMsg = location.state.errMsg

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
