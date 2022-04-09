import { Icon } from '@iconify/react';
import { useEffect, useState } from 'react';
import searchFill from '@iconify/icons-eva/search-fill';
// material
import { Box, Container, OutlinedInput, InputAdornment } from '@mui/material';
import { styled } from '@mui/material/styles';
import { getGallery } from '../../redux/slices/user';
// redux
import { RootState, useDispatch, useSelector } from '../../redux/store';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { CourseList } from '../../components/_dashboard/course';

const SearchStyle = styled(OutlinedInput)(({ theme }) => ({
  width: 240,
  transition: theme.transitions.create(['box-shadow', 'width'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter
  }),
  '&.Mui-focused': { width: 320, boxShadow: theme.customShadows.z8 },
  '& fieldset': {
    borderWidth: `1px !important`,
    borderColor: `${theme.palette.grey[500_32]} !important`
  }
}));

export default function Course() {
  const dispatch = useDispatch();
  const [filterCourse, setFilterCourse] = useState('');
  const { gallery } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    dispatch(getGallery());
  }, [dispatch]);

  return (
    <Page title="Course | CoopChick">
      <Container maxWidth={false}>
        <HeaderBreadcrumbs
          heading="Course"
          links={[{ name: 'Dashboard', href: PATH_DASHBOARD.root }, { name: 'Course' }]}
        />
        <SearchStyle
          value={filterCourse}
          onChange={(e) => setFilterCourse(e.target.value)}
          placeholder="Cari course..."
          startAdornment={
            <InputAdornment position="start">
              <Box component={Icon} icon={searchFill} sx={{ color: 'text.disabled' }} />
            </InputAdornment>
          }
          sx={{ mb: 1 }}
        />
        <CourseList gallery={gallery} />
      </Container>
    </Page>
  );
}
