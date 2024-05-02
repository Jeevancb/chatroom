import { useState , useEffect , useRef} from 'react';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './components/Login'
import io from 'socket.io-client'
import Roomcomp from './components/Roomcomp';



function App() {
       

 return (
   <div>
      <Roomcomp/>
   </div>
 );
}

export default App
