import { authService } from "fbase";
import React, { useState } from "react";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);

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
      console.log(error);
    }
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
      <div>
        <button>Countinue with Google</button>
        <button>Countinue with Github</button>
      </div>
    </div>
  );
};
export default Auth;
