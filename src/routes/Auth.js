import { authService, fireBase } from "fbase";
import React, { useState } from "react";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");
  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      let data;
      if (newAccount) {
        /* firebase의 유저생성코드 */
        /* 유저생성을 해도 자동로그인 시켜줌 */
        /* 로그인유지의 단계가 ['local','session','none']이 있다 */
        /* local: 브라우저가 켜져있으면 유지
            session: 탭이 켜져있으면 유지
            none: 유지 안 함 */
        data = await authService.createUserWithEmailAndPassword(
          email,
          password
        );
      } else {
        /* firebase의 로그인코드 */
        data = await authService.signInWithEmailAndPassword(email, password);
      }
      console.log(data);
    } catch (error) {
      setError(error.message);
      alert(error.message);
    }
  };

  const toggleAccount = () => setNewAccount((prev) => !prev);
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
      <form onSubmit={onSubmit}>
        <input
          name="email"
          type={"text"}
          placeholder="Email"
          required
          value={email}
          onChange={onChange}
        />
        <input
          name="password"
          type={"password"}
          placeholder="Password"
          required
          value={password}
          onChange={onChange}
        />
        <input
          type={"submit"}
          value={newAccount ? "Create Account" : "Log In"}
        />
      </form>
      <span onClick={toggleAccount}>
        {newAccount ? "Log In" : "Create Account"}
      </span>
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
