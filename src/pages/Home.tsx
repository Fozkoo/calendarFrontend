import { useState, useEffect } from 'react';
import servicesAPI from '../service/Helper';
import { Header } from '../components/Header';
import '../styles/Home.css';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';


function Home() {
  const [data, setData] = useState([]);
  const [menuVisible, setMenuVisible] = useState(true);


  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const userId = "aaaaaa44444";
        const events = await servicesAPI.getAllEventsByIdUser(userId);
        const formattedEvents = events.map((event: { eventTitle: any; eventDay: any; }) => ({
          title: event.eventTitle,
          date: event.eventDay,  // Se usa eventDay directamente, ya que parece estar en el formato correcto
        }));
        setData(formattedEvents);

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



      <div className={`container-page px-8 py-8 flex ${menuVisible ? 'justify-between' : 'justify-center'} items-center w-full h-[100vh]`}>
        <div className={`container-main-menu ${menuVisible ? 'flex' : 'hidden'} justify-center bg-slate-400 w-[23%] h-[100%] transition-all duration-300 ease-in-out`}>
          asdasd
        </div>

        <div className={`container-calendar   p-10   flex justify-center  ${menuVisible ? 'w-[75%]' : 'w-[90%]'} h-full transition-all duration-300 ease-in-out`}>

          <div className="container-ccalendar flex    rounded-xl">
          <FullCalendar
              plugins={[dayGridPlugin]}
              initialView="dayGridMonth"
              events={data}
              height="auto"
            />
          </div>

        </div>

      </div>
    </>
  );
}

export default Home;
