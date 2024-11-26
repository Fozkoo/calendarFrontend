import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import servicesAPI from "../service/Helper";

interface Notification {
    id: number;
    type: string;
}

const ModifyEventMenu = () => {
    const { userId } = useAuth();
    const [data, setData] = useState<any[]>([]);
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [notificationId, setNotificationId] = useState<number | string>("");

    const [eventTitle, setEventTitle] = useState<string>("");
    const [eventTime, setEventTime] = useState<string>("");
    const [eventDate, setEventDate] = useState<string>("");
    const [eventDescription, setEventDescription] = useState<string>("");

    const [selectedEventId, setSelectedEventId] = useState<string | number>("");

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

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const data: Notification[] = await servicesAPI.getAllNotifications();
                setNotifications(data);
            } catch (error) {
                console.error("Error fetching notifications:", error);
            }
        };

        fetchNotifications();
    }, []);


    const handleModifyEvent = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

      
        if (!selectedEventId) {
            console.error("No event selected");
            alert("Please select an event!");
            return;
        }

      
        const formData = {
            title: eventTitle,
            hora: eventTime,
            day: eventDate,
            notificationId: notificationId,
            newUrl: eventDescription, 
        };

        const filteredFormData = Object.fromEntries(
            Object.entries(formData).filter(([_, value]) => value !== "" && value !== null && value !== undefined)
        );

        try {
            const response = await servicesAPI.modifyEvent(String(selectedEventId), filteredFormData);
            console.log("Evento modificado:", response);
            window.location.reload();
        } catch (error) {
            console.error("Error modificando evento:", error);
        }
    };


    return (
        <div className="container-addEventComponent flex justify-center items-center w-full h-[100vh]">
            <div className="container-form flex justify-center items-center bg-white rounded-xl w-[600px] h-[650px] shadow-lg">
                <div className="container-content flex bg-[#EDEDED] w-full rounded-2xl m-10 p-5 flex-col justify-center items-center gap-3">
                    <div className="input w-[80%] h-14 flex items-center justify-center rounded-lg px-7">
                        <p className="text-white text-2xl">Modify Event</p>
                    </div>

                    <div className="input w-[80%] h-14 flex items-center justify-between rounded-lg px-7 bg-gray-800">
                        <p className="text-white text-xl">Select event</p>
                        <select
                            name="events"
                            id="events"
                            className="w-40 h-10 border-none rounded-md px-2"
                            value={selectedEventId}
                            onChange={(e) => setSelectedEventId(e.target.value)} 
                        >
                            <option value="">Select an event</option>
                            {data.map((event) => (
                                <option key={event.eventId} value={event.eventId}>
                                    {event.eventTitle}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="input w-[80%] h-14 flex items-center justify-between rounded-lg px-7 bg-gray-800">
                        <p className="text-white text-2xl">Hora</p>
                        <input
                            type="time"
                            className="w-40 h-10 border-none rounded-md px-2"
                            value={eventTime}
                            onChange={(e) => setEventTime(e.target.value)}
                        />
                    </div>

                    <div className="input w-[80%] h-14 flex items-center justify-between rounded-lg px-7 bg-gray-800">
                        <p className="text-white text-2xl">Date</p>
                        <input
                            type="date"
                            className="w-40 h-10 border-none rounded-md px-2"
                            value={eventDate}
                            onChange={(e) => setEventDate(e.target.value)}
                        />
                    </div>

                    <div className="input w-[80%] h-14 flex items-center justify-between rounded-lg px-7 bg-gray-800">
                        <p className="text-white text-2xl">Name Event</p>
                        <input
                            type="text"
                            className="w-40 h-10 border-none rounded-md px-2"
                            value={eventTitle}
                            onChange={(e) => setEventTitle(e.target.value)}
                        />
                    </div>

                    <div className="input w-[80%] h-14 flex items-center justify-between rounded-lg px-7 bg-gray-800">
                        <p className="text-white text-2xl">Description</p>
                        <input
                            type="text"
                            className="w-40 h-10 border-none rounded-md px-2"
                            value={eventDescription}
                            onChange={(e) => setEventDescription(e.target.value)}
                        />
                    </div>

                    <div className="input w-[80%] h-14 flex items-center justify-between rounded-lg px-7 bg-gray-800">
                        <p className="text-white text-2xl">Notification</p>
                        <select
                            value={notificationId || ""}
                            onChange={(e) => setNotificationId(Number(e.target.value))}
                            className="w-40 h-10 border-none rounded-md px-2"
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
                        type="button"
                        className="input text-2xl mt-[5%] w-[80%] h-10 text-white rounded-2xl"
                        onClick={handleModifyEvent}
                    >
                        Modify
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModifyEventMenu;
