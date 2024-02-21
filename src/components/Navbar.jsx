import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './../style/Navbar.css'
import SearchIcon from '@mui/icons-material/Search';
import LoginIcon from '@mui/icons-material/Login';
import LightModeIcon from '@mui/icons-material/LightMode';
import TheaterComedyIcon from '@mui/icons-material/TheaterComedy';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import NightlightRoundIcon from '@mui/icons-material/NightlightRound';


export default function Navbar({mode,setMode,onSearch}) {
    const [navToggle,setNavToggle] = useState(false)
    const [searchToggle,setSearchToggle] = useState(false)
    const [query,setQuery] = useState("")
  return (
    <>
      <div className= {mode?'main-nav-container light-main':'main-nav-container dark-main'}>
        <div className='logo-container'><TheaterComedyIcon/></div>
        <div className={mode?'dark-navigation-button':'light-navigation-button'}>
            <Link className='nav-button' to='/'>Home</Link>
            <Link className='nav-button' to='/Movies'>Movies</Link>
            <Link className='nav-button' to='/TVSeries'>TV Series</Link>
            <Link className='nav-button' to='/MovieLibrary'>Movie Library</Link>
            <Link className='nav-button' to='/TVLibrary'>TV Library</Link>
        </div>
        <div className={mode?'desk-search dark-search':'desk-search light-search'} style={searchToggle?{display:"block"}:{display:"none"}}>
        <input className='input-box' type="text" placeholder='Enter your query...' onChange={(e)=>setQuery(e.target.value)}/>
        
        </div>
        <input type="submit" className='submit-btn' onClick={()=>onSearch(query)} style={searchToggle?{display:"block"}:{display:"none"}}/>
        <div className='search-bar-container' onClick={()=>setSearchToggle(!searchToggle)}><SearchIcon/></div>
        <div className='login-sign-up-container'><LoginIcon/></div>
        <div className='theme-toggle' onClick={()=>setMode(!mode)}>{mode?<LightModeIcon/>:<NightlightRoundIcon/>}</div>
      </div>


 
      <div className={mode?'light-sideNavbar':'dark-sideNavbar'}>
            <div className='side-menu-button-wrapper'>
            <div className='side-menu-button' onClick={()=>setNavToggle(!navToggle)}>{navToggle?<CloseIcon/>:<MenuIcon/>}</div>
            </div>
           
            <div className={navToggle?'toggle-menu-on':'toggle-menu-off'}>
                <div className={mode?'dark-custom':'light-custom'}>
                    <div className='side-search-bar-container' onClick={()=>setSearchToggle(!searchToggle)}><SearchIcon/></div>
                    <div className='side-login-sign-up-container'><LoginIcon/></div>
                    <div className='side-theme-toggle' onClick={()=>setMode(!mode)}>{mode?<LightModeIcon/>:<NightlightRoundIcon/>}</div>
                </div>
                
                <div className={mode?'side-navigation-button':'dark-side-navigation-button'}>
                        <Link className='side-nav-button' to='/'>Home</Link>
                        <Link className='side-nav-button' to='/Movies'>Movies</Link>
                        <Link className='side-nav-button' to='/TVSeries'>TV Series</Link>
                        <Link className='side-nav-button' to='/MovieLibrary'>Movie Library</Link>
                        <Link className='side-nav-button' to='/TVLibrary'>TV Library</Link>
                </div>
                
            </div>
            
      </div>
    </>
  )
}
