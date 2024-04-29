import { useQuery } from "react-query";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { getGenre, getMovies } from "../api/aixos";
import MainVideo from "../components/MainVideo";
import MovieSlider from "../components/MovieSlider";
import { useEffect } from "react";
import MovieGenres from "../components/MoviGenres";
import Tvprogram from "../components/TvProgram";
//yarn add react-query

/*
react-query
state처럼 상태관리를 해주는 라이브러리
query는 데이터를 불러오는 비동기 데이터 방식에서 상태 관리를 쉽게 해주는 특징을 가지고 있다.


*/

export default function Main() {

    useEffect(() => {
        const genreData = async () => {
            const genreList = await getGenre();
            console.log(genreList)
        }
        genreData()
    }, [])
    const {
        data: nowPlaying,
        isLoading: isNowPlayingLoading,
        error: nowPlayingError
    } = useQuery(['movies', 'nowPlaying'], () => getMovies('now_playing'), {
        staleTime: 50000
    })

    const {
        data: popular,
        isLoading: isPopularLoading,
        error: popularError
    } = useQuery(['movies', 'popular'], () => getMovies('popular'), {
        staleTime: 50000
    })

    //top_rated , upcoming


    if (isNowPlayingLoading) return <div>로딩중입니다..</div>
    if (nowPlayingError) return <div>오류가 발생했습니다.</div>
    if (isPopularLoading) return <div>로딩중입니다..</div>
    if (popularError) return <div>오류가 발생했습니다.</div>




    // console.log(nowPlaying)
    return (
        <>
            <MainVideo />
            <MovieSlider
                movies={nowPlaying.slice(1, 11)}
                title='TOP 10 시리즈'
                rate={true}
                type='nowPlaying'
            />

            <MovieSlider
                movies={popular}
                title='현재 인기 있는 영화'
                type='popular'
            />

            <MovieGenres/>
            <Tvprogram/>

        </>
    )
}