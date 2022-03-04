// material
import { Grid, Stack } from '@mui/material';
// @types
import { UserPost } from '../../../@types/user';
//
import ForumPostCard from './ForumPostCard';
import ForumPostInput from './ForumPostInput';

// ----------------------------------------------------------------------

type ForumProps = {
  posts: UserPost[];
};

export default function ForumPost({ posts }: ForumProps) {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={12}>
        <Stack spacing={3}>
          <ForumPostInput />
          {posts.map((post) => (
            <ForumPostCard key={post.id} post={post} />
          ))}
        </Stack>
      </Grid>
    </Grid>
  );
}
