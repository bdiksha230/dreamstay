import React from 'react'
import Header from './component/header/Header'
import { Outlet } from 'react-router-dom'
import Footer from './component/footer/Footer'
import { useLocation } from 'react-router-dom'

const Layout = () => {

    const isOwnerPath = useLocation().pathname.includes("owner");
  return (
   <>
   { !isOwnerPath && <Header/> }
   <Outlet/>
   <Footer/>
   </>
  )
}

export default Layout
