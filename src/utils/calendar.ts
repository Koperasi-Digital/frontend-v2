import { CalendarApiEvent, EventInput } from '../@types/calendar';

export const EVENT_COLOR = {
  koperasi: '#00AB55', // theme.palette.primary.main,
  peternakan: '#FFC107' // theme.palette.warning.main,
};

export const toCalendarEvent: (events: CalendarApiEvent) => EventInput = (event) => ({
  id: event.id.toString(),
  title: event.name,
  description: event.description,
  allDay: event.allDay,
  start: new Date(event.startAt),
  end: new Date(event.endAt),
  type: event.type,
  includeNotification: event.includeNotification,
  createdBy: event.createdBy,
  users: event.users,
  textColor: EVENT_COLOR[event.type as unknown as keyof typeof EVENT_COLOR]
});
