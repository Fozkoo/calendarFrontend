import { useState, useEffect } from 'react';
import servicesAPI from '../service/Helper';
import { Header } from '../components/Header';
import '../styles/Home.css';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import "../styles/MainMenu.css";
import AddEventComponent from '../components/AddEventComponent';

function Home() {
  const [data, setData] = useState([]);
  const [menuVisible, setMenuVisible] = useState(true);
  const [addEventVisible, setAddEventVisible] = useState(false);
  const { userId } = useAuth();

  useEffect(() => {
    if (!userId) return;

    const fetchEvents = async () => {
      try {
        const events = await servicesAPI.getAllEventsByIdUser(userId);
        const formattedEvents = events.map((event: { eventTitle: any; eventDay: any; }) => ({
          title: event.eventTitle,
          date: event.eventDay,
        }));
        setData(formattedEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, [userId]);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const handleNewEvent = () => {
    console.log("New Event button clicked");
    setAddEventVisible(true);
  };

  const handleCloseAddEvent = () => {
    setAddEventVisible(false);
  };

  return (
    <>
      {/* Contenedor Add Event */}
      <div
        className={`container-addEvent flex flex-col justify-center items-center bg-[#EDEDED] w-full h-[100vh] absolute z-10 ${addEventVisible ? "flex" : "hidden"
          }`}
      >
        <button
          className="absolute top-7 right-7 bi bi-x-circle text-4xl"
          onClick={handleCloseAddEvent}
        ></button>
        <AddEventComponent />
      </div>


      <Header name={userId} toggleMenu={toggleMenu} />

      <div className={`container-page px-8 flex ${menuVisible ? 'justify-between' : 'justify-center'} items-start w-full h-[100vh]`}>
        {/* Main menu */}
        <div className={`container-main-menu ${menuVisible ? 'flex' : 'hidden'} items-start justify-center pt-20 w-[23%] transition-all duration-300 ease-in-out`}>
          <div className="menu-container">
            <button className="menu-button" onClick={handleNewEvent}>New Event</button>
            <button className="menu-button">Delete Event</button>
            <button className="menu-button">Change Event</button>
          </div>
        </div>

        {/* Calendario */}
        <div className={`container-calendar p-10 flex justify-center ${menuVisible ? 'w-[75%]' : 'w-[90%]'} transition-all duration-300 ease-in-out`}>
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
