import { useEffect, useState } from "react";
import methodsNotifications from "../service/Helper";
import { useAuth } from "../context/AuthContext";
import Swal from 'sweetalert2';
import servicesAPI from "../service/Helper";

import SendAttachmentHelper from "../service/SendAttachmentHelper";


interface Notification {
  id: number;
  type: string;
}

function AddEventComponent() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [eventTitle, setEventTitle] = useState<string>("");
  const [eventTime, setEventTime] = useState<string>("");
  const [eventDate, setEventDate] = useState<string>("");
  const [urlAttachment, setUrlAttachment] = useState<File | null>(null);
  const [notificationId, setNotificationId] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { userId, token, logout } = useAuth();
  const [fileName, setFileName] = useState("");


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



  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMessage(""); 

    if (!eventTitle || !eventTime || !eventDate || !urlAttachment || !notificationId) {
      setErrorMessage("Todos los campos son obligatorios.");
      return;
    }

    try {

      const fileURL = await SendAttachmentHelper.uploadFileToExternalSystem(urlAttachment as File, userId as string, token as string);


      const newEvent = {
        eventTitle,
        eventTime,
        eventDate,
        idUser: userId,
        urlAttachment: fileURL, 
        notificationId
      };

      const response = await servicesAPI.createNewEvent(newEvent);
    } catch (error: any) {
      console.error("Error creating event:", error);
      setErrorMessage("Error al crear el evento. Inténtalo nuevamente.");
    }
  }


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFileName(file.name); 
      setUrlAttachment(file);
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

          <div className="input w-[80%] h-14 flex items-center justify-between rounded-lg px-7 bg-gray-800 max-2xl:w-[75%] max-2xl:px-4">
            <p className="text-white text-2xl max-2xl:text-base">Attachment</p>
            <label
              htmlFor="file-upload"
              className="cursor-pointer text-white text-xl bg-black hover:bg-gray-800 rounded-md px-4 py-2"
            >
              {fileName ? "File Uploaded" : "Choose File"}
            </label>
            <input
              id="file-upload"
              type="file"
              onChange={handleFileChange}
              className="hidden"
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
