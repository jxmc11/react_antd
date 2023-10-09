import React from "react";

type PropsType = {
  message: string;
};

const Hello: React.FC<PropsType> = (props) => {
  return (
    <>
      <h2>hello {props.message}</h2>
    </>
  );
};

export default Hello;
