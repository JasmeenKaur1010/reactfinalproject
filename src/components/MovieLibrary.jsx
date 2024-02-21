import React,{useState} from 'react'
import Movies from './Movies';
export default function MovieLibrary({mode,currentMoviePage}) {
  const [fav,setFav] = useState([]);
  const favoriteMoviesIds = JSON.parse(localStorage.getItem("favoriteMovies")) || [];

  const fetchMovies = async()=>{
    try {
      const response = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=6aecb59cde3d2c8101324cfd1d2d1c09&language=en-US&page=${currentMoviePage}`)
      const result = await response.json()
      return result.results;
    } catch (error) {
      
    }
  }
  const renderFavoriteMovies = async()=>{
    const mainMovieList = await fetchMovies()
    const favoriteMovies = mainMovieList.filter((movie)=>
     favoriteMoviesIds.some(([_,movieId])=>movieId === movie.id)
    )
    return favoriteMovies
  }
  renderFavoriteMovies().then((response)=>{
    setFav(response)
  })

  return (
    <>
        {
          favoriteMoviesIds.length > 0 ?(
            <Movies movies={fav} mode={mode}/>
          ) :(
            <div style={mode?({color:"white",textAlign:"center",paddingTop:"40vh",fontSize:"3em"}):({color:"black",textAlign:"center",paddingTop:"40vh",fontSize:"3em"})}>
              <h1>No Favorites Yet!</h1>
            </div>
          )
        }
    </>
  )
}
