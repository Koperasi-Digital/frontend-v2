import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { useEffect } from 'react';
// material
import { Button, Container } from '@mui/material';
// redux
import { RootState, useDispatch, useSelector } from '../../redux/store';
import { getEvents, openModal, closeModal } from '../../redux/slices/calendar';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import Page from '../../components/Page';
import { DialogAnimate } from '../../components/animate';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { CalendarForm, Calendar as CalendarComponent } from '../../components/_dashboard/calendar';

// ----------------------------------------------------------------------

const selectedEventSelector = (state: RootState) => {
  const { events, selectedEventId } = state.calendar;
  if (selectedEventId) {
    return events.find((_event) => _event.id === selectedEventId);
  }
  return null;
};

export default function Activities() {
  const dispatch = useDispatch();
  const selectedEvent = useSelector(selectedEventSelector);
  const { isOpenModal, selectedRange } = useSelector((state: RootState) => state.calendar);

  useEffect(() => {
    dispatch(getEvents());
  }, [dispatch]);

  const handleAddEvent = () => {
    dispatch(openModal());
  };

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  return (
    <Page title="Activities | CoopChick">
      <Container maxWidth={false}>
        <HeaderBreadcrumbs
          heading="Activities"
          links={[{ name: 'Dashboard', href: PATH_DASHBOARD.root }, { name: 'Activities' }]}
          action={
            <Button
              variant="contained"
              startIcon={<Icon icon={plusFill} width={20} height={20} />}
              onClick={handleAddEvent}
            >
              New Activity
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
