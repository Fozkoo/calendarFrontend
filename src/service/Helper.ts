import axios from "axios";

const URL = "https://poo2024.unsada.edu.ar/cuentas/login?Content-Type=application/json";


const login = async (username: string, password: string) => {
    try {
      const response = await axios.post(URL, { username, password });
      return response.data;
    } catch (error) {
      return error;
    }
}
  


const servicesAPI = {
    login,
};


export default servicesAPI;

