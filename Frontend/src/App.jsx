import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
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
import Cookies from "js-cookie";
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import { useEffect } from 'react'
import SearchItem from './Component/searcheditem.jsx'
import Chat from './Component/chat.jsx'
import Chatbar from './Component/chatbar.jsx'


function App() {
  let [user, setuser] = useState();

  useEffect(() => {
    const verifyCookie = async () => {
      //!cookies.token
      // console.log(Cookies.get())
      let {token}=Cookies.get();
      const { data } = await axios.post("https://lostfound-3b7h.onrender.com/auth",{token});
      const { status, user } = data;
      if(status){
        // console.log(user)
       
      setuser(user);
      }
     
     
       
    };
    verifyCookie();
  }, []);
 

  return (
    <>
      <BrowserRouter>
        <Navbar user={user} ></Navbar>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/Signup" element={<Signup />}></Route>
          <Route path="/Login" element={<Login setuser={setuser} />}></Route>
          <Route path="/Profile" element={<Profile  />}></Route>
          <Route path="/Found" element={<Found />}></Route>
          <Route path="/newFound" element={< Newfound />}></Route>
          <Route path="/search" element={<Search />}></Route>
          <Route path="/searcheditem" element={<SearchItem />}></Route>
         
           <Route path="/chat" element={<Chat/>}></Route>
          <Route path="/chatbar" element={<Chatbar/>}></Route>


        </Routes>
        <ToastContainer></ToastContainer>
        <Footer></Footer>
      </BrowserRouter>

    </>
  )
}

export default App
