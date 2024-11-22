import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import servicesAPI from "../service/Helper";



const ModifyEventMenu = () => {



    const { userId } = useAuth();
    const [data, setData] = useState<any[]>([]);

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

    return (
        <>
            <div className="container-addEventComponent flex justify-center items-center w-full h-[100vh]">
                <div className="container-form flex justify-center items-center bg-white rounded-xl w-[600px] h-[650px] shadow-lg">
                    <div className="container-content flex bg-[#EDEDED] w-full rounded-2xl m-10 p-10 flex-col justify-center items-center gap-10">
                        <div className="input w-[80%] h-14 flex items-center justify-center rounded-lg px-7">
                            <p className="text-white text-2xl">Modify Event</p>
                        </div>

                        <div className="input w-[80%] h-14 flex items-center justify-between rounded-lg px-7 bg-gray-800">
                            <p className="text-white text-xl">Select event</p>
                            <select name="events" id="events" className="w-40 h-10 border-none rounded-md px-2">
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
                                required
                            />
                        </div>

                        

                        <button
                            type="submit"
                            className="input text-2xl mt-[40%] w-[80%] h-10 text-white rounded-2xl"
                        >
                            Modify
                        </button>
                    </div>
                </div>
            </div>

        </>
    )
}

export default ModifyEventMenu