import React,{useState,useEffect} from 'react'
import './../style/MovieCard.css'
import Image from './../image.jpg'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
export default function MovieCard({mode,movie}) {
    const {id,poster_path,title,vote_count,vote_average,release_date} = movie;
    const [isFavorite,setIsFavorite] = useState(
        JSON.parse(
            localStorage.getItem('favoriteMovies'))?.some(([_,movieId])=>movieId === id) || false
    )


    const toggleFav=()=>{
        setIsFavorite((prev)=>!prev)
    }
    useEffect(()=>{
        const favMovies = JSON.parse(localStorage.getItem('favoriteMovies')) || []
        if(isFavorite){
            localStorage.setItem('favoriteMovies',JSON.stringify([...favMovies,[title,id]]))
        }
        else{
            localStorage.setItem("favoriteMovies",
             JSON.stringify(favMovies.filter(([_,movieId])=>movieId !== id))
            )
        }
    },[isFavorite,title,id])

  return (
    
    <>
    
        <div className={mode?'dark-main-card-container':'light-main-card-container'}>
            <div className='image-container'>
                <img src={`https://image.tmdb.org/t/p/original/${poster_path}`?`https://image.tmdb.org/t/p/original/${poster_path}`:Image} alt="default"  />
                <div className={mode?'like-btn dark-like':'like-btn light-like'}>
                    {isFavorite?(<FavoriteIcon onClick={toggleFav}/>):(< FavoriteBorderIcon onClick={toggleFav}/>)}
                </div>
            </div>
            <div className='description-container'>
                <h2>{title?title:"Tittle not found"}</h2>
                <div>
                    <h4>RELEASE:{release_date?release_date:"NA"}</h4>
                    <h4>VOTE COUNT:{vote_count?vote_count:"NA"}</h4>
                    <h4>VOTE avg:{vote_average?vote_average:"NA"}</h4>
                </div>
            </div>
        </div>
        <div >
            
        </div>
      
    </>
  )
}
