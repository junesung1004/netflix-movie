import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getGenre, getSearchResults } from "../api/aixos";
import styled from "styled-components";
import MovieItem from "../components/MovieItem";
import { imgVariants, infoVariants } from "./hoverVariants";
import Modal from "../components/Modal";

export default function SearchResults() {
  const navigate = useNavigate();
  const [genres, setGenres] = useState([]);
  const { movieId } = useParams();
  console.log("movieId :", movieId);

  //경로 받아오기
  const location = useLocation();
  //useLocation = 현재 url의 정보를 객체 형태로 분리해서 반환
  //url에 있는 정보들 pathname, 쿼리스트링문, state같은 정보를 객체로 분리해서 반환
  //console.log("location :", location);

  const queryParams = new URLSearchParams(location.search);
  //URLSearchParams = url에 있는 쿼리 스트링을 가져올 수 있는 api
  //location.search를 인자로 받아서 쿼리스트링(`?key=값`)방식으로 파싱해서 변수로 생성
  //값으로 출력되는게 아닌 키와 값으로 이루어진 객체를 생성 값대신 갯수로 표시된다.
  //console.log(queryParams);

  const keyword = location.state?.keyword || queryParams.get("keyword");
  //keyword 값 2가지 형태로 추출 즉 키워드를 추출한다(최대한 오류없이 받아오기 위해)
  //location.state?.keyword => 라우트 상태객체에서 keyword값 추출
  //queryParams.get("keyword") => url쿼리 스트링에서 key값 추출
  //console.log(keyword);

  const { isLoading, error, data } = useQuery(["search", keyword], () =>
    getSearchResults(keyword)
  );
  console.log("data: ", data);

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
  const getGenresNames = (genreId) => {
    return genreId.map((id) => genres[id]).join(", ");
  };

  //관람등급 표시 추가
  const getRating = (adult) => {
    return adult ? "청소년불가" : "전체 관람가능";
  };

  const handleMovieClick = (movieId) => {
    navigate(`${movieId}`, { state: { keyword } });
  };

  const clickMovie = data?.find((search) => `${search.id}` === movieId);
  //data를 바로 출력하지 않고 data 로딩 여부를 확인 후 find 실행

  return (
    <>
      {(!data || data.length === 0) && (
        <h2 className="resultText">검색 결과가 없습니다.</h2>
      )}
      {data && (
        <ResultContainer>
          <div className="searchMoive">
            <h2>{keyword}로 검색한 결과입니다.</h2>
            <div className="searchResultList">
              {data.map((movie, idx) => (
                <MovieItem
                  key={movie.id}
                  movie={movie}
                  idx={idx}
                  rate={movie.rate}
                  // navigate={navigate}
                  type={movie.type}
                  movieId={movie.id}
                  imgVariants={imgVariants}
                  infoVariants={infoVariants}
                  getRating={getRating}
                  getGenresNames={getGenresNames}
                  handleMovieClick={handleMovieClick}
                />
              ))}
            </div>
          </div>
          {clickMovie && <Modal movie={clickMovie} type={"search"} />}
        </ResultContainer>
      )}
    </>
  );
}

const ResultContainer = styled.div`
  width: 100%;
  height: 100%;
  background: black;
  padding: 10px;
  padding-top: 200px;
  box-sizing: border-box;
  .resultText {
    color: #fff;
    font-size: 50px;
    font-weight: bold;
    text-align: center;
  }
  h2 {
    color: white;
    font-size: 50px;
    font-weight: bold;
    margin-bottom: 100px;
    text-align: center;
  }

  .searchResultList {
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
