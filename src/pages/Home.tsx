import { useState, useEffect } from "react";

import servicesAPI from "../service/Helper";

import { useAuth } from "../context/AuthContext";

import { Header } from "../components/Header";
import Footer from "../components/Footer";
import AddEventComponent from "../components/AddEventComponent";
import DeleteEventMenu from "../components/DeleteEventMenu";
import ModifyEventMenu from "../components/ModifyEventMenu";

import "../styles/Home.css";
import "../styles/MainMenu.css";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import Swal from "sweetalert2";
import moment from "moment-timezone";
import fs from "fs";


function Home() {
  const [data, setData] = useState([]);
  const [menuVisible, setMenuVisible] = useState(true);
  const [addEventVisible, setAddEventVisible] = useState(false);
  const [deleteEventVisible, setDeleteEventVisible] = useState(false);
  const [modifyEventVisible, setModifyEventVisible] = useState(false);
  const [userName, setUserName] = useState<String>("");
  const { userId, token, logout } = useAuth();
  
  const [notifiedEvents, setNotifiedEvents] = useState<Set<string>>(new Set());

  
  const userValidate = async () => {
    try {
      const tokenReal = token as string;
      let authorizeResponse = await servicesAPI.authorized(tokenReal, "4");
      console.log("authorizeResponse: ", authorizeResponse.authorized);
      if (authorizeResponse.authorized === false) {
        Swal.fire({
          title: 'Warning!',
          text: 'The session has expired, please log in again.',
          icon: 'warning',
          confirmButtonText: 'Logout'
        }).then(() => {
          logout();
        });
      }
    } catch (error) {
      logout();
    }
  }

  useEffect(() => {
    if (!userId) return;
  
    // Ejecutar `userValidate` inmediatamente al montar
    userValidate();
  
    // Crear un intervalo que ejecute `userValidate` cada minuto
    const intervalId = setInterval(() => {
      userValidate();
    }, 30000); // 60000 ms = 1 minuto
  
    // Limpia el intervalo al desmontar el componente
    return () => clearInterval(intervalId);
  }, [userId]); // Se ejecuta solo cuando `userId` cambia



  useEffect(() => {
    if (!userId) return;
  
    const fetchEvents = async () => {
      try {
        const events = await servicesAPI.getAllEventsByIdUser(userId);
        const formattedEvents = events.map((event: { eventTitle: any; eventDay: any }) => ({
          title: event.eventTitle,
          date: event.eventDay,
        }));
        setData(formattedEvents);
        scheduleNotifications(events); // Llamar a `scheduleNotifications` aquí
        console.log("Events fetched:", events);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
  
    const fetchUserName = async () => {
      try {
        const tokenReal = token as string;
        const userData = await servicesAPI.getDataUser(tokenReal, userId);
        setUserName(userData.firstName);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
  
    fetchEvents();
    fetchUserName();
  }, [userId]);
  
  

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const handleNewEvent = () => {
    setAddEventVisible(true);
  };

  const handleCloseAddEvent = () => {
    setAddEventVisible(false);
  };

  const handleDeleteEvent = () => {
    setDeleteEventVisible(true);
  };

  const handleCloseDeleteEvent = () => {
    setDeleteEventVisible(false);
  };

  const handleModifyEvent = () => {
    setModifyEventVisible(true);
  };

  const handleCloseModifyEvent = () => {
    setModifyEventVisible(false);
  };


  const isAnyModalVisible = addEventVisible || deleteEventVisible || modifyEventVisible;


  interface Event {
    eventId: number;
    eventTitle: string;
    eventTime: string;
    eventDay: string;
    eventUser: string;
    attachments: { id: number; url: string }[];
    notifications: { id: number; type: string }[];
  }


  const scheduleNotifications = (events: Event[]) => {
    events.forEach((event) => {
      event.notifications.forEach((notification) => {
        const notificationTime = calculateNotificationTime(event.eventDay, event.eventTime, notification.type);
        if (!notificationTime) return;

        const delay = notificationTime.getTime() - new Date().getTime();
        if (delay > 0) {
          console.log(moment.tz(notificationTime, "America/Argentina/Buenos_Aires").format("YYYY-MM-DDTHH:mm"))
          console.log("delayyyy :" + delay)
          setTimeout(() => sendNotification(event, notification.type), delay);
        }
      });
    });
  };

  const calculateNotificationTime = (eventDay: string, eventTime: string, type: string): Date | null => {
  const eventDate = moment.tz(`${eventDay}T${eventTime}`, "YYYY-MM-DDTHH:mm", "America/Argentina/Buenos_Aires").toDate();

  switch (type) {
    case "1 hora antes":
      return new Date(eventDate.getTime() - 60 * 60 * 1000);
    case "40 minutos antes":
      return new Date(eventDate.getTime() - 40 * 60 * 1000);
    case "5 minutos antes":
      return new Date(eventDate.getTime() - 1 * 60 * 1000); // Asegurando que sea 5 minutos
    case "1 minuto antes":
      return new Date(eventDate.getTime() - 1 * 60 * 1000);
    default:
      return null;
  }
};

  const sendNotification = async (event: Event, type: string) => {
    if (notifiedEvents.has(event.eventId + type)) {
      console.log(`Notificación ya enviada para el evento ${event.eventId} (${type}).`);
      return; // Evita enviar notificación si ya fue notificada
    }
  
    const payload = {
      token: "X",
      systemId: "4",
      from: "grupo4@gugle.com",
      to: ["grupo4@gugle.com"],
      subject: `Notificación: ${event.eventTitle}`,
      body: `Este es un recordatorio para el evento: ${event.eventTitle}, programado para ${event.eventDay} a las ${event.eventTime}. Tipo de notificación: ${type}.`,
      attachments: event.attachments.map((attachment) => ({
        filename: `attachment-${attachment.id}`,
        url: attachment.url,
      })),
    };
  
    try {
      await servicesAPI.sendNotifications(payload);
      setNotifiedEvents((prevState) => new Set(prevState.add(event.eventId + type))); // Marcar como notificado
      const successMessage = `Notificación enviada para el evento ${event.eventId} (${type}).`;
      console.log(successMessage);
    } catch (error) {
      const errorMessage = `Error enviando notificación para el evento ${event.eventId} (${type}): ${error}`;
      console.error(errorMessage);
    }
  };
  
  


  return (
    <>
    
      <div
        className={`container-addEvent flex flex-col justify-center items-center bg-[#EDEDED] w-full h-[100vh] fixed z-30 ${
          addEventVisible ? "flex" : "hidden"
        }`}
      >
        <button
          className="absolute top-7 right-7 bi bi-x-circle text-4xl"
          onClick={handleCloseAddEvent}
        ></button>
        <AddEventComponent />
      </div>

 
      <div
        className={`container-deleteEvent flex flex-col justify-center items-center bg-[#EDEDED] w-full h-[100vh] fixed z-30 ${
          deleteEventVisible ? "flex" : "hidden"
        }`}
      >
        <button
          className="absolute top-7 right-7 bi bi-x-circle text-4xl"
          onClick={handleCloseDeleteEvent}
        ></button>
        <DeleteEventMenu />
      </div>

    
      <div
        className={`container-modifyEvent flex flex-col justify-center items-center bg-[#EDEDED] w-full h-[100vh] fixed z-30 ${
          modifyEventVisible ? "flex" : "hidden"
        }`}
      >
        <button
          className="absolute top-7 right-7 bi bi-x-circle text-4xl"
          onClick={handleCloseModifyEvent}
        ></button>
        <ModifyEventMenu />
      </div>

      <Header userName={userName} toggleMenu={toggleMenu} />

      <div
        className={`container-page px-8 flex max-2xl:px-3 ${
          isAnyModalVisible ? "justify-center" : menuVisible ? "justify-between" : "justify-center"
        } items-start w-full h-[100vh] max-2xl:justify-center max-2xl:h-[80vh]`}
      >
   
        <div

          className={`container-main-menu ${
            isAnyModalVisible || !menuVisible ? "hidden" : "flex"
          } items-start justify-center pt-20 w-[23%] transition-all duration-300 ease-in-out max-2xl:absolute max-2xl:w-[100%] max-2xl:bg-[#E0E0E0] max-2xl:h-[100vh] max-2xl:z-20`}
        >
          <div className="menu-container max-2xl:flex max-2xl:flex-col">
            <button className="menu-button" onClick={handleNewEvent}>
              New Event
            </button>
            <button className="menu-button" onClick={handleDeleteEvent}>
              Delete Event
            </button>
            <button className="menu-button" onClick={handleModifyEvent}>
              Modify Event
            </button>
          </div>
        </div>

        <div
          className={`container-calendar p-10 flex justify-center max-2xl:p-0 max-2xl:w-[100%] ${
            menuVisible && !isAnyModalVisible ? "w-[75%]" : "w-[90%]"
          } transition-all duration-300 ease-in-out`}
        >
          <div className="container-calendar pt-10 flex justify-center rounded-xl">
            <FullCalendar
              plugins={[dayGridPlugin]}
              initialView="dayGridMonth"
              events={data}
              height="auto"
            />
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Home;
