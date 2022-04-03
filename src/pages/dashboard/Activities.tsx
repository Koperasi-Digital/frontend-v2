import { useEffect } from 'react';
import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { useSearchParams } from 'react-router-dom';
// material
import { Button, Container } from '@mui/material';
// redux
import { RootState, useDispatch, useSelector } from '../../redux/store';
import { getEvents, openModal, closeModal, selectEvent } from '../../redux/slices/calendar';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import Page from '../../components/Page';
import { DialogAnimate } from '../../components/animate';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { CalendarForm, Calendar as CalendarComponent } from '../../components/_dashboard/calendar';

// ----------------------------------------------------------------------

export default function Activities() {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedEventSelector = (state: RootState) => {
    const { events, selectedEventId } = state.calendar;
    if (selectedEventId) {
      const selectedEvent = events.find((_event) => _event.id === selectedEventId);
      if (selectedEvent) {
        return selectedEvent;
      }
    }
    return null;
  };

  const selectedEvent = useSelector(selectedEventSelector);
  const { isOpenModal, selectedRange } = useSelector((state: RootState) => state.calendar);

  useEffect(() => {
    setSearchParams(selectedEvent && selectedEvent.id ? { id: selectedEvent.id } : {});
  }, [setSearchParams, selectedEvent]);

  useEffect(() => {
    const id = searchParams.get('id');
    if (id) {
      dispatch(selectEvent(id));
    }
  }, [searchParams, dispatch, isOpenModal]);

  useEffect(() => {
    dispatch(getEvents());
  }, [dispatch]);

  const handleAddEvent = () => {
    dispatch(openModal());
  };

  const handleCloseModal = () => {
    dispatch(closeModal());
    searchParams.delete('id');
  };

  return (
    <Page title="Aktivitas | CoopChick">
      <Container maxWidth={false}>
        <HeaderBreadcrumbs
          heading="Aktivitas"
          links={[{ name: 'Dashboard', href: PATH_DASHBOARD.root }, { name: 'Aktivitas' }]}
          action={
            <Button
              variant="contained"
              startIcon={<Icon icon={plusFill} width={20} height={20} />}
              onClick={handleAddEvent}
            >
              Buat Aktivitas
            </Button>
          }
        />

        <CalendarComponent />

        <DialogAnimate open={isOpenModal} onClose={handleCloseModal}>
          <CalendarForm
            event={selectedEvent || {}}
            range={selectedRange}
            onCancel={handleCloseModal}
          />
        </DialogAnimate>
      </Container>
    </Page>
  );
}
