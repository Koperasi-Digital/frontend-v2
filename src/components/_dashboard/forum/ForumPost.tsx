// material
import { Grid, Stack } from '@mui/material';
// @types
import { ForumPostType } from '../../../@types/forum';
//
import ForumPostCard from './ForumPostCard';
import ForumPostInput from './ForumPostInput';

// ----------------------------------------------------------------------

type ForumProps = {
  posts: ForumPostType[];
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
