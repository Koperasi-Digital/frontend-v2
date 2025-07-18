// material
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD, PATH_PAGE } from '../../routes/paths';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { CourseNewPostForm } from '../../components/_dashboard/course';

// ----------------------------------------------------------------------

export default function CourseNewPost() {
  return (
    <Page title="Buat Course | CoopChick">
      <Container maxWidth={false}>
        <HeaderBreadcrumbs
          heading="Buat course baru"
          links={[
            { name: 'Beranda', href: PATH_PAGE.homepage },
            {
              name: 'Course',
              href: PATH_DASHBOARD.general.course
            },
            { name: 'Course baru' }
          ]}
        />

        <CourseNewPostForm />
      </Container>
    </Page>
  );
}
