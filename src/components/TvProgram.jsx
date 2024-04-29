import { useQuery } from "react-query"
import { getTv } from "../api/aixos"
import MovieSlider from "./MovieSlider"



export default function Tvprogram(){

    const{
        data : popular,
        isLoading : isPopularLoading,
        error : popularError
    }= useQuery(['tv','popular'],()=>getTv('popular'),{
        staleTime : 50000
    })
    console.log(popular)

    if(isPopularLoading) return <div>로딩중입니다.</div>
    if(popularError) return <div>오류가 발생했습니다.</div>
    return(
        <>
            <MovieSlider movies={popular} title='인기있는 tv 프로그램' type='popular'/>
        </>
    )
}