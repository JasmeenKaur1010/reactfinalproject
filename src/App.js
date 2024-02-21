import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Movies from './components/Movies'
import Home from './components/Home'
import MovieLibrary from './components/MovieLibrary'
import TVSeries from './components/TVSeries'
import TVLibrary from './components/TVLibrary'
import Pagination from './components/Pagignation'
import './App.css'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
export default function App() {
  const [mode,setMode]=useState(true)
  const [movies,setMovies] = useState([]);
  const [series,setSeries] = useState([]);
  const [moviesTotalPages,setMoviesTotalPages] = useState(0);
  const [totalTvPages,setTotalTvPages] = useState(0);
  const [currentMoviePage,setCurrentMoviePage] = useState(1)
  const [currentTvPage,setCurrentTvPage] = useState(1)
  const fetchMovies=async(page)=>{
    try{
      const rawData = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=6aecb59cde3d2c8101324cfd1d2d1c09&language=en-US&page=${page}`)
      const parsedData = await rawData.json();
      setMovies(parsedData.results)
      setMoviesTotalPages(parsedData.total_pages)
    }catch(error){

    }

  }
  const fetchTvSeries=async(page)=>{
    const rawData = await fetch(`https://api.themoviedb.org/3/tv/top_rated?api_key=6aecb59cde3d2c8101324cfd1d2d1c09&language=en-US&page=${page}`)
    const parsedData = await rawData.json()
    setSeries(parsedData.results)
    setTotalTvPages(parsedData.total_pages)

  }
  useEffect(()=>{
    fetchMovies(currentMoviePage)
    fetchTvSeries(currentTvPage)
  },[currentMoviePage,currentTvPage])
  const handlePageChange = (page)=>{
    setCurrentMoviePage(page) 
  }
  const handlePageTvChange = (page)=>{
    setCurrentTvPage(page) 
  }

  const handleSearch=async(query)=>{
    try {
      const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${query}&api_key=6aecb59cde3d2c8101324cfd1d2d1c09&include_adult=false&language=en-US&page=${currentMoviePage}`)
      const result = await response.json();
      setMovies(result.results)
    } catch (error) {
      
    }
  }
  return (
    
    <>
      <div className={mode?'dark-main-container':'light-main-container'}>
        <BrowserRouter>
        <Navbar mode={mode} setMode={setMode} onSearch={handleSearch}/>
          <Routes>
            <Route path='/' element={<Home movies={movies} series={series} mode={mode}/>}/>
            <Route path='/Movies' element={<div>
              <Movies movies={movies} mode={mode}/>
              <Pagination currentPage={currentMoviePage} totalPages={moviesTotalPages}onPageChange = {handlePageChange} mode={mode}/>
            </div>}/>
            <Route path='/TVSeries' element={
              <div>
                <TVSeries series={series} mode={mode}/>
                <Pagination currentPage={currentTvPage} totalPages={totalTvPages}onPageChange = {handlePageTvChange} mode={mode}/>
              </div>}/>
            <Route path='/MovieLibrary' element={<MovieLibrary mode={mode} currentMoviePage={currentMoviePage}/>}/>
            <Route path='/TVLibrary' element={<TVLibrary mode={mode}  currentTvPage={currentTvPage}/>}/>
            
          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}
