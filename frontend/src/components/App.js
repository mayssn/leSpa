import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Appointments from "./Appointments";
import Home from "./Home";
import About from "./About";
import Services from "./Services";
import Contact from "./Contact";
import Header from "./Header";
import styled from "styled-components";
import Gallery from "./Gallery";
import Footer from "./Footer";
import AdminQuote from "./Admin/AdminQuote";
import AdminAddService from "./Admin/AdminAddService";
import AdminPassword from "./Admin/AdminPassword";
import AdminServices from "./Admin/AdminServices";
import AdminHeader from "./Admin/AdminHeader";
import AdminHome from "./Admin/AdminHome copy";
import AdminConfirm from "./Admin/AdminConfirm";
import AdminLogin from "./Admin/Adminlogin";
import { useState } from "react";


const App = () => {
  const [confirmation, setConfirmation] = useState(null)
  let isAuth
  useEffect(() => {
    isAuth = JSON.parse(window.sessionStorage.getItem("isAuth"))
  }, [])

  console.log("isAuth", isAuth);

  return (
    <>
      <Router>
        <Header />
        <WrapperClient>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/services" element={<Services />} />
            <Route exact path="/gallery" element={<Gallery />} />
            <Route exact path="/book" element={<Appointments />} />
            <Route exact path="/contact" element={<Contact />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/admin/login" element={<AdminLogin />} />
          </Routes>
        </WrapperClient>
        <WrapperAdmin>
          <AdminHeader />
          <Routes>
            <Route exact path="/admin/" element={<AdminHome />} />
            <Route exact path="/admin/quote" element={<AdminQuote setConfirmation={setConfirmation} />} />
            <Route exact path="/admin/services" element={<AdminServices setConfirmation={setConfirmation} />} />
            <Route exact path="/admin/add" element={<AdminAddService setConfirmation={setConfirmation} />} />
            <Route exact path="/admin/confirmation" element={<AdminConfirm confirmation={confirmation} />} />
          </Routes>
        </WrapperAdmin>
        <Footer />
      </Router>
    </>
  )
};



const WrapperClient = styled.div`
  display:flex;
  flex-direction:column;`

const WrapperAdmin = styled.div`
  display:flex;
  flex-direction:column;`

export default App;