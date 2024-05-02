import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Route, RouterProvider, createBrowserRouter,createRoutesFromElements} from 'react-router-dom'
import Layout from './Layout.jsx'
import SignIn from './pages/SignIn.jsx'
import ChatRoom from './pages/ChatRoom.jsx'
import { PrivateRoute } from "./routes/PrivateRoute.jsx";
import Home from './pages/Home.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="" element={<Home />} />
      <Route path="/signin" element={<SignIn />} ></Route>
      <Route
        path="/chat"
        element={
          <PrivateRoute Component={ChatRoom}/>
           
        }
      />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/> 
  </React.StrictMode>,
)
