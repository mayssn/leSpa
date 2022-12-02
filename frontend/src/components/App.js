import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Appointments from "./Appointments";
import Home from "./Home";
import About from "./About";
import Services from "./Services";
import Contact from "./Contact";
import Header from "./Header";
import styled from "styled-components";
import Gallery from "./BasicRows";
import Footer from "./Footer";
import AdminQuote from "./Admin/AdminQuote";
import AdminAddService from "./Admin/AdminAddService";
import AdminServices from "./Admin/AdminServices";
import AdminConfirm from "./Admin/AdminConfirm";
import AdminLogin from "./Admin/Adminlogin";
import AdminAbout from "./Admin/AdminAbout";
import NotFoundPage from "./NotFoundPage";
import { useState } from "react";


const App = () => {
  // const navigate = useNavigate()
  const [confirmation, setConfirmation] = useState(null)
  let isAuth
  useEffect(() => {
    isAuth = JSON.parse(window.sessionStorage.getItem("isAuth"))
  }, [])



  return (
    <>
      <Router>
        <Header />
        <WrapperClient>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/admin/" element={<AdminLogin />} />


          </Routes>
        </WrapperClient>
        <WrapperAdmin>
          <Routes>
            <Route path="/admin/quote" element={<AdminQuote setConfirmation={setConfirmation} />} />
            <Route path="/admin/about" element={<AdminAbout setConfirmation={setConfirmation} />} />
            <Route path="/admin/services" element={<AdminServices setConfirmation={setConfirmation} />} />
            <Route path="/admin/add" element={<AdminAddService setConfirmation={setConfirmation} />} />
            <Route path="/admin/confirmation" element={<AdminConfirm confirmation={confirmation} />} />


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

const Navigate = styled(Link)``

export default App;