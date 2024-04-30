import { BiSearch } from "react-icons/bi";
import { MdClose } from "react-icons/md";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useState } from "react";
import { getSearchResults } from "../api/aixos";
import MovieItem from "./MovieItem";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { getGenre } from "../api/aixos";
import { imgVariants } from "../pages/hoverVariants";
import { infoVariants } from "../pages/hoverVariants";

//yarn add framer-motion
/*
리액트에서 사용하는 애니메이션 라이브러리
리액트의 특성상 생명주기를 기반으로 컴포넌트를 불러오는 방식이기 때문에 애니메이션이 연결될때 
보통 일반적으로 사용하는 css속성을 기반으로 컨트롤

initial : 초기값
animate : 컴포넌트가 동적인 상태를 통해서 최종적으로 변경될 속성 값
*/
export default function Search() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [clearBtn, setClearBtn] = useState(false);
  const [movieList, setMovieList] = useState([]);

  const navigate = useNavigate();
  const { category, movieId } = useParams();
  const [genres, setGenres] = useState({});

  //장르 텍스트 변환하기
  useEffect(() => {
    const fetchGenres = async () => {
      const genresData = await getGenre();
      const genreMap = genresData.reduce((acc, genre) => {
        acc[genre.id] = genre.name;
        return acc;
      }, {});
      setGenres(genreMap);
    };
    fetchGenres();
  }, []);

  //검색창 오픈 이벤트
  const inputOpenEvent = () => {
    setSearchOpen((open) => !open);
  };

  //검색창 내용 삭제 이벤트
  const onClearEvent = (e) => {
    e.preventDefault();
    setClearBtn(false);
    setKeyword("");
    setMovieList([]);
  };

  //검색 이벤트 실행
  const handleChange = (e) => {
    setKeyword(e.target.value);
    setClearBtn(keyword.trim() !== "");
  };
  const handleKeyDown = async (e) => {
    if (e.key === "Enter" && keyword.trim()) {
      e.preventDefault();
      setClearBtn(true);
      const searchUrl = `/search?keyword=${keyword}`;
      navigate(searchUrl, { state: { keyword } });
      // console.log(searchUrl, { state: { keyword } });
      setKeyword("");
    }
  };

  //모달 확인

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
          <button type="button" className="search-btn" onClick={inputOpenEvent}>
            <BiSearch />
          </button>
          <motion.input
            type="text"
            initial={{ width: 0 }}
            animate={{ width: searchOpen ? 200 : 0 }}
            transition={{ duration: 0.3 }}
            placeholder="검색어를 입력하세요"
            value={keyword}
            // onChange={(e)=>{
            //     setClearBtn(e.target.value.trim !== '');
            //     //앞뒤의 공백을 모두 제거해서 빈 문자열인지 검사
            //     setKeyword(e.target.value)
            // }}

            onChange={handleChange}
            onKeyDown={handleKeyDown}
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
  }
  .search-btn {
    color: #fff;
    font-size: 30px;
    display: flex;
    align-items: center;
  }

  input[type="text"] {
    padding: 5px;
    background: transparent;
    border: none;
    outline: none;
    color: #fff;
  }

  .clear-btn {
    color: #fff;
    font-size: 20px;
    display: flex;
    align-items: center;
    margin-left: auto;
    z-index: 99;
  }
`;

const ResultContainer = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background: black;
  z-index: -1;
  padding: 10px;
  padding-top: 100px;
  box-sizing: border-box;
  display: none;
  &.on {
    display: block;
  }
  h3 {
    color: white;
    font-size: 50px;
    font-weight: bold;
    margin-bottom: 100px;
    text-align: center;
  }

  .searchList {
    max-width: 80%;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin: 0px auto;
    gap: 40px 0px;
    > div {
      width: 30%;
    }
  }
`;
