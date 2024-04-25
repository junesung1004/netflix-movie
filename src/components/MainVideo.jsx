import React, { useEffect, useState } from "react";
import instance, { getMovies, getVideos } from "../api/axios";
import ReactPlayer from "react-player";
import styled from "styled-components";
import { motion } from "framer-motion";
import Button from "./Button";
// yarn add react-player

export default function MainVideo() {
  const [videoKey, setVideoKey] = useState(null);
  const [randomMovie, setRandomMovie] = useState("");
  useEffect(() => {
    async function movieData() {
      try {
        const movies = await getMovies("now_playing"); // 메인 비디오에 들어갈 목록을 가져옴
        //console.log(movies);
        const randomMovie = movies[Math.floor(Math.random() * movies.length)];
        //console.log(randomMovie);
        setRandomMovie(randomMovie);
        const videos = await getVideos(randomMovie.id);
        //console.log(videos);
        if (videos.length > 0) {
          setVideoKey(videos[0].key);
        } else {
          console.log("비디오를 받아오지 못했습니다.");
        }
      } catch (err) {
        console.log("err : ", err);
      }
    }
    movieData();
  }, []);
  return (
    <>
      <MainVidoContainer>
        {/* 리액트 플레이어
        리액트 자체에서 동영상을 컨트롤 할 수 있는 라이브러리
        외부(유튜브, 비메오)에서 동영상을 공유할 경우 바로 ifram으로 생성이 되는데
        react-player로 랩핑해서 컨트롤 하기 쉽도록 환경을 구성한다.

        이벤트와 같은 리액트 기능을 제공한다.
        */}
        <VideoWrapper>
          <ReactPlayer
            url={`https://youtu.be/${videoKey}`}
            muted={true}
            controls={false}
            width={"100%"}
            height={"100%"}
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
              transition: { delay: 3, duration: 1 },
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
            <Button accent={"accent"}>재생</Button>
            <Button accent={"accent"}>상세보기</Button>
          </BtnsWrapper>
        </VideoInfoWrapper>
      </MainVidoContainer>
    </>
  );
}

const MainVidoContainer = styled.div`
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
  top: 60%;
  transform: translateY(-50%);
  padding: 0px 60px;
  h2 {
    color: white;
    font-size: 80px;
    font-weight: bold;
    margin-bottom: 24px;
  }
  p {
    font-size: 20px;
    color: white;
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    line-height: 1.5;
    width: 50%;
  }
`;

const BtnsWrapper = styled.div`
  display: flex;
  gap: 12px;
`;
