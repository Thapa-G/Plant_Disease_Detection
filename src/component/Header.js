import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useState } from 'react';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';


const Header = () => {
    const [isMenuOpen,setIsMenuOpen] = useState(false);
  return (
    <>
    <nav className='flex bg-transparent justify-between mx-14 px-6 py-1 border-b border-stone-200 border-opacity-7 font-nunito text-white text-lg font-semibold antialiased tracking-wide items-center '>
       <div className='py-2 flex items-center gap-1'>
            <img src='Images/Artboard 1.svg' alt="logo"  className='w-9 h-auto'/> <h1>Tomex</h1>
        </div>  
    
    <ul className={`flex gap-8 sm:flex-row py-2 transition-transform duration-200 ease-in-out transform ${isMenuOpen ? 'translate-x-5 opacity-100 ' : 'translate-x-2/3 opacity-0 '}  sm:translate-x-0 sm:opacity-100 `}>
    <li>
      <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="Mylist">My_List</Link>
      </li>
      
    </ul>
    
    <div><Link to="Register"><button className={`${isMenuOpen ? 'hidden' : 'block'} sm:flex px-4 py-2  rounded `}>Register</button></Link></div>
    <button className="transition ease-out duration-500 active:-rotate-90 sm:hidden" onClick={()=>setIsMenuOpen(!isMenuOpen)}>
    {isMenuOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
    </button>
  </nav>
  <Outlet/>
</>
  )
}

export default Header