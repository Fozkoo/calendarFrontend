import axios from "axios";

const URL = "https://poo2024.unsada.edu.ar/cuentas/login";

const urlAPI = "http://localhost:8080/api/events"

const urlNotificationsAPI = "http://localhost:8080/notifications/"

const createApi = axios.create({
  baseURL: urlAPI,
})

const createNotificationsApi = axios.create({
  baseURL: urlNotificationsAPI,
})


// methods for login

const login = async (username: string, password: string) => {
    try {
      const response = await axios.post(URL, { username, password });
      return response.data;
    } catch (error) {
      return error;
    }
}


// methods for events

const createNewEvent = async (event: any) => {
  try {
    const response = await createApi.post("/createEvent", event);
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
    const response = await createApi.get(`/getAllEventByIdUser/${userId}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    return error;
  }
};



// methods to notifications

const getAllNotifications = async () => {
  try {
    const response = await createNotificationsApi.get("/getAllNotifications");
    return response.data;
  } catch (error) {
    return error;
  }
}




const servicesAPI = {
    login,
    getAllEvents,
    getAllEventsByIdUser,
    getAllNotifications,
    createNewEvent
};


const methodsNotifications = {
  getAllNotifications
}


export default servicesAPI ; methodsNotifications;

