import React,{useState,useEffect} from 'react'
import './../style/TVCard.css'
import Image from './../image.jpg'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

export default function TVCard({mode,serie}) {
const {id,poster_path,name,vote_count,vote_average,first_air_date} = serie;

const [isFavorite,setIsFavorite] = useState(
  JSON.parse(
      localStorage.getItem('favoriteSeries'))?.some(([_,tvId])=>tvId === id) || false
)


const toggleFav=()=>{
  setIsFavorite((prev)=>!prev)
}
useEffect(()=>{
  const favSeries = JSON.parse(localStorage.getItem('favoriteSeries')) || []
  if(isFavorite){
      localStorage.setItem('favoriteSeries',JSON.stringify([...favSeries,[name,id]]))
  }
  else{
      localStorage.setItem("favoriteSeries",
       JSON.stringify(favSeries.filter(([_,tvId])=>tvId !== id))
      )
  }
},[isFavorite,name,id])

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
                <h2>{name?name:"Tittle not found"}</h2>
                <div>
                    <h4>RELEASE:{first_air_date?first_air_date:"NA"}</h4>
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
