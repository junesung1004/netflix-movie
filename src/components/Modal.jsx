import { AnimatePresence } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { motion } from 'framer-motion'
import { IoMdClose } from "react-icons/io";
import { useQuery } from "react-query";
import { getModalDetail } from "../api/aixos";


export default function Modal({ movie, type }) {
    // console.log(movie)
    // console.log(type)
    const { movieId } = useParams()
    const navigate = useNavigate();

    const mediaType = movie.media_type ==='tv';
    //media_type = tmdb자체에서 만들어진 type 매개변수

    const {data, isLoading, error} = useQuery(
        ['detail', mediaType],
        ()=>getModalDetail(movie.id, mediaType ? 'tv' :'movie'),{
            staleTime: 50000
        }
    )
    // console.log(data)

    const movieReleaseYear = (date)=>{
        return date ? new Date(data.release_date).getFullYear() : null
    }



    return (
        <AnimatePresence>
            {movieId ? (
                <ModalContainer animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <motion.div className="modalContent"
                        layoutId={`${type + movieId}`}
                        transition={{ duration: 0.2 }}
                    >
                        <div className="modalBg">
                            <img src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`} />
                        </div>
                        <div className="content">
                            <motion.button
                                className="closeBtn"
                                onClick={() => { navigate(-1) }}
                            //-1은 이전경로로 돌아감
                            >

                                <IoMdClose />
                            </motion.button>

                            <ContentInfo>
                                <div className="modalTextWrap">
                                    <div className="modalInfo01">
                                        {data?.release_date && <span>{movieReleaseYear(movie.release_date)}</span>}
                                        {data?.runtime && <span>{data?.runtime}분</span>}
                                    </div>
                                    {data?.overview &&<p className="modalOverView">{movie.overview}</p>}
                                </div>

                                <div className="infoGenres">
                                    장르 : <p>{data?.genres.map((genre,idx)=><span key={idx}>{genre.name}</span>)}</p>
                                </div>
                            </ContentInfo>

                        </div>

                    </motion.div>
                </ModalContainer>
            ) : null}
        </AnimatePresence>
    )
}

const ModalContainer = styled(motion.div)`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    max-height: 100vh;
    background-color: rgba(0,0,0,0.7);
    z-index: 99;
    opacity : 0;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px 0px;

    .closeBtn{
        position: absolute;
        top: 20px;
        right: 20px;
        font-size: 24px;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #000;
        color: #fff;
    }

    .modalContent{
        position: relative;
        width: 50%;
        max-height: 100vh;
        background: gray;
        z-index: 999;
        overflow: auto;

        .content{
            padding: 24px;
            box-sizing: border-box;
        }
    }
`
const ContentInfo = styled.div`
    background: gray;
    padding: 0px 24px 24px;
    box-sizing: border-box;
    display: flex;
    gap: 30px;
    .modalTextWrap{
        display: flex;
        gap: 12px;
        flex-direction: column;
        color: #fff;
        width: 60%;
        flex-shrink: 0;
        .modalInfo01{
            display: flex;
            gap: 10px;
            font-size: 20px;
            font-weight: bold;
            color: lightgray;
        }
        .modalOverView{
            font-size: 16px;
            line-height: 1.3;
        }
    }

    .infoGenres{
        color: lightgray;
        width: 40%;
        flex-shrink: 0;
        p{
            display: flex;
            gap : 4px;
            color: #fff;
        }

    }
    
`