import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import { useEffect, useState } from 'react';
import servicesAPI from '../service/Helper';
import { Header } from '../components/Header';
import '../styles/Home.css';

function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const userId = "tiziano10";
        const events = await servicesAPI.getAllEventsByIdUser(userId);
        const formattedEvents = events.map((event: { title: any; day: any; }) => ({
          title: event.title,
          date: event.day,
        }));
        setData(formattedEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);


  return (
    <>
      <Header />

      <div className="container-page px-8  py-8 flex justify-between items-center  w-full h-[100vh]">

        <div className="container-main-menu flex justify-center bg-slate-400 w-[23%] h-[100%]">
          asdasd
        </div>

        <div className="container-calendar flex bg-red-700 justify-center items-center  w-[75%] h-[100%]">
          asd
        </div>
      </div>

    </>
  );
}

export default Home;
