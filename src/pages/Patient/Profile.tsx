import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { getPatientByEmail, updatePatient } from '../../services/PatientRoutes';
import { Patient } from '../../types/patientTypes';

const Profile: React.FC = () => {

  const location = useLocation();
  const {paitienEmail} = location.state || {};

  const navigate = useNavigate();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<Patient>({
    name: '',
    age: '',
    email: '',
    contactNo: '',
  });

  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const response = await getPatientByEmail(paitienEmail);
        setPatient(response);
        setFormData(response || { name: '', age: '', email: '', contactNo: '' });
      } catch (error) {
        console.error('Error fetching patient details:', error);
      }
    };
    fetchPatientDetails();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async () => {
    try {
      await updatePatient(formData.email, formData); // FIXED: Used formData.email
      setPatient(formData);
      setIsModalOpen(false);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error('Error updating patient:', error);
      alert("Failed to update profile. Try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 flex flex-col">
      <Header />
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-white/30 backdrop-blur-sm rounded-xl shadow-2xl max-w-md w-full p-8 border border-blue-100">
          <h2 className="text-3xl font-bold text-blue-800 text-center mb-4">Patient Profile</h2>
          {patient ? (
            <div className="space-y-4">
              <p className="text-gray-700 font-semibold">Name: <span className="text-gray-900">{patient.name}</span></p>
              <p className="text-gray-700 font-semibold">Age: <span className="text-gray-900">{patient.age}</span></p>
              <p className="text-gray-700 font-semibold">Email: <span className="text-gray-900">{patient.email}</span></p>
              <p className="text-gray-700 font-semibold">Contact No: <span className="text-gray-900">{patient.contactNo}</span></p>

              <div className="flex flex-col space-y-3 mt-6">
                <button
                  className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition transform hover:scale-[1.02]"
                  onClick={() => setIsModalOpen(true)}
                >
                  Update Profile
                </button>
                <button
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition transform hover:scale-[1.02]"
                  onClick={() => navigate("/BookingList", { state: { paitienEmail: patient.email } })}
                >
                  View Booking Details
                </button>
              </div>
            </div>
          ) : (
            <p className="text-gray-600 text-center">Loading patient details...</p>
          )}
        </div>
      </div>
      <Footer />

      {/* Modal for updating profile */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h3 className="text-xl font-bold text-center mb-4">Edit Profile</h3>
            <div className="space-y-3">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full Name"
                className="w-full border p-2 rounded"
              />
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                placeholder="Age"
                className="w-full border p-2 rounded"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                disabled
                className="w-full border p-2 rounded bg-gray-100 cursor-not-allowed"
              />
              <input
                type="text"
                name="contactNo"
                value={formData.contactNo}
                onChange={handleChange}
                placeholder="Contact Number"
                className="w-full border p-2 rounded"
              />
            </div>
            <div className="flex justify-between mt-4">
              <button className="bg-gray-500 text-white px-4 py-2 rounded" onClick={() => setIsModalOpen(false)}>
                Cancel
              </button>
              <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700" onClick={handleUpdate}>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
