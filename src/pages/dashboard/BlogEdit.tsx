// material
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { BlogEditPostForm } from '../../components/_dashboard/blog';

// ----------------------------------------------------------------------

export default function BlogEdit() {
  return (
    <Page title="Edit Blog | CoopChick">
      <Container maxWidth={false}>
        <HeaderBreadcrumbs
          heading="Edit Blog"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            {
              name: 'Blogs',
              href: PATH_DASHBOARD.general.blogs
            },
            { name: 'Edit Blog' }
          ]}
        />

        <BlogEditPostForm />
      </Container>
    </Page>
  );
}
