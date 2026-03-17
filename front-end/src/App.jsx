import React from 'react'
import './App.css'
import {Routes, Route} from "react-router-dom"
import Home from './component/Home'
import Create from './component/Create'
import Edit from './component/Edit'
import {ToastContainer} from "react-toastify"

const App = () => {
  return (
    <div>
      <ToastContainer/>
      <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/create" element={<Create></Create>}></Route>
          <Route path="/edit/:userid" element={<Edit></Edit>}></Route>
      </Routes>
    </div>
  )
}

export default App