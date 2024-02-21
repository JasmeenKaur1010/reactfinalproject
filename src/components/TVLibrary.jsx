import React,{useState} from 'react'
import TvSeries from './TVSeries'
export default function TVLibrary({mode,currentTvPage}) {
  const [fav,setFav] = useState([]);
  const favoriteSeriesIds = JSON.parse(localStorage.getItem("favoriteSeries")) || [];
  
  const fetchSeries = async()=>{
    try {
      const response = await fetch(`https://api.themoviedb.org/3/tv/top_rated?api_key=6aecb59cde3d2c8101324cfd1d2d1c09&language=en-US&page=${currentTvPage}`)
      const result = await response.json()
      return result.results;
    } catch (error) {
      
    }
  }
  const renderFavoriteSeries = async()=>{
    const mainSeriesList = await fetchSeries()
    const favoriteSeries = mainSeriesList.filter((series)=>
     favoriteSeriesIds.some(([_,tvId])=>tvId === series.id)
    )
    return favoriteSeries
  }
  renderFavoriteSeries().then((response)=>{
    setFav(response)
  })
  return (
    <div>
        {
          favoriteSeriesIds.length > 0 ?(
            <TvSeries series={fav} mode={mode}/>
          ) :(
            <div style={mode?({color:"white",textAlign:"center",paddingTop:"40vh",fontSize:"3em"}):({color:"black",textAlign:"center",paddingTop:"40vh",fontSize:"3em"})}>
              <h1>No Favorites Yet!</h1>
            </div>
          )
        }
    </div>
  )
}
