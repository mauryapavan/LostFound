import { useContext, useEffect, useState } from 'react'

import './App.css'
import Navbar from './Component/Navbar.jsx'
import Home from './Component/home.jsx'
import Footer from './Component/footer.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Signup from './Component/Signup.jsx'
import Login from './Component/Login.jsx'
import Profile from './Component/profile.jsx'
import Found from './Component/Found.jsx'
import Newfound from './Component/NewFound.jsx'
import Search from './Component/search.jsx'
import { toast, ToastContainer } from 'react-toastify'
import SearchItem from './Component/searcheditem.jsx'
import Chatbar from './Component/chatbar.jsx'
import WithAuth from './utils/withAuth.jsx'
import { MainContext, MainContextProvider } from './Context/mainContext.jsx'
import WithoutAuth from './utils/withoutAuth.jsx'





function App() {
 return (
    <>
      <BrowserRouter>
        <MainContextProvider>
          <Navbar ></Navbar>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/Signup" element={<WithoutAuth><Signup /></WithoutAuth>}></Route>
            <Route path="/Login" element={<WithoutAuth><Login /></WithoutAuth>}></Route>
            <Route path="/Profile" element={<WithAuth><Profile /></WithAuth>}></Route>
            <Route path="/Found" element={<WithAuth><Found /></WithAuth>}></Route>
            <Route path="/newFound" element={<WithAuth>< Newfound /></WithAuth>}></Route>
            <Route path="/search" element={<Search />}></Route>
            <Route path="/searcheditem" element={<SearchItem />}></Route>
            <Route path="/chatbar" element={<WithAuth><Chatbar /></WithAuth>}></Route>


          </Routes>
          <ToastContainer></ToastContainer>
          <Footer></Footer>
        </MainContextProvider>
      </BrowserRouter>

    </>
  )
}

export default App
