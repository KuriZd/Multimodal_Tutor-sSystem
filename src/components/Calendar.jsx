import { useState, useEffect, useMemo } from "react";
import { useCalendarApp, ScheduleXCalendar } from "@schedule-x/react";
import {
  createViewDay,
  createViewMonthAgenda,
  createViewMonthGrid,
  createViewWeek,
} from "@schedule-x/calendar";
import { createEventsServicePlugin } from "@schedule-x/events-service";
import { createEventModalPlugin } from "@schedule-x/event-modal";
import { createCurrentTimePlugin } from "@schedule-x/current-time";
import { createDragAndDropPlugin } from "@schedule-x/drag-and-drop"; // New plugin
import { fetchMockCitas } from "../Services/servicesApiCitas";

import "@schedule-x/theme-default/dist/index.css";

function CalendarApp() {
  // Memoize plugins to avoid unnecessary re-initializations
  const eventsService = useMemo(() => createEventsServicePlugin(), []);
  const eventModal = useMemo(() => createEventModalPlugin(), []);
  const currentTimePlugin = useMemo(
    () =>
      createCurrentTimePlugin({
        fullWeekWidth: true, // Timeline spans full week width
        timeZoneOffset: 120, // UTC+2 (adjust to your timezone)
      }),
    []
  );
  const dragAndDropPlugin = useMemo(
    () => createDragAndDropPlugin(30), // 30-minute drag intervals
    []
  );

  const calendar = useCalendarApp({
    views: [
      createViewDay(),
      createViewWeek(),
      createViewMonthGrid(),
      createViewMonthAgenda(),
    ],
    events: [
      {
        id: "1",
        title: "Event 1",
        start: "2025-04-21",
        end: "2025-04-21",
      },
      {
        id: "2",
        title: "Lunch Break",
        start: "2025-04-21 12:00",
        end: "2025-04-21 13:00",
      },
    ],
    plugins: [
      eventsService,
      eventModal,
      currentTimePlugin,
      dragAndDropPlugin, // Added drag and drop
    ],
  });

  useEffect(() => {
    const cargarEventos = async () => {
      try {
        const citas = await fetchMockCitas();
        citas.forEach((evento) => {
          eventsService.add(evento);
        });
      } catch (error) {
        console.error("Error al cargar citas mock:", error);
      }
    };

    cargarEventos();
  }, [eventsService]);

  return (
    <div style={{ height: "800px" }}>
      {" "}
      {/* Give the calendar a fixed height */}
      <ScheduleXCalendar calendarApp={calendar} />
    </div>
  );
}

export default CalendarApp;
