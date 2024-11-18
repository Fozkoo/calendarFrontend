import { useState, useEffect } from 'react';
import servicesAPI from '../service/Helper';
import { Header } from '../components/Header';
import '../styles/Home.css';


function Home() {
  const [data, setData] = useState([]);
  const [menuVisible, setMenuVisible] = useState(true); 


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

  
  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };



  return (
    <>
      <Header name="Tiziano" toggleMenu={toggleMenu}  /> 

      

      <div className={`container-page px-8 py-8 flex ${menuVisible ? 'justify-between' : 'justify-center'} items-center w-full h-[100vh]`}>
        <div className={`container-main-menu ${menuVisible ? 'flex' : 'hidden'} justify-center bg-slate-400 w-[23%] h-[100%] transition-all duration-300 ease-in-out`}>
          asdasd
        </div>

        <div className={`container-calendar flex bg-red-700 justify-center items-center ${menuVisible ? 'w-[75%]' : 'w-[90%]'} h-[100%] transition-all duration-300 ease-in-out`}>
          asd
        </div>
      </div>
    </>
  );
}

export default Home;
