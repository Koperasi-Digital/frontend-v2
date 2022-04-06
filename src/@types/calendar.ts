import { EventInput as $EventInput } from '@fullcalendar/common';
import { User } from './account';

export type CalendarView = 'dayGridMonth' | 'timeGridWeek' | 'timeGridDay' | 'listWeek';

export enum ActivityType {
  COOPERATION = 'cooperation',
  FARM = 'farm'
}

export type EventInput = $EventInput & {
  description: string;
  type: ActivityType;
  includeNotification: boolean;
  meetingLink: string;
  createdBy: User;
  users: User[];
};

export type CalendarState = {
  isLoading: boolean;
  error: boolean;
  events: EventInput[];
  isOpenModal: boolean;
  selectedEventId: null | string;
  selectedRange: null | { start: Date; end: Date };
};

export type CalendarApiEvent = {
  id: number;
  name: string;
  description: string;
  startAt: string;
  endAt: string;
  allDay: boolean;
  includeNotification: boolean;
  meetingLink: string;
  type: ActivityType;
  createdBy: User;
  users: User[];
};
