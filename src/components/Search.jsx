import React, { useState } from "react";
import { BiSearch } from "react-icons/bi";
import styled from "styled-components";
import { motion, useScroll } from "framer-motion";
import { MdClose } from "react-icons/md";

//yarn add react-icons   --> 리액트 아이콘 라이브러리
// yarn add framer-motion  --- > 리액트 애니메이션 라이브러리
/*
yarn add framer-motion : 리액트에서 사용하는 애니메이션 라이브러리
리액트의 특성상 생명주기를 기반으로 컴포넌트를 불러오는 방식이기 때문에 애니메이션이 연결될때
보통 일반적으로 사용하는 css속성을 기반으로 컨트롤

initail : 초기값
animate : 컴포넌트가 동적인 상태를 통해서 최종적으로 변경될 속성 값
*/

export default function Search() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [clearBtn, setClearBtn] = useState(false);

  //검색창 오픈 이벤트
  const inputOpenEvent = () => {
    setSearchOpen((open) => !open);
  };

  //검색창 내용 삭제 이벤트
  const onClearEvent = (e) => {
    e.preventDefault();
    setClearBtn(false);
    setKeyword("");
  };

  return (
    <>
      <SearchForm>
        <motion.div
          initial={{ width: 30 }}
          animate={{
            width: searchOpen ? 250 : 30,
            borderColor: `rgba(255,255,255,${searchOpen ? "0.5" : "0"})`,
            transition: { duration: 0.5 },
          }}
        >
          <button type="button" onClick={inputOpenEvent} className="search-btn">
            <BiSearch />
          </button>
          <input
            type="text"
            placeholder="검색어를 입력하세요"
            initial={{ width: 0 }}
            animate={{ width: searchOpen ? 200 : 0 }}
            transition={{ duration: 0.3 }}
            value={keyword}
            onChange={(e) => {
              setClearBtn(e.target.value.trim !== "");
              //앞뒤의 공백을 모두 제거해서 빈 문자열인지 검사
              setKeyword(e.target.value);
            }}
          />
          {clearBtn && (
            <button className="clear-btn" onClick={onClearEvent}>
              <MdClose />
            </button>
          )}
          {/* 초기화 버튼을 조건부로 생성 */}
        </motion.div>
      </SearchForm>
    </>
  );
}

const SearchForm = styled.form`
  display: flex;
  position: relative;
  top: 0px;
  left: 0px;
  div {
    border: solid 1px transparent;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 250px;
    padding: 5px;
    box-sizing: border-box;
    border-radius: 5px;
    margin-right: 20px;
  }
  .search-btn {
    color: white;
    font-size: 30px;
    display: flex;
    align-items: center;
  }

  input[type="text"] {
    width: 180px;
    padding: 5px;
    background: transparent;
    border: none;
    outline: none;
    color: white;
    margin-left: 20px;
  }

  .clear-btn {
    color: white;
    font-size: 20px;
    display: flex;
    align-items: center;
    margin-left: auto;
    z-index: 99;
  }
`;
