import { Link as RouterLink } from 'react-router-dom';
// material
import { alpha, styled } from '@mui/material/styles';
import { Box, Grid, Card, Typography, CardContent, Button, Stack } from '@mui/material';
// utils
import { fDate } from '../../../utils/formatTime';
// @types
import { CourseList } from '../../../@types/course';
// ----------------------------------------------------------------------

const CaptionStyle = styled(CardContent)(({ theme }) => ({
  bottom: 0,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  position: 'absolute',
  backdropFilter: 'blur(3px)',
  WebkitBackdropFilter: 'blur(3px)', // Fix on Mobile
  justifyContent: 'space-between',
  color: theme.palette.common.white,
  backgroundColor: alpha(theme.palette.grey[900], 0.72),
  borderBottomLeftRadius: theme.shape.borderRadiusMd,
  borderBottomRightRadius: theme.shape.borderRadiusMd
}));

const ImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute'
});

// ----------------------------------------------------------------------

type CourseListProps = {
  courseList: CourseList[];
};

export default function CourseListCard({ courseList }: CourseListProps) {
  return (
    <Box sx={{ mt: 5 }}>
      <Grid container spacing={3}>
        {courseList.map((course) => (
          <Grid key={course.id} item xs={12} sm={6} md={4}>
            <Card sx={{ pt: '100%', cursor: 'pointer' }}>
              <ImgStyle alt="Cover" src={course.cover} />

              <CaptionStyle>
                <Button sx={{ width: `100%` }} component={RouterLink} to={String(course.id)}>
                  <Stack
                    sx={{ width: `100%` }}
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    spacing={2}
                  >
                    <Typography variant="subtitle1">{course.title}</Typography>
                    <Typography variant="body2" sx={{ opacity: 0.72 }}>
                      {fDate(course.created_at)}
                    </Typography>
                  </Stack>
                </Button>
              </CaptionStyle>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
