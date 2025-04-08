import React from 'react'
import CustomNav from './components/CustomNav'
import {Outlet} from 'react-router'

const Layout = () => {
  return (
    <div>
      <div className='container pt-10 mx-auto'>
            <CustomNav/>
      </div>
  
    <Outlet/>
    </div>
  )
}

export default Layout
