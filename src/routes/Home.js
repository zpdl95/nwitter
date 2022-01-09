import React, { useEffect, useState } from "react";
import { dbService } from "fbase";
import Nweet from "components/Nweet";
import NweetFactory from "components/NweetFactory";

const Home = ({ userObj }) => {
  const [nweets, setNweets] = useState([]);

  useEffect(() => {
    getNweets();
    /* router 이동시 메모리 lack 에러 대처법 */
    return () => setNweets([]);
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
        setNweets(nweetArray);
      });
  };

  return (
    <div className="container">
      <NweetFactory userObj={userObj} />
      <div style={{ marginTop: 30 }}>
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
