import React from "react";
import { authService } from "fbase";
import { useHistory } from "react-router-dom";

const Profile = () => {
  /* 기록 객체를 사용할 수 있는 hook */
  const history = useHistory();
  const onLogOutClick = () => {
    /* firebase의 로그아웃 */
    authService.signOut();
    /* home으로 보내는 방법 */
    history.push("/");
  };
  return (
    <>
      <button onClick={onLogOutClick}>Sing Out</button>
    </>
  );
};
export default Profile;
