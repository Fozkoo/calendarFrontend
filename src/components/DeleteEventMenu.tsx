import servicesAPI from "../service/Helper";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";

const DeleteEventMenu = () => {
  const { userId } = useAuth();
  const [data, setData] = useState<any[]>([]);
  const [selectedEventId, setSelectedEventId] = useState<number | null>(null);
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const events = await servicesAPI.getAllEventsByIdUser(userId);
        const sortedEvents = events.sort((a: any, b: any) => b.eventId - a.eventId);
        setData(sortedEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, [userId]);

  const handleDelete = async () => {
    if (selectedEventId === null) {
      alert("Please select an event to delete");
      return;
    }

    try {
      const result = await servicesAPI.deleteEvents(selectedEventId); 
      if (result) {
        alert("Event deleted successfully");
        setData(prevData => prevData.filter(event => event.eventId !== selectedEventId));
        window.location.reload();
      } else {
        alert("Failed to delete event.");
      }
    } catch (error) {
      console.error("Error deleting event:", error);
      alert("There was an error deleting the event.");
    }
  };

  return (
    <div className="container-addEventComponent flex justify-center items-center w-full h-[100vh]">
      <div className="container-form flex items-center justify-center bg-white rounded-xl w-[600px] h-[650px] shadow-lg">
        <div className="container-content flex bg-[#EDEDED] w-full rounded-2xl m-10 p-10 flex-col justify-center items-center gap-10">
          <div className="input w-[80%] h-14 flex items-center justify-center rounded-lg px-7">
            <p className="text-white text-2xl">Delete Event</p>
          </div>

          <div className="input w-[80%] h-14 flex items-center justify-between rounded-lg px-7 bg-gray-800">
            <p className="text-white text-xl">Select event</p>
            <select
              name="events"
              id="events"
              className="w-40 h-10 border-none rounded-md px-2"
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
        </div>
      </div>
    </div>
  );
};

export default DeleteEventMenu;
