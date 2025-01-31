export interface Booking {
    id?: string;
    patientEmail?: string; 
    DocterID?: string;
    paymentMethod: string;  
    day: string;
    time: string;
}
