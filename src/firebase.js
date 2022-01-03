import firebase from "firebase/compat/app";

/* 환경설정값을 사용하는 이유는 github때문이지 빌드할때 숨기기 위함이 아님. 빌드하면 다 값이 원래값으로 바뀜 */
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGIN_ID,
  appId: process.env.REACT_APP_APP_ID,
};
export const fireBase = firebase.initializeApp(firebaseConfig);
