import { dbService } from "fbase";
import React from "react";
import { useState } from "react/cjs/react.development";

const Home = () => {
  const [nweet, setNweet] = useState("");
  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.collection("nweets").add({
      nweet,
      createAt: Date.now(),
    });
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

/* noSQL DB는 collection이라는 폴더를 생성하고 document라는 자료를 넣어 만든 것이다 */
