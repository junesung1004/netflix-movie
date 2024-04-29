
import { motion, useScroll } from "framer-motion"
import styled from "styled-components"


import { FaPlay } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";
import { AiOutlineLike } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";
import Button from "./Button";
import { useParams } from "react-router-dom";

export default function MovieItem({setHoverId, movie, idx, rate, navigate, type, hoverId, imgVariants, infoVariants, getRating, getGenresNames }) {
    
    const { category, movieId } = useParams()

    return (
        <MovieCard>
            <motion.div
                className={`sliderList ${rate ? 'rate' : ''}`}
                whileHover='hover'
                initial="initial"
            >
                {rate && (
                    <div className={`rateNum ${idx === movie.length - 1 ? 'last' : ''}`}>
                        {idx + 1}
                    </div>
                )}
                <motion.div className="sliderImg" variants={imgVariants}>
                    <img src={`https://image.tmdb.org/t/p/w500/${rate ? movie.poster_path : movie.backdrop_path}`} alt={movie.title} />
                </motion.div>

                <motion.div
                    className="sliderInfo"
                    variants={infoVariants}
                    onClick={() => navigate(`${type}/${movie.id}`)}
                    layoutId={`${type + movieId}`}
                >

                    <div className="infoImg">
                        <img src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`} alt={movie.title} />
                    </div>
                    <div className="infoWrapper">
                        <div className="btnsWrapper">
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

            </motion.div>
           
        </MovieCard>
        
    )

}

const MovieCard = styled.div`
    .sliderList{
        position: relative;
    }
    .sliderList img{
        width: 100%;
        border-radius: 5px;
        cursor: pointer;
    }
    .sliderList.rate{
        position: relative;
    }
    .sliderList.rate .rateNum{
        position: absolute;
        top: 0px;
        left: 0px;
        /* transform: translateY(-60%); */
        line-height: 200px;
        font-size: 300px;
        color: #000;
        -webkit-text-stroke: 4px gray;
        -webkit-text-fill-color: #000;
    }
    .sliderList.rate .rateNum.last{
        letter-spacing: -50px;
        left: -30px;
    }



    .sliderList.rate .sliderImg{
        position: relative;
        width: 100%;
        display: flex;
        justify-content: flex-end;

    }
    .sliderList.rate .sliderImg img{
        object-fit: cover;
        width: 60%;
        position: relative;

    }

    .sliderInfo{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 99;
        .infoWrapper{
            display: flex;
            width: 100%;
            padding: 10px;
            box-sizing: border-box;
            background: gray;
            flex-direction: column;
            gap: 6px;
            .btnsWrapper{
                display: flex;
                justify-content: space-between;
                align-items: center;
                div{
                    display: flex;
                    gap: 4px;
                }
                button{
                    width: 24px;
                    height: 24px;
                    padding: 0px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 12px;
                    border-radius: 50%;
                }
            }
            .infoGenres{
                color: #fff;
                font-size: 12px;
                display: flex;
                gap: 4px;
                flex-direction: column;
            }

        }
    }
`

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

