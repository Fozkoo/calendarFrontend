import { useEffect, useState } from "react";
import servicesAPI from "./Helper";
import { useAuth } from "../context/AuthContext";
import fs from "fs";

interface Event {
  eventId: number;
  eventTitle: string;
  eventTime: string;
  eventDay: string;
  eventUser: string;
  attachments: { id: number; url: string }[];
  notifications: { id: number; type: string }[];
}

const NotificationHandler = () => {
  const [data, setData] = useState<Event[]>([]);
  const { userId, token } = useAuth();

  useEffect(() => {
    if (!userId) return;

    const fetchEvents = async () => {
      try {
        const events = await servicesAPI.getAllEventsByIdUser(userId);
        setData(events);
        console.log("Events fetched:", events);

        scheduleNotifications(events);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, [userId]);

  const scheduleNotifications = (events: Event[]) => {
    events.forEach((event) => {
      event.notifications.forEach((notification) => {
        const notificationTime = calculateNotificationTime(event.eventDay, event.eventTime, notification.type);
        if (!notificationTime) return;

        const delay = notificationTime.getTime() - new Date().getTime();
        if (delay > 0) {
          setTimeout(() => sendNotification(event, notification.type), delay);
        }
      });
    });
  };

  const calculateNotificationTime = (eventDay: string, eventTime: string, type: string): Date | null => {
    const eventDate = new Date(`${eventDay}T${eventTime}`);
    switch (type) {
      case "1 hora antes":
        return new Date(eventDate.getTime() - 60 * 60 * 1000);
      case "40 minutos antes":
        return new Date(eventDate.getTime() - 40 * 60 * 1000);
      case "5 minutos antes":
        return new Date(eventDate.getTime() - 1 * 60 * 1000);
      case "1 minuto antes":
        return new Date(eventDate.getTime() - 1 * 60 * 1000);
      default:
        return null;
    }
  };

  const sendNotification = async (event: Event, type: string) => {
    const payload = {
      token: "X",
      systemId: "4",
      from: "grupo4@gugle.com",
      to: ["grupo4@gugle.com"],
      subject: `Notificación: ${event.eventTitle}`,
      body: `Este es un recordatorio para el evento: ${event.eventTitle}, programado para ${event.eventDay} a las ${event.eventTime}. Tipo de notificación: ${type}.`,
      attachments: event.attachments.map((attachment) => ({
        filename: `attachment-${attachment.id}`,
        url: attachment.url,
      })),
    };

    try {
      await servicesAPI.sendNotifications(payload);
      const successMessage = `Notificación enviada para el evento ${event.eventId} (${type}).`;
      console.log(successMessage);

      // Si quieres guardar en un archivo:
      fs.appendFileSync("notifications.log", `${successMessage}\n`);
    } catch (error) {
      const errorMessage = `Error enviando notificación para el evento ${event.eventId} (${type}): ${error}`;
      console.error(errorMessage);

      // Si quieres guardar en un archivo:
      fs.appendFileSync("notifications.log", `${errorMessage}\n`);
    }
  };
};

export default NotificationHandler;
