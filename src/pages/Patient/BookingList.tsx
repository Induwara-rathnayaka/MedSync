import React, { useEffect, useState } from 'react';
import { getBookingByPaitient, deleteBooking } from '../../services/BookingRoutes';
import { useLocation } from 'react-router-dom';
import { incrementshedule } from "../../services/ShedualeRoutes";

interface Booking {
    id: string;  
    doctorName: string;
    doctorId: string;  // Corrected field name
    day: string;
    time: string;
}

export const BookingList: React.FC = () => {
    const location = useLocation();
    const { paitienEmail } = location.state || {};

    const [booking, setBooking] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBooking = async () => {
            try {
                const data = await getBookingByPaitient(paitienEmail);
                if (Array.isArray(data)) {
                    setBooking(data);
                } else {
                    setBooking([]);
                }
            } catch (error) {
                console.error('Error fetching doctors:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchBooking();
    }, [paitienEmail]);

    const handleDelete = async (bookingId: string, doctorName: string, day: string, time: string) => {
        try {
            await deleteBooking(bookingId);
            console.log(doctorName);
            await incrementshedule(doctorName,day,time);
            setBooking(prevBookings => prevBookings.filter(book => book.id !== bookingId));
        } catch (error) {
            console.error('Error deleting booking:', error);
        }
    };

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-2xl font-bold text-center mb-4">Your Booking</h2>
            {loading ? (
                <p className="text-center text-gray-600">Loading...</p>
            ) : booking.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {booking.map((book) => (
                        <div key={book.id} className="bg-white shadow-lg rounded-lg p-4 border border-gray-200">
                            <h3 className="text-lg font-semibold text-blue-800">Doctor Name <br />{book.doctorName}</h3>
                            <p className="text-gray-600"><strong>Time Slot:</strong> {book.time}</p>
                            <p className="text-gray-600"><strong>Date:</strong> {book.day}</p>
                            <p className="text-gray-600"><strong>Date:</strong> {book.doctorName}</p>
                            <div className="flex justify-between mt-4">
                                <button
                                    onClick={() => handleDelete(book.id, book.doctorName, book.day, book.time)}
                                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-500">You are not Booked</p>
            )}
        </div>
    );
};

export default BookingList;
