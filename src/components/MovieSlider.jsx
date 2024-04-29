import { motion } from 'framer-motion'

import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Navigation, Scrollbar } from "swiper/modules";

//스와이퍼 css
import 'swiper/css';
import 'swiper/css/navigation'
import 'swiper/css/scrollbar';
import styled from "styled-components";
import Button from './Button';

//react-icons
import { FaPlay } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";
import { AiOutlineLike } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";
import { useEffect, useState } from 'react';
import { getGenre } from '../api/aixos';
import { useNavigate, useParams } from 'react-router-dom';
import Modal from './Modal';
import MovieItem from './MovieItem';





export default function MovieSlider({ movies, title, rate, type }) {

    const [genres, setGenres] = useState({})
    const { category, movieId } = useParams();
    const { hoverId, setHoverId } = useState(null)

    const navigate = useNavigate();


    const imgVariants = {
        initial: {
            scale: 1,
            zIndex: 1,
        },
        hover: {
            scale: 1.2,
            zIndex: 99,
            transition: {
                duration: 0.5
            }
        }
    }

    const infoVariants = {
        initial: {
            opacity: 0,
            scale: 1,
            zIndex: 1,
        },
        hover: {
            opacity: 1,
            scale: 1.5,
            zIndex: 99,
            transition: {
                duration: 0.3
            }
        }
    }

    //모달창 생성
    const clickModal = movies.find(movie => {
        return type === category && `${movie.id}` === movieId
    })



    //장르 텍스트 변환하기
    useEffect(() => {
        const fetchGenres = async () => {
            const genresData = await getGenre();
            const genreMap = genresData.reduce((acc, genre) => {
                acc[genre.id] = genre.name;
                return acc
            }, {})
            setGenres(genreMap)
        }
        fetchGenres();
    }, [])
    const getGenresNames = (genreId) => {
        return genreId.map(id => genres[id]).join(", ")
    }

    //관람등급 표시 추가
    const getRating = (adult) => {
        return adult ? '청소년불가' : '전체 관람가능'
    }
    return (
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
                        {/* <motion.div className={`sliderList ${rate ? 'rate' : ''}`}
                        whileHover='hover'
                        initial='initial'

                    >
                        {rate && (
                            <div className={`rateNum ${idx === movies.length - 1 ? 'last' : ''}`}>
                                {idx + 1}
                            </div>
                        )}

                        <motion.div className="sliderImg" variants={imgVariants} >
                            <img src={`https://image.tmdb.org/t/p/w500/${rate ? movie.poster_path : movie.backdrop_path}`} alt={movie.title} />
                        </motion.div>

                        <motion.div className='sliderInfo'
                            variants={infoVariants}
                            onClick={() => navigate(`${type}/${movie.id}`)}
                            layoutId={`${type + movieId}`}

                        >
                            <div className='infoImg'>
                                <img src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`} alt={movie.title} />
                            </div>

                            <div className='infoWrapper'>
                                <div className='btnsWrapper'>
                                    <div>
                                        <Button><FaPlay /></Button>
                                        <Button><FiPlus /></Button>
                                        <Button><AiOutlineLike /></Button>
                                    </div>
                                    <Button><IoIosArrowDown /></Button>
                                </div>

                                <div className='infoGenres'>
                                    <p>{getRating(movie.adult)}</p>
                                    <p>{getGenresNames(movie.genre_ids)}</p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div> */}
                        <MovieItem
                            movie={movie}
                            idx={idx}
                            rate={rate}
                            type={type}
                            navigate={navigate}
                            hoverId={hoverId}
                            setHoverId = {setHoverId}
                            imgVariants={imgVariants}
                            infoVariants={infoVariants}
                            getRating={getRating}
                            getGenresNames={getGenresNames}
                            movies={movies}

                        />
                        {/* movie, idx, rate, navigate, type, hoverId, imgVariants, infoVariants, getRating, getGenresNames */}
                    </SwiperSlide>
                ))}

            </Swiper>
            {clickModal && <Modal movie={clickModal} type={type} />}
        </MovieSliderItem>
    )
}

const MovieSliderItem = styled.div`
    padding: 40px 50px;
    box-sizing: border-box;

    .swiper{
        overflow: visible!important;
    }
    .movieTitle{
        font-size: 36px;
        position: relative;
        color: #fff;
        margin-bottom: 24px;
    }


`