import React, { useEffect, useState } from "react";
import { getDoctorById, updateDoctorById } from "../../services/DoctorRoutes";
import Dheader from "../../components/Dheader";
import Footer from "../../components/Footer";
import { useNavigate } from "react-router-dom";

const DocProfile: React.FC = () => {
  
  const [doctor, setDoctor] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const doctorID = localStorage.getItem("doctorID");
    if (!doctorID) {
      alert("No Doctor ID found. Please log in again.");
      navigate("/DoctorLogin");
      return;
    }

    const fetchDoctorDetails = async () => {
      try {
        const data = await getDoctorById(doctorID);
        if (!data) {
          alert("Doctor not found. Please log in again.");
          navigate("/DoctorLogin");
          return;
        }
        setDoctor(data);
        setEmail(data.email);
        setContactNumber(data.contactNumber);
      } catch (error) {
        console.error("Failed to fetch doctor details:", error);
        alert("Error loading doctor details.");
      }
    };

    fetchDoctorDetails();
  }, [navigate]);

  const handleSave = async () => {
    if (!doctor) return;

    const updatedDoctor = {
      doctorID: doctor.doctorID,
      name: doctor.name,
      specialty: doctor.specialty,
      email,
      contactNumber,
      password: password || undefined, // Only update password if provided
    };

    try {
      await updateDoctorById(doctor.doctorID, updatedDoctor);
      alert("Profile updated successfully!");
      setDoctor({ ...doctor, email, contactNumber });
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Profile update failed.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Dheader />
      <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Doctor Profile</h2>

        {doctor && (
          <div className="space-y-3">
            <p><strong>ID:</strong> {doctor.doctorID}</p>
            <p><strong>Name:</strong> {doctor.name}</p>
            <p><strong>Specialty:</strong> {doctor.specialty}</p>

            {isEditing ? (
              <>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="border p-2 w-full mb-2" />
                <input type="text" value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} className="border p-2 w-full mb-2" />
                <input type="password" placeholder="New Password (optional)" value={password} onChange={(e) => setPassword(e.target.value)} className="border p-2 w-full mb-2" />

                <div className="mt-6 flex space-x-4">
                  <button onClick={() => setIsEditing(false)} className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600">
                    Cancel
                  </button>
                  <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                    Save Changes
                  </button>
                </div>
              </>
            ) : (
              <>
                <p><strong>Email:</strong> {doctor.email}</p>
                <p><strong>Contact:</strong> {doctor.contactNumber}</p>

                <div className="mt-6 flex flex-wrap gap-4">
                  <button onClick={() => navigate("/Schedule2", { state: { id: doctor.doctorID, name: doctor.name } })} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
                    Schedule
                  </button>
                  <button onClick={() => setIsEditing(true)} className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition">
                    Update Profile
                  </button>
                  <button onClick={() => navigate("/BookedList", { state: { doctorID: doctor.doctorID } })} className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition">
                    View Bookings
                  </button>
                  <button onClick={() =>  navigate("/ViewSchedule" , {state: {dnames : doctor.name }})} className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition">
                    View Schedule
                  </button>
                </div>
              </>
            )}
          </div>
        )}

        {!doctor && <p>Loading doctor details...</p>}
      </div>
      <Footer />
    </div>
  );
};

export default DocProfile;
