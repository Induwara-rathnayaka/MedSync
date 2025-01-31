import axios from "axios";

const BASE_URL = "http://localhost:8080/DoctorAdmins";

export interface DoctorAdmin {
    adminId: string;
    password: string;
}

export const createDoctorAdmin = async (doctorAdmin: DoctorAdmin) => {
    await axios.post(`${BASE_URL}/create`, doctorAdmin)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
  export const getDoctorAdminById = async (id: string) => {
    await axios.get<DoctorAdmin>(`${BASE_URL}/getById/${id}`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
  export const getAllDoctorAdmins = async () => {
    await axios.get<DoctorAdmin[]>(`${BASE_URL}/getAll`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
  export const updateDoctorAdmin = async (id: string, doctorAdmin: DoctorAdmin) => {
    await axios.put<DoctorAdmin>(`${BASE_URL}/update/${id}`, doctorAdmin)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
  export const deleteDoctorAdmin = async (id: string) => {
    await axios.delete<string>(`${BASE_URL}/delete/${id}`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };