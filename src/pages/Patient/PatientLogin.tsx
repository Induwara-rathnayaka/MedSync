import React, { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useLocation, useNavigate } from "react-router-dom";
import { loging } from '../../services/PatientRoutes';
import { bookshedule } from "../../services/ShedualeRoutes";
import {createBooking } from "../../services/BookingRoutes";
import {Booking} from "../../types/BookingTypes";

const PatientLogin: React.FC = () => {

  const location = useLocation();
  const {id, name , day, time } = location.state || {};

  const [booking, setBooking] = useState<Booking>({
    patientEmail: "",
    doctorName: "",
    docterId:"",
    day: "",
    time: "",
  });

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
        const responseData: string = await loging(email, password);
        console.log("Response Data:", responseData); // 🔍 Debugging

        if (responseData === "Login Sucsessfull") { 
            const response = await bookshedule(id , day , time)
            booking.docterId=id;
            booking.doctorName = name;
            booking.day = day;
            booking.time = time;
            alert(response);
            await createBooking(booking);

            navigate("/Profile",  { state: { paitienEmail: email } });
        } else if (responseData === "Patient not found") {
          localStorage.setItem("paitientEmail", email);
          alert("You are Not register Paitient ")
            navigate("/PatientRegistation");  // ✅ Navigate to registration page
        } else {
            alert(responseData || "Unexpected error. No response data.");
        }
    } catch (error: any) {
        console.error("Error logging in:", error);

        if (error.response) {
            alert(error.response.data || "Error from server but no message.");
        } else {
            alert("An unexpected error occurred. Please try again.");
        }
    }
};


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 flex flex-col">
      <Header />
      <div
        className="min-h-screen bg-cover bg-center flex items-center justify-center p-4 bg-primary-green"
        style={{
          backgroundImage: 'url("/src/assets/Images/8.jpg")',
          backgroundBlendMode: 'overlay',
          backgroundColor: ''
        }}
      >
        <div className="bg-white/30 backdrop-blur-sm rounded-xl shadow-2xl max-w-md w-full p-8 border border-blue-100">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-blue-800 mb-2">Patient Login</h2>
            <p className="text-gray-600">Please enter your credentials</p>
          </div>
          <div className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
                Email
              </label>
              <input
                  type="email"
                  id="email"
                  value={email} // ✅ Use email state for input
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setBooking((prevBooking) => ({
                      ...prevBooking,
                      patientEmail: e.target.value, // ✅ Sync booking.patientEmail
                    }));
                  }}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ease-in-out"
                  placeholder="Enter your email"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ease-in-out"
                placeholder="Enter your password"
              />
            </div>
            {error && (
              <div className="text-red-500 text-sm bg-red-50 p-3 rounded-lg animate-pulse">
                {error}
              </div>
            )}
            <button
              onClick={handleSubmit}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-[1.02] shadow-md hover:shadow-lg"
            >
              Login
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PatientLogin;