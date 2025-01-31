import React from 'react'
import Dheader from '../../components/Dheader'
import Footer from '../../components/Footer'
import {LogIn , UserPlus} from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Doctor:React.FC = () => {
  const navigate= useNavigate();
    const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
        <Dheader/>
        <div>
        
        <main className="flex-grow flex items-center justify-center p-6 ">
        <div
   className="min-h-screen flex items-center justify-center bg-cover bg-center "
   style={{ backgroundImage: `url('/images/doctor.jpeg')` }}
 >
   </div>
   <div className="bg-white/60 rounded-xl shadow-2xl p-8 w-full max-w-md text-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">Doctor Portal</h2>
          <p className="text-gray-600 mb-8">Please choose an option below</p>
          
          <div className="flex justify-center space-x-6">
            {/* <button 
              className="flex flex-col items-center bg-blue-500 text-white p-4 rounded-lg hover:bg-blue-600 transition w-40 " onClick={() => navigate("/Register")}
            >
<UserPlus size={40} className="mb-2"  />
              <span>Register</span>
            </button> */}
            <button 
              className="flex flex-col items-center bg-green-500 text-white p-4 rounded-lg hover:bg-green-600 transition w-40" onClick={() => navigate("/DoctorLogin")}
            >
              <LogIn size={40} className="mb-2" />
              <span>Login</span>
            </button>
          </div>
        </div>
      </main>


   </div>
        <Footer/>
      
    </div>
  )
}

export default Doctor;
