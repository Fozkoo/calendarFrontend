import { useEffect, useState } from "react";
import methodsNotifications from "../service/Helper"; 
import { useAuth } from "../context/AuthContext";
import Swal from 'sweetalert2';
import servicesAPI from "../service/Helper";
import axios from "axios";

interface Notification {
  id: number;
  type: string;
}

function AddEventComponent() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [eventTitle, setEventTitle] = useState<string>("");
  const [eventTime, setEventTime] = useState<string>("");
  const [eventDate, setEventDate] = useState<string>("");
  const [urlAttachment, setUrlAttachment] = useState<string>("");
  const [notificationId, setNotificationId] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { userId, token, logout } = useAuth(); 



  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const data: Notification[] = await methodsNotifications.getAllNotifications();
        setNotifications(data); 
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, []);

  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Submitting event form...");
    if (!eventTitle || !eventTime || !eventDate || !urlAttachment || !notificationId) {
      setErrorMessage("Todos los campos son obligatorios.");
      console.error("Validation failed: All fields are required.");
      return;
    }

    setErrorMessage("");

   
    try {
      console.log("Verifying user authorization...");
      const systemId = "4";
      if (!token) {
        throw new Error("No se encontró el token de sesión.");
      }

      const isAuthorized = await methodsNotifications.authorized(token as string, systemId as string);
     
      console.log("User ID:", userId);
      console.log("Token:", token);
      console.log("System ID:", systemId);
      console.log("Is authorized:", isAuthorized);

      if (isAuthorized.authorized == false) {
        setErrorMessage("No estás autorizado para realizar esta acción.");
        console.warn("User not authorized.");
        Swal.fire({
          title: 'Error!',
          text: 'User not authorized.',
          icon: 'error',
          confirmButtonText: 'Logout'
        }).then(() => {
          logout();
        });
        return;
      } else if (isAuthorized.authorized == true) {
        console.log("User authorized.");
      }
    } catch (error) {
      console.error("Error verifying authorization");
      Swal.fire({
        title: 'Error!',
        text: 'User not authorized.',
        icon: 'error',
        confirmButtonText: 'Logout'
      }).then(() => {
        logout();
      });
      setErrorMessage("Error verificando autorización. Por favor, inténtalo de nuevo.");
      return;
    }

    const newEvent = {
      eventTitle,
      eventTime,
      eventDate,
      idUser: userId,
      urlAttachment,
      notificationId,
    };

    console.log("Event data to be created:", newEvent);

    try {
      const response = await servicesAPI.createNewEvent(newEvent);

        

    } catch (error: any) {
      console.error("Error creating event:", error);
      }
    }
    



  return (
    <div className="container-addEventComponent flex justify-center items-center w-full h-[100vh]">
      <div className="container-form flex justify-center items-center bg-white rounded-xl w-[600px] h-[650px] shadow-lg ">
        <form
          onSubmit={handleSubmit}
          className="bg-[#EDEDED] flex gap-5 h-[550px] w-[85%] flex-col justify-center items-center rounded-xl p-3 max-2xl:p-0 max-2xl:w-[95%]"
        >
          <div className="input text-white w-[80%] h-14 flex items-center justify-center rounded-lg px-7 max-2xl:w-[75%]">
            <p className="text-white text-2xl">New Event</p>
          </div>
          {errorMessage && (
            <p className="text-red-500 text-sm">{errorMessage}</p>
          )}
          <div className="input w-[80%] h-14 flex items-center justify-between rounded-lg px-7 bg-gray-800 max-2xl:w-[75%] max-2xl:px-4">
            <p className="text-white text-2xl max-2xl:text-xl">Hour</p>
            <input
              type="time"
              value={eventTime}
              onChange={(e) => setEventTime(e.target.value)}
              className="w-40 h-10 border-none rounded-md px-2 max-2xl:w-32"
              required
            />
          </div>

          <div className="input w-[80%] h-14 flex items-center justify-between rounded-lg px-7 bg-gray-800 max-2xl:w-[75%] max-2xl:px-4">
            <p className="text-white text-2xl max-2xl:text-xl">Date</p>
            <input
              type="date"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
              className="w-40 h-10 border-none rounded-md px-2 max-2xl:w-32"
              required
            />
          </div>

          <div className="input w-[80%] h-14 flex items-center justify-between rounded-lg px-7 bg-gray-800 max-2xl:w-[75%] max-2xl:px-4">
            <p className="text-white text-2xl max-2xl:hidden">Name event</p>
            <p className="text-white hidden text-xl max-2xl:flex">Name</p>
            <input
              type="text"
              placeholder="Name event"
              value={eventTitle}
              onChange={(e) => setEventTitle(e.target.value)}
              className="w-40 h-10 border-none rounded-md px-2 max-2xl:w-32"
              required
            />
          </div>
          <div className="input w-[80%] h-14 flex items-center justify-between rounded-lg px-7 bg-gray-800 max-2xl:w-[75%]  max-2xl:px-4">
            <p className="text-white text-2xl max-2xl:text-base">Description</p>
            <input
              type="text"
              placeholder="Attachment"
              value={urlAttachment}
              onChange={(e) => setUrlAttachment(e.target.value)}
              className="w-40 h-10 border-none rounded-md px-2 max-2xl:w-32"
              required
            />
          </div>
          <div className="input w-[80%] h-14 flex items-center justify-between rounded-lg px-7 bg-gray-800 max-2xl:w-[75%] max-2xl:px-4">
            <p className="text-white text-2xl max-2xl:text-xl">Notification</p>
            <select
              value={notificationId || ""}
              onChange={(e) => setNotificationId(Number(e.target.value))}
              className="w-40 h-10 border-none rounded-md px-2 max-2xl:w-32"
              required
            >
              <option value="" disabled>
                Select Notification
              </option>
              {notifications.map((notification) => (
                <option key={notification.id} value={notification.id}>
                  {notification.type}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="input text-2xl w-[80%] h-10 text-white rounded-2xl max-2xl:w-[75%]"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddEventComponent;
