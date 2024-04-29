
import { useEffect } from "react"
import { useQuery } from "react-query"
import { getMovieGenres } from '../api/aixos'
import MovieSlider from "./MovieSlider"
export default function MovieGenres() {
    /*
    {
  "genres": [
    {
      "id": 28,
      "name": "Action"
    },
    {
      "id": 12,
      "name": "Adventure"
    },
    {
      "id": 16,
      "name": "Animation"
    },
    {
      "id": 35,
      "name": "Comedy"
    },
    {
      "id": 80,
      "name": "Crime"
    },
    {
      "id": 99,
      "name": "Documentary"
    },
    {
      "id": 18,
      "name": "Drama"
    },
    {
      "id": 10751,
      "name": "Family"
    },
    {
      "id": 14,
      "name": "Fantasy"
    },
    {
      "id": 36,
      "name": "History"
    },
    {
      "id": 27,
      "name": "Horror"
    },
    {
      "id": 10402,
      "name": "Music"
    },
    {
      "id": 9648,
      "name": "Mystery"
    },
    {
      "id": 10749,
      "name": "Romance"
    },
    {
      "id": 878,
      "name": "Science Fiction"
    },
    {
      "id": 10770,
      "name": "TV Movie"
    },
    {
      "id": 53,
      "name": "Thriller"
    },
    {
      "id": 10752,
      "name": "War"
    },
    {
      "id": 37,
      "name": "Western"
    }
  ]
}
    
    */

    //액션
    const {
        data: action,
        isLoading: isActionLoading,
        error: actionError
    } = useQuery(['movies', '28'], () => getMovieGenres('28'), {
        staleTime: 50000
    })

    //애니메이션
    const {
        data : animation,
        isLoading : isAnimationLoading,
        error : animationError,
    }=useQuery(['movies',16], ()=>getMovieGenres('16'),{
        staleTime: 50000
    })



    if(isActionLoading) return<div>로딩중입니다.</div>
    if(actionError) return<div>오류가 발생했습니다.</div>

    if(isAnimationLoading) return<div>로딩중입니다</div>
    if(animationError) return <div>오류가 발생했습니다.</div>
    return (
        <>
            <MovieSlider movies={action} title='액션 장르' type='action'/>
            <MovieSlider movies={animation} title='애니메이션' type='animation'/>
        </>
    )
}