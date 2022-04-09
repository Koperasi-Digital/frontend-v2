// material
import { Box, Chip, BoxProps } from '@mui/material';
// @types
import { BlogPost } from '../../../@types/blog';

// ----------------------------------------------------------------------

interface BlogPostTagsProps extends BoxProps {
  post: BlogPost;
}

export default function BlogPostTags({ post }: BlogPostTagsProps) {
  const { tags } = post;

  return (
    <Box sx={{ py: 3 }}>
      {tags ? tags.split(';/;').map((tag) => <Chip key={tag} label={tag} sx={{ m: 0.5 }} />) : null}
    </Box>
  );
}
