import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import { createPatient } from '../../services/PatientRoutes';
import { Patient } from '../../types/patientTypes';

const PatientRegistation: React.FC = () => {
  const navigate = useNavigate();
  const [patientRegistation, setPatientRegistation] = useState<Patient>({
    name: "",
    age: 0,
    email: "",
    password: "",
    confirmPassword: "", // New confirm password field
    contactNo: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    // Name Validation
    if (!patientRegistation.name.trim()) {
      newErrors.name = "Name is required";
    }

    // Email Validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(patientRegistation.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // NIC Validation
    if (patientRegistation.age <= 18 || patientRegistation.age > 100) {
      newErrors.age = "Age is required";
    }
    
    // Password Validation
    if (!patientRegistation.password.trim()) {
      newErrors.password = "Password is required";
    }

    // Confirm Password Validation
    if (patientRegistation.confirmPassword !== patientRegistation.password) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    // Contact Number Validation (10 digits)
    if (!/^\d{10}$/.test(patientRegistation.contactNo)) {
      newErrors.contactNo = "Contact number must be 10 digits";
    }


    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;
    setPatientRegistation({
      ...patientRegistation,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    });

    // Clear errors on change
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      try {
        // Create a new patient object without the confirmPassword field
        const { confirmPassword, ...patientData } = patientRegistation;

        // Submit the patient data without confirmPassword
        await createPatient(patientData);
        alert("Registration successful");
        navigate("/Profile",  { state: { paitienEmail: patientRegistation.email } });
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    } else {
      console.log("Validation errors:", errors);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 flex flex-col">
      <Header />
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-white/30 backdrop-blur-sm rounded-xl shadow-2xl max-w-md w-full p-8 border border-blue-100">
          <h2 className="text-3xl font-bold text-blue-800 text-center mb-4">Patient Registration</h2>
          <p className="text-gray-600 text-center mb-6">Join Our Health Platform</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your name"
                value={patientRegistation.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-gray-700">Age</label>
              <input
                type="number"
                name="age"
                placeholder="Enter your age"
                value={patientRegistation.age}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              {errors.age && <p className="text-primary-color text-sm">{errors.age}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={patientRegistation.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your Password"
                value={patientRegistation.password}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-gray-700 font-semibold mb-2">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm your Password"
                value={patientRegistation.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
            </div>

            <div>
              <label htmlFor="contactNo" className="block text-gray-700 font-semibold mb-2">Contact Number</label>
              <input
                type="tel"
                id="contactNo"
                name="contactNo"
                placeholder="Enter your contact number"
                value={patientRegistation.contactNo}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                maxLength={10}
              />
              {errors.contactNo && <p className="text-red-500 text-sm">{errors.contactNo}</p>}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition transform hover:scale-[1.02]"
            >
              Register
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PatientRegistation;
