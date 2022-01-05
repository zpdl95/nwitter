import React from "react";
import { useState } from "react/cjs/react.development";

const Home = () => {
  const [nweet, setNweet] = useState("");
  const onSubmit = (event) => {
    event.preventDefault();
    setNweet("");
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNweet(value);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          value={nweet}
          type={"text"}
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <input type={"submit"} value={"Nweet"} />
      </form>
    </div>
  );
};
export default Home;
