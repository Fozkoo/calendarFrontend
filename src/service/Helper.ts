import axios from "axios";

const URL = "https://poo2024.unsada.edu.ar/cuentas/login";

const urlAPI = "http://localhost:8080/api/events"

const createApi = axios.create({
  baseURL: urlAPI,
})



const login = async (username: string, password: string) => {
    try {
      const response = await axios.post(URL, { username, password });
      return response.data;
    } catch (error) {
      return error;
    }
}


const getBlocks = async () => {
    try {
        const response = await createApi.get("/getAllBlocksByMonthId/2");
        return response.data;
    } catch (error) {
        return error;
    }
}

const getAllEvents = async () => {
  try {
    const response = await createApi.get("/getAllEvents");
    return response.data;
  } catch (error) {
    return error;
  }
}

const getAllEventsByIdUser = async (userId: any) => {
  try {
    const response = await createApi.get(`/user/${userId}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    return error;
  }
};






const servicesAPI = {
    login,
    getBlocks,
    getAllEvents,
    getAllEventsByIdUser
};


export default servicesAPI;

