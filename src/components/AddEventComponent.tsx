import { useEffect, useState } from "react";
import methodsNotifications from "../service/Helper"; 
import { useAuth } from "../context/AuthContext";

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

  const { userId } = useAuth();

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

    if (!eventTitle || !eventTime || !eventDate || !urlAttachment || !notificationId) {
      setErrorMessage("Todos los campos son obligatorios.");
      return;
    }

    
    setErrorMessage("");

    const newEvent = {
      eventTitle,
      eventTime,
      eventDate,
      idUser: userId, 
      urlAttachment,
      notificationId,
    };

    try {
      const response = await methodsNotifications.createNewEvent(newEvent); 
      console.log("Event created successfully:", response);
      alert("¡Event created successfully!");
      window.location.reload();
      setEventTitle("");
      setEventTime("");
      setEventDate("");
      setUrlAttachment("");
      setNotificationId(null);
    } catch (error) {
      console.error("Error created event.", error);
      alert("Error created event.");
    }
  };


  
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
            <p className="text-white text-2xl max-2xl:text-xl">Hora</p>
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
            <p className="text-white text-2xl max-2xl:text-base">Desciption</p>
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
