import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// material
import { Box, Card, Divider, Container, Typography } from '@mui/material';
// routes
import { PATH_DASHBOARD, PATH_PAGE } from '../../routes/paths';
// components
import Page from '../../components/Page';
import Markdown from '../../components/Markdown';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { faqData } from '../../components/_dashboard/faq/FAQData';

type faqType = {
  title: string;
  description: string;
};

export default function FAQPost() {
  const [postData, setPostData] = useState<faqType>();
  const [error, setError] = useState(false);
  const { id = '' } = useParams();

  useEffect(() => {
    if (id !== '') {
      const index = faqData.findIndex((data) => data.id === id);
      if (index === -1) {
        setError(true);
      } else {
        setPostData(faqData[index]);
      }
    }
  }, [id]);

  return (
    <Page title="FAQ Post | CoopChick">
      <Container maxWidth={false}>
        <HeaderBreadcrumbs
          heading="FAQ Post"
          links={[
            { name: 'Beranda', href: PATH_PAGE.homepage },
            {
              name: 'FAQ',
              href: PATH_DASHBOARD.general.faq
            },
            { name: postData ? postData.title : 'FAQ Title' }
          ]}
        />
        {postData && (
          <Card>
            <Box sx={{ p: { xs: 3, md: 5 } }}>
              <Typography variant="h3" sx={{ mb: 4 }}>
                {postData.title}
              </Typography>
              <Divider sx={{ mb: 3 }} />
              <Markdown children={postData.description} />
            </Box>
          </Card>
        )}

        {error && <Typography variant="h6">404 Post not found</Typography>}
      </Container>
    </Page>
  );
}
