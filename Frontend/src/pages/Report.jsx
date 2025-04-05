import React from 'react'
import Navbar from '../Components/ui/Navbar'
import FileUpload from '../Components/FileUpload'
import Footer from '../Components/ui/Footer'

const testUserId="67ebca51529944a139ede865";
function Report() {
  return (
    <div>
        <Navbar />
        <FileUpload />
        <Footer />
    </div>
  )
}

export default Report