import FullCalendar, { DateSelectArg, EventClickArg, EventDropArg } from '@fullcalendar/react'; // => request placed at the top
import listPlugin from '@fullcalendar/list';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import timelinePlugin from '@fullcalendar/timeline';
import interactionPlugin, { EventResizeDoneArg } from '@fullcalendar/interaction';
import { useSnackbar } from 'notistack';
import { useState, useRef, useEffect } from 'react';
// material
import { useTheme } from '@mui/material/styles';
import { Card, useMediaQuery } from '@mui/material';
// redux
import { RootState, useDispatch, useSelector } from 'redux/store';
import { getEvents, updateEvent, selectEvent, selectRange } from 'redux/slices/calendar';
// @types
import { CalendarView } from '../../../../src/@types/calendar';
import { CalendarStyle, CalendarToolbar } from '.';

// ----------------------------------------------------------------------

type CalendarProps = {
  injectedView?: 'dayGridMonth' | 'timeGridWeek' | 'timeGridDay' | 'listWeek';
  injectedHeight?: number;
  withToolbar?: boolean;
};

export default function Calendar({
  injectedView,
  injectedHeight,
  withToolbar = true
}: CalendarProps) {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const calendarRef = useRef<FullCalendar>(null);
  const { enqueueSnackbar } = useSnackbar();
  const [date, setDate] = useState(new Date());
  const [view, setView] = useState<CalendarView>(
    injectedView || (isMobile ? 'listWeek' : 'dayGridMonth')
  );
  const { events } = useSelector((state: RootState) => state.calendar);

  useEffect(() => {
    dispatch(getEvents());
  }, [dispatch]);

  useEffect(() => {
    if (!injectedView) {
      const calendarEl = calendarRef.current;
      if (calendarEl) {
        const calendarApi = calendarEl.getApi();
        const newView = isMobile ? 'listWeek' : 'dayGridMonth';
        calendarApi.changeView(newView);
        setView(newView);
      }
    }
  }, [isMobile, injectedView]);

  const handleClickToday = () => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      calendarApi.today();
      setDate(calendarApi.getDate());
    }
  };

  const handleChangeView = (newView: CalendarView) => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      calendarApi.changeView(newView);
      setView(newView);
    }
  };

  const handleClickDatePrev = () => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      calendarApi.prev();
      setDate(calendarApi.getDate());
    }
  };

  const handleClickDateNext = () => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      calendarApi.next();
      setDate(calendarApi.getDate());
    }
  };

  const handleSelectRange = (arg: DateSelectArg) => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      calendarApi.unselect();
    }
    dispatch(selectRange(arg.start, arg.end));
  };

  const handleSelectEvent = (arg: EventClickArg) => {
    dispatch(selectEvent(arg.event.id));
  };

  const handleResizeEvent = async ({ event }: EventResizeDoneArg) => {
    try {
      dispatch(
        updateEvent(event.id, {
          allDay: event.allDay,
          start: event.start,
          end: event.end
        })
      );
      enqueueSnackbar('Update event success', { variant: 'success' });
    } catch (error) {
      console.error(error);
    }
  };

  const handleDropEvent = async ({ event }: EventDropArg) => {
    try {
      dispatch(
        updateEvent(event.id, {
          allDay: event.allDay,
          start: event.start,
          end: event.end
        })
      );
      enqueueSnackbar('Update event success', {
        variant: 'success'
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card>
      <CalendarStyle>
        {withToolbar && (
          <CalendarToolbar
            date={date}
            view={view}
            onNextDate={handleClickDateNext}
            onPrevDate={handleClickDatePrev}
            onToday={handleClickToday}
            onChangeView={handleChangeView}
          />
        )}
        <FullCalendar
          weekends
          editable
          droppable
          selectable
          events={events}
          ref={calendarRef}
          rerenderDelay={10}
          initialDate={date}
          initialView={view}
          dayMaxEventRows={3}
          eventDisplay="block"
          headerToolbar={false}
          allDayMaintainDuration
          eventResizableFromStart
          select={handleSelectRange}
          eventDrop={handleDropEvent}
          eventClick={handleSelectEvent}
          eventResize={handleResizeEvent}
          height={injectedHeight || (isMobile ? 'auto' : 720)}
          plugins={[listPlugin, dayGridPlugin, timelinePlugin, timeGridPlugin, interactionPlugin]}
        />
      </CalendarStyle>
    </Card>
  );
}
