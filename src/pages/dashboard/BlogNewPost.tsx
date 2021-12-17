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
    <Page title="New Blog | CoopChick">
      <Container maxWidth={false}>
        <HeaderBreadcrumbs
          heading="Create a new blog"
          links={[{ name: 'Dashboard', href: PATH_DASHBOARD.root }, { name: 'New Blog' }]}
        />

        <BlogNewPostForm />
      </Container>
    </Page>
  );
}
