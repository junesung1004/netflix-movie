import { useEffect, useState } from "react";
import instance, { getMovies, getVideos } from "../api/axios";
import ReactPlayer from "react-player";
import styled from "styled-components";
import { motion } from "framer-motion";
import Button from "./Button";

export default function MainVideo() {
  const [videoKey, setVideoKey] = useState(null);
  const [randomMovie, setRandomMovie] = useState("");

  useEffect(() => {
    async function movieData() {
      try {
        const movies = await getMovies("now_playing"); //메인 비디오에 들어갈 목록을 가져옴
        console.log(movies);
        const randomMovie = movies[Math.floor(Math.random() * movies.length)];
        // console.log(randomMovie)
        setRandomMovie(randomMovie);
        const videos = await getVideos(randomMovie.id);
        // console.log(videos[0])
        // 외부에서 api를 사용할때 문제점 중 하나가 cors문제가 생긴다.
        //
        // setVideoKey(videos[0].key);
        if (videos.length > 0) {
          setVideoKey(videos[0].key);
        } else {
          console.log("비디오를 받아오지 못했습니다.");
        }
      } catch (error) {
        console.error(error);
      }
    }
    movieData();
  }, []);
  return (
    <MainVideoContainer>
      {/* 
            리액트 플레이어
            리액트 자체에서 동영상을 컨트롤 할 수 있는 라이브러리
            외부(유튜브, 비메오 )에서 동영상을 공유할 경우 바로 iframe으로 생성이 되는데
            react-player로 랩핑해서 컨트롤 하기 쉽도록 환경을 구성해준다.

            이벤트와 같은 리액트 기능을 제공한다.
            비디오 태그와 비슷한 기능을 제공한다.
            
            */}
      <VideoWrapper>
        <ReactPlayer
          url={`https://youtu.be/${videoKey}`}
          muted={true}
          controls={false}
          width="100%"
          height="100%"
          playing={true}
        />
      </VideoWrapper>

      <VideoInfoWrapper>
        <motion.h2
          initial={{
            transform: "scale(1.2)",
            transformOrigin: "left bottom",
          }}
          animate={{
            transform: "scale(1) translateY(50px)",
            transition: { delay: 3, duration: 0.7 },
          }}
        >
          {randomMovie.title}
        </motion.h2>
        <motion.p
          initial={{
            transform: "scale(1)",
          }}
          animate={{
            transform: "scale(0)",
            transition: { delay: 3, duration: 0 },
          }}
        >
          {randomMovie.overview}
        </motion.p>

        <BtnsWrapper>
          <Button accent="accent">재생</Button>

          <Button>상세정보</Button>
        </BtnsWrapper>
      </VideoInfoWrapper>
    </MainVideoContainer>
  );
}

const MainVideoContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
`;
const VideoWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const VideoInfoWrapper = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  padding: 0px 60px;
  h2 {
    color: #fff;
    font-size: 100px;
    font-weight: bold;
    margin-bottom: 24px;
  }
  p {
    font-size: 20px;
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    line-height: 1.5;
    color: #fff;
    width: 50%;
    margin-bottom: 24px;
  }
`;
const BtnsWrapper = styled.div`
  display: flex;
  gap: 12px;
`;
