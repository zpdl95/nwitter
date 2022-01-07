import React, { useEffect } from "react";
import { authService, dbService } from "fbase";
import { useHistory } from "react-router-dom";

const Profile = ({ userObj }) => {
  /* 기록 객체를 사용할 수 있는 hook */
  const history = useHistory();

  const onLogOutClick = () => {
    /* firebase의 로그아웃 */
    authService.signOut();
    /* home으로 보내는 방법 */
    history.push("/");
  };

  const getMyNweets = async () => {
    /* where을 사용해서 색인을 하려면 firebase의 firestorage에 가서 색인설정을 해줘야 한다 */
    const nweets = await dbService
      .collection("nweets")
      .where("creatorId", "==", userObj.uid)
      .orderBy("createAt", "desc")
      .get();
  };

  useEffect(() => {
    getMyNweets();
  });

  return (
    <>
      <button onClick={onLogOutClick}>Sing Out</button>
    </>
  );
};
export default Profile;
