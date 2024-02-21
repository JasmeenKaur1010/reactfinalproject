import React, { useState } from 'react'
import MovieCard from './MovieCard'
import './../style/Movies.css'
export default function Movies({movies,mode}) {
  const [sortOrder,setSortOrder] = useState('asc')
  const sortedOrder = movies.sort((a,b)=>{
    if(sortOrder === "asc"){
        return a.vote_average - b.vote_average
    } else if(sortOrder==="desc") {
        return b.vote_average - a.vote_average
    } else if(sortOrder === "countAsc"){
        return a.vote_count - b.vote_count
    } else if(sortOrder === "countDesc"){
        return b.vote_count - a.vote_count
    }else{
      return a.vote_average - b.vote_average
    }
})
  return ( 
    <>
      <div className={mode?'dark-movies-main-container':'light-movies-main-container'}>
        <div className={mode?'sort-buttons dark-sort-buttons':'sort-buttons light-sort-buttons'}>
            <button onClick={()=>setSortOrder('asc')}>RATING ASC</button>
            <button onClick={()=>setSortOrder('desc')}>RATING DESC</button>
            <button onClick={()=>setSortOrder('countAsc')}>VOTES ASC</button>
            <button onClick={()=>setSortOrder('countDesc')}>VOTES DESC</button>
        </div>
        <div className={mode?'dark-movies-container':'light-movies-container'}>
        {sortedOrder.map((movie)=>(
        <li><MovieCard mode={mode} key={movie.id} movie={movie}/></li>
      ))}
        </div>
      </div>
    </>
  )
}
