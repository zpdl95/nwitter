1. npx create-react-app 으로 생성
2. test관련 필요없는 파일 삭제
3. `https://console.firebase.google.com/`에서 firebase콘솔에 들어가 프로젝트 생성
4. npm install firebase -> firebase SDK 추가 그리고 초기화구성코드 작성 (영상처럼 코드를 사용하려면 구버전호환 방식을 사용해야함)`https://firebase.google.com/docs/web/modular-upgrade`
5. npm i react-router-dom@5.3.0 -> 리액트 라우터는 리액트의 화면 전환을 도와주는 역할을 한다. 일반적인 웹에서 a태그를 이용해 다른 페이지로 이동했었다면, 리액트에서는 React-Router 를 통해 Link 태그를 사용하여 화면을 전환한다. 리액트는 변화가 있는 컴포넌트만 업데이트하여 효율적으로 성능을 관리하는 구조로 페이지 이동 시 굳이 화면 전체를 새로고침 할 필요가 없기 때문이다. // 영상에서는 v5버전을 사용함으로 버전을 정해서 다운로드, 현재는 v6(2021년 11월 12일)가 나옴
6. firebase에서 Authentication설정, github에서 Developer setting에 있는 OAuth Apps 설정
7. firebase에서 DB설정
