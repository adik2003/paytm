import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Routes,Route } from 'react-router-dom'
import { Signup } from './Signup'
import { Signin } from './Signin'
import { Dashboard } from './Dashboard'
import { SendMoney } from './Send'
function App() {
 

  return (
    <>
      
       
      
      <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup></Signup>}></Route>
        <Route path="/signin"element={<Signin></Signin>}> </Route>
        <Route path="/dashboard" element={<Dashboard></Dashboard>}></Route>
        <Route path="/send" element={<SendMoney></SendMoney>}></Route>
       
        
      </Routes>
      </BrowserRouter>
       
    </>
  )
}

export default App
