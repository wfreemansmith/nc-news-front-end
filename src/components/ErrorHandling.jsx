function ErrorHandling({ errCode, errMsg }) {

  console.log({ errCode, errMsg });
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
