import React, { useState } from 'react';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import apiClient from '../../axios/axios'; // Make sure to import your apiClient

interface DoctorInfo {
  name: string;
  email: string;
  phone: string;
  specialization: string;
  password: string;
}

const Form: React.FC = () => {
  const [doctorInfo, setDoctorInfo] = useState<DoctorInfo>({
    name: "",
    email: "",
    phone: "",
    specialization: "",
    password: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    // Name Validation
    if (!doctorInfo.name.trim()) {
      newErrors.name = "Name is required";
    }

    // Phone Number Validation (10 digits)
    if (!/^\d{10}$/.test(doctorInfo.phone)) {
      newErrors.phone = "Phone number must be 10 digits";
    }

    // Email Validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(doctorInfo.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Password Validation
    if (!doctorInfo.password.trim()) {
      newErrors.password = "Password is required";
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
    setDoctorInfo({
      ...doctorInfo,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    });

    // Clear errors on change
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      try {
        const response = await apiClient.post('/Docter/create', doctorInfo);
        console.log('Form submitted successfully:', response.data);
        // Navigate to another page or show a success message
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    } else {
      console.log("Validation errors:", errors);
    }
  };

  return (
    <>
      <Header />
      <div className="max-w-2xl mx-auto mt-10 px-6 py-8 bg-white shadow-md rounded-md">
        <h2 className="text-3xl font-bold text-center mb-4">Doctor Registration</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={doctorInfo.name}
                onChange={handleChange}
                className={`w-full border rounded px-3 py-2 focus:outline-none ${
                  errors.name ? "border-primary-color" : "focus:ring focus:ring-blue-300"
                }`}
                required
              />
              {errors.name && <p className="text-primary-color text-sm">{errors.name}</p>}
            </div>
            <div>
              <label className="block text-gray-700">Phone number</label>
              <input
                type="tel"
                name="phone"
                placeholder="Enter your phone number"
                value={doctorInfo.phone}
                onChange={handleChange}
                maxLength={10}
                className={`w-full border rounded px-3 py-2 focus:outline-none ${
                  errors.phone ? "border-primary-color" : "focus:ring focus:ring-blue-300"
                }`}
              />
              {errors.phone && <p className="text-primary-color text-sm">{errors.phone}</p>}
            </div>
            <div>
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={doctorInfo.email}
                onChange={handleChange}
                className={`w-full border rounded px-3 py-2 focus:outline-none ${
                  errors.email ? "border-primary-color" : "focus:ring focus:ring-blue-300"
                }`}
              />
              {errors.email && <p className="text-primary-color text-sm">{errors.email}</p>}
            </div>
            <div>
              <label className="block text-gray-700">Specialization</label>
              <input
                type="text"
                name="specialization"
                placeholder="Enter your specialization"
                value={doctorInfo.specialization}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>
            <div>
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={doctorInfo.password}
                onChange={handleChange}
                className={`w-full border rounded px-3 py-2 focus:outline-none ${
                  errors.password ? "border-primary-color" : "focus:ring focus:ring-blue-300"
                }`}
              />
              {errors.password && <p className="text-primary-color text-sm">{errors.password}</p>}
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-teal-600 text-white font-semibold py-2 rounded hover:bg-teal-700 transition duration-300"
          >
            Register
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Form;