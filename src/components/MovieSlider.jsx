import React from "react";
import { A11y, Navigation, Scrollbar } from "swiper/modules";
// yarn add swiper
//swiperjs.com  --> 사용법 확인하기
import { Swiper, SwiperSlide } from "swiper/react";

//스와이퍼 css
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import styled from "styled-components";

export default function MovieSlider({ movies, title, rate, type }) {
  return (
    <>
      <MovieSliderItem>
        <h2 className="movieTitle">{title}</h2>
        <Swiper
          modules={[Navigation, Scrollbar, A11y]}
          spaceBetween={40}
          slidesPerView={6}
          navigation
          scrollbar={{ draggable: true }}
        >
          {movies.map((movie, idx) => (
            <SwiperSlide key={movie.id}>
              <div className={`sliderList ${rate ? "rate" : ""}`}>
                {rate && (
                  <div
                    className={`rateNum ${
                      idx === movies.length - 1 ? "last" : ""
                    }`}
                  >
                    {idx + 1}
                  </div>
                )}
                <div className="sliderImg">
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    alt={movie.title}
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </MovieSliderItem>
    </>
  );
}

const MovieSliderItem = styled.div`
  padding: 40px 50px;
  box-sizing: border-box;

  .swiper {
    overflow: visible !important;
  }
  .movieTitle {
    font-size: 40px;
    position: relative;
    color: #fff;
    margin-bottom: 24px;
  }

  .sliderList img {
    width: 100%;
    border-radius: 5px;
    cursor: pointer;
  }

  .sliderList.rate {
    position: relative;
  }

  .sliderList.rate .rateNum {
    position: absolute;
    top: 0px;
    left: 30px;
    /* transform: translateY(-60%); */
    line-height: 150px;
    font-size: 200px;
    color: #000;
    -webkit-text-stroke: 4px gray;
    -webkit-text-fill-color: #000;
  }

  .sliderList.rate .rateNum.last {
    letter-spacing: -50px;
    left: -20px;
  }

  .sliderList.rate .sliderImg {
    position: relative;
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }

  .sliderList.rate .sliderImg img {
    object-fit: cover;
    width: 50%;
    position: relative;
  }
`;
