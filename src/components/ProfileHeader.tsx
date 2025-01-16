import React from 'react'
import image from "../assets/Images/logo.png";
import { useNavigate } from "react-router-dom";
import {useState} from "react";
import { Link } from "react-router-dom";

export const ProfileHeader:React.FC = () => {
    const navigate= useNavigate();
      const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="w-full flex justify-center bg-background-color items-center">
      <div className="flex flex-row container bg-background-color px-5 py-2">
        <div className="basis-1/4 hover:cursor-pointer" onClick={() => navigate("/")} >
          <img 
            className="flex items-center w-[130px]  rounded-xl"
            src={image}
            alt="logo"
          />
        </div>
        <div className="basis-2/4 flex gap-5 font-semibold cursor-pointer justify-center items-center ">
          <div
            className=" hover:text-[#007E85] bg-white p-2 rounded-md"
            onClick={() => navigate("/")}
          >
            Home
          </div>
          
          <div
            className=" hover:text-[#007E85] bg-white p-2 rounded-md"
            onClick={() => navigate("/DoctorChannel")}
          >
            Doctor Channel
          </div>
          <div
            className=" hover:text-[#007E85] bg-white p-2 rounded-md"
            onClick={() => navigate("/About")}
          >
            About
          </div>
          <div
            className=" hover:text-[#007E85] bg-white p-2 rounded-md"
            onClick={() => navigate("/ContactUs")}
          >
            Contact Us
          </div>

        </div>
        <div className="relative">
      {/* Button to toggle dropdown */}
      <button
        className="px-4 py-2 bg-primary-color text-white rounded-md hover:bg-secondary-color focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
      User
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg font-semibold">
          <Link
            to="/"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Patient
          </Link>
          <Link
            to="/Dhome"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Doctor
          </Link>
          <Link
            to="/AHome"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Admin
          </Link>
          
        </div>
      )}
      
    </div>
      </div>
      
    </div>
  )
}
