import axios from "axios";

const URL = "https://poo-dev.unsada.edu.ar:8088/cuentas/API/login";

const urlAPI = "https://poo-dev.unsada.edu.ar:8084/api/events"

const urlNotificationsAPI = "https://poo-dev.unsada.edu.ar:8084/api/notifications/"
                              // localhost:8080
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

const authorized = async (token: string, systemId: string) => {
  try {
    const URL = "https://poo-dev.unsada.edu.ar:8088/cuentas/API/authorize";
    const response = await axios.post(URL, { token, systemId });
    return response.data;
  } catch (err){
    console.log(err);
    throw err;
  }
};


const getDataUser = async (token: string, userId: string) => {
  try {
    const URL = (`https://poo-dev.unsada.edu.ar:8088/cuentas/API/users/${userId}?token=${token}`);
    const response = await axios.get(URL);
    return response.data;
  } catch (error) {
    throw error;
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
    return response.data;
  } catch (error) {
    return error;
  }
};


const deleteEvents = async (eventId: any) => {
  try {
    const response = await createApi.delete(`/deleteEventById/${eventId}`);
    return response.data;
  } catch (error) {
    return error;
  }
}


const modifyEvent = async (eventId: string, formData: any) => {
  try {
      const response = await createApi.put(`/modifyEventById/${eventId}`, formData);
      return response.data;
  } catch (error) {
      console.error("Network Error", error);
      throw error;
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
    createNewEvent,
    deleteEvents,
    modifyEvent,
    authorized,
    getDataUser
};


const methodsNotifications = {
  getAllNotifications
}


export default servicesAPI ; methodsNotifications;

