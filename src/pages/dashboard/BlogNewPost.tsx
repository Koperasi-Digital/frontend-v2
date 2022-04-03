// material
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { BlogNewPostForm } from '../../components/_dashboard/blog';

// ----------------------------------------------------------------------

export default function BlogNewPost() {
  return (
    <Page title="Buat Blog | CoopChick">
      <Container maxWidth={false}>
        <HeaderBreadcrumbs
          heading="Buat blog baru"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            {
              name: 'Blogs',
              href: PATH_DASHBOARD.general.blogs
            },
            { name: 'Blog Baru' }
          ]}
        />

        <BlogNewPostForm />
      </Container>
    </Page>
  );
}
