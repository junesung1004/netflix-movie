/*
axios
node.js및 브라우저에 사용할 수 있는 http기반 클라이언트 라이브러리
외부 api와의 비동기 통신을 해주는 역할을 함
yarn add axios

*/

import axios from "axios";

const API_KEY = "82776dd4e021405937c471b1f995902b";
//보통은 apikey같은 경우 개인 고유번호이기 때문에 노출되지 않도록 해야 하지만 현재 상태로는
//서버에 올라갈 경우(github) apikey가 그대로 노출되기 때문에 보통은 환경변수로 분리해서 작업하는 방향을 선택
const BASE_URL = "https://api.themoviedb.org/3"; //api를 통해 정보를 받아올 url의 공통 주소를 변수화

const instance = axios.create({
  //axios.create()함수는 새로운 axios 인스턴스를 생성해서 외부 api와 연결
  //변수를 컴포넌트 내부에서 호출하게 되면 연결된 api와 연결이 시작됨

  baseURL: BASE_URL, //baseURL은 고정된 키로 모든 http 요청의 기본 주소를 설정
  params: {
    api_key: API_KEY,
    language: "ko-KR", //기본 통신 언어 설정
  },
});

// 영화 목록 가져오기
export const getMovies = async (type) => {
  try {
    const res = await instance.get(`/movie/${type}`);
    //movie/movie/movieid
    return res.data.results;
  } catch (error) {
    console.error(error);
    //catch = 에러를 출력
  }
};

//메인 비디오 설정
export const getVideos = async (movieId) => {
  try {
    const res = await instance.get(`movie/${movieId}/videos`);
    return res.data.results;
  } catch (error) {
    console.error(error);
  }
};

//장르 가져오기
export const getGenre = async () => {
  try {
    const res = await instance.get("/genre/movie/list");

    return res.data.genres;
  } catch (error) {
    console.error(error);
  }
};
//영화 장르별로 출력
export const getMovieGenres = async (genreId) => {
  try {
    const res = await instance.get(`/discover/movie`, {
      params: {
        with_genres: genreId,
      },
    });
    return res.data.results;
  } catch (error) {
    console.error(error);
  }
};

//tv 프로그램 출력
export const getTv = async (type) => {
  try {
    const res = await instance.get(`tv/${type}`);
    return res.data.results;
  } catch (error) {
    console.error(error);
  }
};

/*
getVideos와 getMovieGerens의 호출방식이 다른이유

getVideos는 요청하는 api의 url주소에 매개변수로 전달하는 타입명이 포함되어 있기 때문에 바로 호출이 가능하지만
getMovieGenres에서는 api의 url 주소에 genres를 구분하는 코드가 들어가 있지 않으므로
파라메터로 사용하여 전달하는 방식으로 해결
with_genres 는 tmdb에서 사용하는 파라메타 명으로 특정 장르 id를 필터링할때 사용됨

*/

export const getModalDetail = async (movieId, type) => {
  try {
    const res = await instance.get(`${type}/${movieId}`);
    console.log(res);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const getSearchResults = async (keyword) => {
  try {
    const res = await instance.get(`search/multi?query=${keyword}`);
    //console.log(res)
    return res.data.results;
  } catch (error) {
    console.error(error);
  }
};

export default instance; //함수가 아닌 변수선언의 경우 export default를 따로 작성해야 한다.
