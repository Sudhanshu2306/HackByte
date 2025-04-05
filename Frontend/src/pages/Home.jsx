import React from 'react'
import Navbar from '../Components/ui/Navbar'
import ServicePage from '../Components/ServicePage'
import TestimonialPage from '../Components/TestimonialPage'
import WorkingProcess from '../Components/WorkingProcess'
import Team from './Team'
import Footer from '../Components/ui/Footer'
import ProgressLine from '../Components/Progress/ProgressLine'
import Bot from '../Components/Bot'
import Banner from "../Components/Banner.jsx";

function Home() {
  return (
    <div>
        <Navbar />
        <Banner/>
        <ServicePage />
        <WorkingProcess />
        <ProgressLine />
        <Team />
        <TestimonialPage />
        <Footer />
        <Bot />
    </div>
  )
}

export default Home