import React, { useState } from 'react'
import './../style/TVSeries.css'
import TVCard from './TVCard'
export default function TVSeries({series,mode}) {
  const [sortOrder,setSortOrder] = useState('asc')
  const sortedOrder = series.sort((a,b)=>{
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
      <div className={mode?'dark-tv-main-container':'light-tv-main-container'}>
        <div className={mode?'sort-buttons dark-sort-buttons':'sort-buttons light-sort-buttons'}>
            <button onClick={()=>setSortOrder('asc')}>RATING ASC</button>
            <button onClick={()=>setSortOrder('desc')}>RATING DESC</button>
            <button onClick={()=>setSortOrder('countAsc')}>VOTES ASC</button>
            <button onClick={()=>setSortOrder('countDesc')}>VOTES DESC</button>
        </div>
            <div className={mode?'dark-tv-container':'light-tv-container'}>
            {sortedOrder.map((tv)=>(
              <li><TVCard mode={mode} key={tv.id} serie={tv}/></li>
            ))}
        </div>
      </div>
    </>
  )
}
