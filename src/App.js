import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import GlobalStyle from "./style/GlobalStyle";
import { Outlet } from "react-router-dom";
/*
outlet
리액트 라우터에서 계층 구조에서 현재 활성화되고 있는 라우트를 랜더링 하는 hook
특정 컴포넌트 내에 위치한 하위 라우트의 컴포넌트를 랜더링 하는 위치

중첩 라우트가 되어 있는 구조에서 상위 컴포넌트의 레이아웃을 유지한채
특정 라우트를 불러와서 표시하는데 사용

*/

function App() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
