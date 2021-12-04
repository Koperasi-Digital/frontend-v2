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
    <Page title="Blog: New Post | Minimal-UI">
      <Container maxWidth={false}>
        <HeaderBreadcrumbs
          heading="Create a new post"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Blog', href: PATH_DASHBOARD.blog.root },
            { name: 'New Post' }
          ]}
        />

        <BlogNewPostForm />
      </Container>
    </Page>
  );
}
