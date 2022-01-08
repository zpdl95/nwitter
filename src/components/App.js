import React, { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  /* 유저정보에 대한 state는 앱의 최상위치에 있어야한다 */
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    /* 로그인상태에 대한 이벤트가 발생하면 실행됨 */
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserObj(user);
      } else {
        setIsLoggedIn(false);
        setUserObj(null);
      }
      setInit(true);
    });
  }, []);
  /* 이 함수는 user의 profile을 업데이트 한 뒤 새롭게 userObj를 구하기 위해 작동 */
  const refreshUser = () => {
    /* ↓ 처럼 작성한 이유는 userObj의 값은 가진 상태로 state를 변경시키기 위해(참조값이 다르고 가진값은 같은 형태) */
    /* React는 참조값이 같으면 같은 Object로 인식해서 state를 변경하지 않음 */
    setUserObj({ ...authService.currentUser });
    /* ↓ 처럼 작성한 이유는 userObj가 가지고 있는 함수를 실행시키기 위해(firebase와 연결 돼있는 상태여야함) */
    setUserObj(authService.currentUser);
  };

  return (
    <>
      {init ? (
        <AppRouter
          refreshUser={refreshUser}
          isLoggedIn={isLoggedIn}
          userObj={userObj}
        />
      ) : (
        "Initialization..."
      )}
      <footer>&copy; {new Date().getFullYear()} Nwitter</footer>
    </>
  );
}

export default App;

/* updateProfile()을 실행후 변경된 userObj를 가져와 state를 변경시키고자 하니
참조값이 같은 상황이라 state가 변경되지 않음 */
/* 그래서 전체 userObj를 가져와 사용하지 않고 필요한 부분만 가져와 userObj를 만들어 사용 */

// useEffect(() => {
//   authService.onAuthStateChanged((user) => {
//     if (user) {
//       setUserObj({
//         displayName: user.displayName,
//         uid: user.uid,
//         updateProfile: (args) => user.updateProfile(args),
//       });
//     }
//     setInit(true);
//   });
// }, []);
