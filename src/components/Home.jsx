import React from 'react'
import MovieCard from './MovieCard'
import TVCard from './TVCard'
import './../style/Home.css'
import { useNavigate } from 'react-router-dom'
export default function Home({movies,series,mode}) {
  const navigate = useNavigate();
  return (

  <div>

  <div className={mode?'dark-home-main-container':'light-home-main-container'}>
  {movies.map((movie)=>(
        <li><MovieCard mode={mode} key={movie.id} movie={movie}/></li>
      ))}
  </div>
  <h1 className={mode?'more more-dark':'more more-light'} onClick={()=>navigate('./Movies')}>More Movies</h1>
  <div className={mode?'dark-home-main-container':'light-home-main-container'}>
  {series.map((serie)=>(
        <li><TVCard mode={mode} key={serie.id} serie={serie}/></li>
      ))}
  </div>
  <h1 className={mode?'more more-dark':' more more-light'} onClick={()=>navigate('./TVSeries')}>More TV-Series</h1>
  </div>
 
  )
}
