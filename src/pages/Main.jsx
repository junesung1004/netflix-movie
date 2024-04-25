import React, { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useQuery } from "react-query";
import { getGenre, getMovies } from "../api/axios";
import MainVideo from "../components/MainVideo";
import MovieSlider from "../components/MovieSlider";

// yarn add react-query

/*
react-query 
state처럼 상태관리를 해주는 라이브러리
query는 데이터를 불러오는 비동기 데이터 방식에서 상태 관리를 쉽게 해주는 특징을 가지고 있다.

*/

export default function Main() {
  useEffect(() => {
    const genreData = async () => {
      const genreList = await getGenre();
      console.log(genreList);
    };
    genreData();
  }, []);

  const {
    data: nowPlaying,
    isLoading: isNowPlayingLoading,
    error: nowPlayingError,
  } = useQuery(["movie", "nowPlaying"], () => getMovies("now_playing"), {
    staleTime: 50000,
  });

  const {
    data: popular,
    isLoading: isPopularLoading,
    error: popularError,
  } = useQuery(["movies", "popular"], () => getMovies("popular"), {
    staleTime: 50000,
  });

  //top_rated, upcomming

  const {
    data: top_rated,
    isLoading: isTopRatedLoading,
    error: topRatedError,
  } = useQuery(["movies", "top_rated"], () => getMovies("top_rated"), {
    staleTime: 50000,
  });

  //console.log("nowPlaying :", nowPlaying);
  if (isNowPlayingLoading || isPopularLoading || isTopRatedLoading)
    return <div>로딩중입니다..</div>;
  if (nowPlayingError || popularError || topRatedError)
    return <div>오류가 발생했습니다.</div>;

  return (
    <>
      <MainVideo />
      <MovieSlider
        movies={nowPlaying.slice(1, 11)}
        title={"TOP 10 시리즈"}
        rate={true}
        type={"nowPlaying"}
      />
      <MovieSlider
        movies={popular.slice(1, 19)}
        title={"현재 인기 있는 영화"}
        type={popular}
      />
      <MovieSlider
        movies={top_rated.slice(1, 13)}
        title={"현재 상위권에 속해있는 영화"}
        type={top_rated}
      />
    </>
  );
}
