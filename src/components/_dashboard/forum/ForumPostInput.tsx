import { useRef, useState } from 'react';
import { Icon } from '@iconify/react';
import roundAddPhotoAlternate from '@iconify/icons-ic/round-add-photo-alternate';
// material
import { Box, Card, Button, TextField, IconButton } from '@mui/material';
// import useAuth from '../../../hooks/useAuth';

// ----------------------------------------------------------------------

export default function ForumPostInput() {
  // const { user } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [topic, setTopic] = useState('');
  const [message, setMessage] = useState('');

  const handleAttach = () => {
    fileInputRef.current?.click();
  };

  return (
    <Card sx={{ p: 3 }}>
      <TextField
        fullWidth
        rows={1}
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        placeholder="Input your topic here..."
        sx={{
          '& fieldset': {
            borderWidth: `1px !important`,
            borderColor: (theme) => `${theme.palette.grey[500_32]} !important`
          }
        }}
      />
      <TextField
        multiline
        fullWidth
        rows={4}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Share what you are thinking here..."
        sx={{
          mt: 2,
          '& fieldset': {
            borderWidth: `1px !important`,
            borderColor: (theme) => `${theme.palette.grey[500_32]} !important`
          }
        }}
      />

      <Box
        sx={{
          mt: 3,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <Box sx={{ display: 'flex' }}>
          <IconButton size="small" onClick={handleAttach} sx={{ mr: 1 }}>
            <Icon icon={roundAddPhotoAlternate} width={24} height={24} />
          </IconButton>
        </Box>
        <Button variant="contained">Post</Button>
      </Box>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/png, image/jpeg"
        style={{ display: 'none' }}
      />
    </Card>
  );
}
