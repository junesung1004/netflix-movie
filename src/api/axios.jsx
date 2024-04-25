//tmdb사이트 무비 api key : f3e6264446e1c7dcaf92e04a2a0a6a68
//yarn add axios   --> 엑시오스 라이브러리 설치

import axios from "axios";

/*
axios
node.js및 브라우저에 사용할 수 있는 http기반 클라이언트 라이브러리
외부 api와의 비동기 통신을 해주는 역할을 함
*/

const API_KEY = "f3e6264446e1c7dcaf92e04a2a0a6a68";
//보통은 api-key같은 경우 개인 고유번호이기 때문에 노출되지 않도록 해야 하지만 현재 상태로는
//서버에 올라갈 경우(github) api-key가 그대로 노출되기 때문에 환경변수로 분리해서 작업하는 방향을 선택
const BASE_URL = "https://api.themoviedb.org/3"; //api를 통해 정보를 받아올 url의 공통 주소를 변수화

const instance = axios.create({
  //axios.create() 함수는 새로운 axios 인스턴스를 생성해서 외부 api와 연결
  //변수를 컴포넌트 내부에서 호출하게 되면 연결된 api와 연결이 시작됨

  baseURL: BASE_URL, // baseURL은 고정된 키로 모든 HTTP 요청의 기본 주소를 설정
  params: {
    api_key: API_KEY,
    language: "ko-KR", //기본 통신 언어 설정
  },
});

//영화목록 가져오기
export const getMovies = async (type) => {
  try {
    const res = await instance.get(`/movie/${type}`);
    console.log(res.data.results);
    return res.data.results;
  } catch (err) {
    console.log("err :", err);
  } // catch 에러를 출력
};

//메인 비디오 설정
export const getVideos = async (movieId) => {
  try {
    const res = await instance.get(`movie/${movieId}/videos`);
    //console.log(res);
    //console.log(movieId);
    //console.log(res.data);
    //console.log(res.data.results);
    return res.data.results;
  } catch (err) {
    console.log("err : ", err);
  }
};

//장르 가져오기
export const getGenre = async () => {
  try {
    const res = await instance.get(`/genre/movie/list`);
    //console.log(res);
    return res.data.genres;
  } catch (err) {
    console.log("err :", err);
  }
};

export default instance; // 함수가 아닌 변수선언의 경우 export default를 따로 작성해야 한다.
