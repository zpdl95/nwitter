import Nweet from "components/Nweet";
import { dbService } from "fbase";
import React, { useEffect } from "react";
import { useState } from "react/cjs/react.development";

const Home = ({ userObj }) => {
  const [nweet, setNweet] = useState("");
  const [nweets, setNweets] = useState([]);

  useEffect(() => {
    getNweets();
  }, []);

  const getNweets = () => {
    /* callback함수가 아니라 await를 사용하지 않음 */
    /* orderby를 사용하여 정령된 리스트를 받음 */
    /* onSnapshot은 실시간 모든 데이터베이스이벤트에 반응함 */
    dbService
      .collection("nweets")
      .orderBy("createAt", "desc")
      .onSnapshot((snapshot) => {
        const nweetArray = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log(nweetArray);
        setNweets(nweetArray);
      });
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.collection("nweets").add({
      text: nweet,
      createAt: new Date().toLocaleString(),
      creatorId: userObj.uid,
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
      <div>
        {nweets.map((nweet) => (
          <Nweet
            key={nweet.id}
            nweetObj={nweet}
            /* 이 트윗 작성자가 로그인한 유저인이 판단 */
            isOwner={nweet.creatorId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};
export default Home;

/* noSQL DB는 collection이라는 폴더를 생성하고 document라는 자료를 넣어 만든 것이다 */
