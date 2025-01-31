export interface Booking {
    id?: string;
    patientEmail?: string; 
    DocterEmail?: string;
    paymentMethod: string;  
    day: string;
    time: string;
}
