import servicesAPI from "../service/Helper";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const DeleteEventMenu = () => {
  const { token, userId, logout } = useAuth(); 
  const [data, setData] = useState<any[]>([]);
  const [selectedEventId, setSelectedEventId] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        
        const events = await servicesAPI.getAllEventsByIdUser(userId);
        const sortedEvents = events.sort((a: any, b: any) => b.eventId - a.eventId);
        setData(sortedEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
        setErrorMessage("Error al obtener los eventos.");
      }
    };

    fetchEvents();
  }, [userId, token]); 

  const handleDelete = async () => {
    if (selectedEventId === null) {
      alert("Please select an event to delete");
      return;
    }

    try {
      
      console.log("Verifying token:", token);
      const systemId = "4";
      if (!token) {
        throw new Error("No se encontró el token de sesión.");
      }

      const isAuthorized = await servicesAPI.authorized(token as string, systemId);
      console.log("Authorization status:", isAuthorized);
      console.log("User ID:", userId);
      console.log("Token:", token);
      if (!isAuthorized) {
        Swal.fire({
          title: 'Error!',
          text: 'User not authorized.',
          icon: 'error',
          confirmButtonText: 'Logout'
        }).then(() => {
          logout();
        });
        setErrorMessage("No estás autorizado para eliminar eventos.");
        return;
      }

      


      const result = await servicesAPI.deleteEvents(selectedEventId); 
      if (result) {
          setData(prevData => prevData.filter(event => event.eventId !== selectedEventId));
      }
    } catch (error) {
      console.error("Error deleting event:", error);
      alert("There was an error deleting the event.");
    }
  };

  return (
    <div className="container-addEventComponent flex justify-center items-center w-full h-[100vh]">
      <div className="container-form flex items-center justify-center bg-white rounded-xl w-[600px] h-[650px] shadow-lg max-2xl:h-[500px] max-2xl:w-[90%]">
        <div className="container-content flex bg-[#EDEDED] w-full rounded-2xl m-10 p-10 flex-col justify-center items-center gap-10 max-2xl:m-3">
          <div className="input w-[80%] h-14 flex items-center justify-center rounded-lg px-7 max-2xl:px-4 max-2xl:w-[100%]">
            <p className="text-white text-2xl">Delete Event</p>
          </div>

          <div className="input w-[80%] h-14 flex items-center justify-between rounded-lg px-7 bg-gray-800 max-2xl:px-4 max-2xl:w-[100%]">
            <p className="text-white text-xl max-2xl:text-sm">Select event</p>
            <select
              name="events"
              id="events"
              className="w-40 h-10 border-none rounded-md px-2 max-2xl:w-32"
              onChange={(e) => setSelectedEventId(Number(e.target.value))}
            >
              <option value="">Select an event</option>
              {data.map((event) => (
                <option key={event.eventId} value={event.eventId}>
                  {event.eventTitle}
                </option>
              ))}
            </select>
          </div>

          <button
            type="button"
            onClick={handleDelete}
            className="input text-2xl mt-[40%] w-[80%] h-10 text-white rounded-2xl"
          >
            Delete
          </button>

          {errorMessage && (
            <div className="text-red-500 mt-2">{errorMessage}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeleteEventMenu;
