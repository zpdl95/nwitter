import AuthForm from "components/AuthForm";
import { authService, fireBase } from "fbase";
import React from "react";

const Auth = () => {
  const onSocialClick = async (event) => {
    const {
      target: { name },
    } = event;
    let provider;
    if (name === "google") {
      /* firebase의 google로그인 방법 */
      provider = new fireBase.auth.GoogleAuthProvider();
    } else if (name === "github") {
      /* firebase의 github로그인 방법 */
      provider = new fireBase.auth.GithubAuthProvider();
    }
    /* firebase의 팝업창 띄워서 로그인 인증 */
    await authService.signInWithPopup(provider);
  };

  return (
    <div>
      <AuthForm />
      <div>
        <button onClick={onSocialClick} name="google">
          Countinue with Google
        </button>
        <button onClick={onSocialClick} name="github">
          Countinue with Github
        </button>
      </div>
    </div>
  );
};
export default Auth;
