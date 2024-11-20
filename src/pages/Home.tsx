import { useState, useEffect } from 'react';
import servicesAPI from '../service/Helper';
import { Header } from '../components/Header';
import '../styles/Home.css';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import MainMenu from '../components/MainMenu';
import Footer from '../components/Footer';
import AddEventComponent from '../components/AddEventComponent';


function Home() {
  const [data, setData] = useState([]);
  const [menuVisible, setMenuVisible] = useState(true); 

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const userId = "tiziano10";
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
  }, []);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };



  return (
    <>
      <Header name="Tiziano" toggleMenu={toggleMenu} />

      <AddEventComponent/>


      <div className={`container-page hidden px-8 flex ${menuVisible ? 'justify-between' : 'justify-center'} items-start w-full h-[100vh]`}>
        <div className={`container-main-menu ${menuVisible ? 'flex' : 'hidden'} items-start justify-center pt-20 w-[23%] transition-all duration-300 ease-in-out`}>
          <MainMenu />
        </div>

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
