import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'
import { WebSocketProvider } from "./contexts/WebSocketProvider";


function Layout() {
  return (
    <>
      <WebSocketProvider>
      <Navbar />
      <Outlet />
      </WebSocketProvider>
      
    </>
  );
}

export default Layout

