import { Icon } from '@iconify/react';
import { useParams } from 'react-router-dom';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink } from 'react-router-dom';
import expandIcon from '@iconify/icons-eva/chevron-down-fill';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';
import editFill from '@iconify/icons-eva/edit-fill';
import chevronUpFill from '@iconify/icons-eva/chevron-up-fill';
import chevronDownFill from '@iconify/icons-eva/chevron-down-fill';
import { useTheme } from '@mui/material/styles';
import { useEffect, useState } from 'react';
// material
import {
  Container,
  Typography,
  Stack,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Switch,
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableContainer,
  IconButton,
  DialogTitle,
  DialogContent,
  TableHead
} from '@mui/material';
// redux
import { RootState, useDispatch, useSelector } from '../../redux/store';
import { getCourseById, setPublished, deleteCourseItem, setOrder } from '../../redux/slices/course';
import Label from 'components/Label';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import useAuth from 'hooks/useAuth';
import PermissionDenied from 'components/PermissionDenied';
import { CourseItem } from '../../@types/course';
import { DialogAnimate } from '../../components/animate';
import Scrollbar from '../../components/Scrollbar';
import { useSnackbar } from 'notistack';

const TABLE_HEAD = [
  { id: 'order', label: 'Urutan', alignRight: false },
  { id: 'title', label: 'Title', alignRight: false },
  { id: 'edit', label: 'Edit Materi', alignRight: false },
  { id: 'delete', label: 'Delete Materi', alignRight: false },
  { id: 'order-update', label: 'Ubah Urutan', alignRight: true }
];

export default function Course() {
  const dispatch = useDispatch();
  const { id = '' } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();
  const [isPublish, setIsPublish] = useState(false);
  const [courseItems, setCourseItems] = useState<CourseItem[]>([]);
  const { course, error, refresh } = useSelector((state: RootState) => state.course);
  const { currentRole } = useAuth();
  const [currentCourseItemId, setCurrentCourseItemId] = useState(0);
  const [isOpenModalDeleteCourse, setIsOpenModalDeleteCourse] = useState<boolean>(false);
  const isAdmin = currentRole?.name === 'ADMIN';

  useEffect(() => {
    if (parseInt(id) > 0) {
      dispatch(getCourseById(parseInt(id)));
    }
  }, [dispatch, id, refresh]);

  useEffect(() => {
    if (course) {
      setIsPublish(course.is_published);
      setCourseItems(course.course_items);
    }
  }, [course]);

  const onChangePublish = async (value: boolean) => {
    if (course) {
      try {
        await dispatch(setPublished(parseInt(course.id)));
        setIsPublish(value);
        enqueueSnackbar(`Publikasi Materi Course berhasil diubah`, {
          variant: 'success'
        });
      } catch (err) {
        console.error(err);
        enqueueSnackbar(`Gagal mengubah publikasi course, mohon dicoba lagi!`, {
          variant: 'error'
        });
      }
    }
  };

  const handleDeleteCourse = async () => {
    try {
      await dispatch(deleteCourseItem(currentCourseItemId));
      enqueueSnackbar(`Materi course berhasil dihapus`, { variant: 'success' });
      setIsOpenModalDeleteCourse(!isOpenModalDeleteCourse);
    } catch (err) {
      console.error(err);
      enqueueSnackbar(`Gagal menghapus Materi course, mohon dicoba lagi!`, { variant: 'error' });
    }
  };

  const handleUpdateOrder = async () => {
    try {
      const array = courseItems.map((item) => {
        return item.id;
      });
      const orderArray = array.join();
      await dispatch(setOrder(parseInt(id), orderArray));
      enqueueSnackbar(`Urutan Materi course berhasil diubah`, { variant: 'success' });
    } catch (err) {
      console.error(err);
      enqueueSnackbar(`Gagal mengubah urutan materi course, mohon dicoba lagi!`, {
        variant: 'error'
      });
    }
  };

  const onClickUp = (courseItemId: string) => {
    const index = courseItems.findIndex((course) => course.id === courseItemId);
    if (index > 0) {
      let newCourseItems = courseItems.map((x) => x);
      let temp = newCourseItems[index - 1];
      newCourseItems[index - 1] = newCourseItems[index];
      newCourseItems[index] = temp;
      setCourseItems(newCourseItems);
    }
  };

  const onClickDown = (courseItemId: string) => {
    const index = courseItems.findIndex((course) => course.id === courseItemId);
    if (index < courseItems.length - 1) {
      let newCourseItems = courseItems.map((x) => x);
      let temp = newCourseItems[index + 1];
      newCourseItems[index + 1] = newCourseItems[index];
      newCourseItems[index] = temp;
      setCourseItems(newCourseItems);
    }
  };

  const onClickOpenModal = (courseItemId: number) => {
    setIsOpenModalDeleteCourse(!isOpenModalDeleteCourse);
    setCurrentCourseItemId(courseItemId);
  };

  return (
    <Page title="Course Detail | CoopChick">
      <Container maxWidth={false}>
        <HeaderBreadcrumbs
          heading="Course Detail"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Course', href: PATH_DASHBOARD.general.course },
            { name: course ? course.title : 'Title' }
          ]}
          action={
            isAdmin ? (
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                alignItems="center"
                justifyContent="space-between"
                spacing={2}
              >
                <Stack direction="row" alignItems="center">
                  <Label
                    variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                    color={(!isPublish && 'error') || 'success'}
                  >
                    {isPublish ? 'Published' : 'Not Published'}
                  </Label>
                  <Switch
                    size="medium"
                    checked={isPublish}
                    onChange={(event) => onChangePublish(event.target.checked)}
                  />
                </Stack>
                <Button
                  variant="contained"
                  component={RouterLink}
                  to={`${PATH_DASHBOARD.general.courseManagement}/edit/${id}`}
                  startIcon={<Icon icon={editFill} />}
                >
                  Edit course
                </Button>
              </Stack>
            ) : null
          }
        />

        {error ? (
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Typography variant="h6">404 Post not found</Typography>
          </Box>
        ) : course && (course.is_published || isAdmin) ? (
          <>
            <Typography variant="h2" gutterBottom>
              {course.title}
            </Typography>
            <Stack sx={{ my: 3, flexDirection: { xs: 'column', md: 'row' } }}>
              <Box
                component="img"
                alt="cover"
                src={course.cover}
                sx={{
                  width: 300,
                  height: 250,
                  borderRadius: 1
                }}
              />
              <Typography
                variant="h6"
                sx={{ mx: { xs: 0, md: 2 }, my: { xs: 1, md: 0 } }}
                gutterBottom
              >
                {course.description}
              </Typography>
            </Stack>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              sx={{ my: 2 }}
              alignItems="center"
              justifyContent="space-between"
              spacing={2}
            >
              <Typography
                variant="h6"
                gutterBottom
              >{`Terdapat ${course.course_items.length} materi dalam course ini`}</Typography>
              {isAdmin && (
                <Button
                  variant="contained"
                  component={RouterLink}
                  to={`${PATH_DASHBOARD.general.courseManagement}/${id}/create-item`}
                  startIcon={<Icon icon={plusFill} />}
                >
                  Tambah materi
                </Button>
              )}
            </Stack>
            {isAdmin
              ? course.course_items.length > 0 && (
                  <Scrollbar>
                    <TableContainer sx={{ minWidth: 800 }}>
                      <Table>
                        <TableHead>
                          <TableRow>
                            {TABLE_HEAD.map((headCell) => (
                              <TableCell
                                key={headCell.id}
                                align={headCell.alignRight ? 'right' : 'left'}
                              >
                                {headCell.label}
                              </TableCell>
                            ))}
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {courseItems.map((row, index) => {
                            return (
                              <TableRow hover key={index + 'course_item'} tabIndex={-1}>
                                <TableCell align="left">{`${index + 1}.`}</TableCell>
                                <TableCell align="left">
                                  <Typography
                                    component={RouterLink}
                                    to={`${PATH_DASHBOARD.root}/course/${id}/page/${row.order}`}
                                    style={{ textDecoration: 'none', color: 'inherit' }}
                                  >
                                    {row.title}
                                  </Typography>
                                </TableCell>
                                <TableCell align="left">
                                  <IconButton
                                    component={RouterLink}
                                    to={`${PATH_DASHBOARD.general.courseManagement}/${id}/edit/${row.order}`}
                                  >
                                    <Icon icon={editFill} width={20} height={20} />
                                  </IconButton>
                                </TableCell>
                                <TableCell align="left">
                                  <IconButton onClick={() => onClickOpenModal(parseInt(row.id))}>
                                    <Icon icon={trash2Outline} width={20} height={20} />
                                  </IconButton>
                                </TableCell>

                                <TableCell align="right">
                                  <IconButton sx={{ mx: 1 }} onClick={() => onClickUp(row.id)}>
                                    <Icon icon={chevronUpFill} width={25} height={25} />
                                  </IconButton>
                                  <IconButton onClick={() => onClickDown(row.id)}>
                                    <Icon icon={chevronDownFill} width={25} height={25} />
                                  </IconButton>
                                </TableCell>
                              </TableRow>
                            );
                          })}
                        </TableBody>
                        <DialogAnimate
                          open={isOpenModalDeleteCourse}
                          onClose={() => setIsOpenModalDeleteCourse(!isOpenModalDeleteCourse)}
                        >
                          <DialogTitle sx={{ pb: 1 }}>Delete Materi ini ?</DialogTitle>
                          <DialogContent sx={{ overflowY: 'unset' }}>
                            <Typography align={'justify'}>
                              Materi course yang sudah dihapus akan hilang selamanya ! Apakah anda
                              tetap ingin menghapus materi ini ?
                            </Typography>
                            <Box
                              sx={{
                                display: 'flex',
                                justifyContent: 'space-around',
                                p: 1.5
                              }}
                            >
                              <Button variant="contained" onClick={handleDeleteCourse}>
                                Delete
                              </Button>
                              <Button
                                color="error"
                                variant="contained"
                                onClick={() => setIsOpenModalDeleteCourse(!isOpenModalDeleteCourse)}
                              >
                                Cancel
                              </Button>
                            </Box>
                          </DialogContent>
                        </DialogAnimate>
                      </Table>
                      <Stack sx={{ mt: 2 }} alignItems="flex-end" justifyContent="flex-end">
                        <Button
                          onClick={handleUpdateOrder}
                          variant="contained"
                          startIcon={<Icon icon={editFill} />}
                        >
                          Update Urutan
                        </Button>
                      </Stack>
                    </TableContainer>
                  </Scrollbar>
                )
              : course.course_items.map((item, id) => {
                  return (
                    <Accordion key={id}>
                      <AccordionSummary
                        expandIcon={<Icon icon={expandIcon} width={20} height={20} />}
                      >
                        <Typography variant="subtitle1">
                          {id + 1}. {item.title}
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Stack direction="row" alignItems="center" justifyContent="space-between">
                          <Typography style={{ textDecoration: 'none', color: 'inherit' }}>
                            {item.description}
                          </Typography>
                          <Button component={RouterLink} to={`page/${id + 1}`}>
                            See Course
                          </Button>
                        </Stack>
                      </AccordionDetails>
                    </Accordion>
                  );
                })}
          </>
        ) : (
          <PermissionDenied />
        )}
      </Container>
    </Page>
  );
}
