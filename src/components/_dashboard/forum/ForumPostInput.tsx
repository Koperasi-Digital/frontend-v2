import { useRef, useState } from 'react';
import { Icon } from '@iconify/react';
import { useDispatch } from '../../../redux/store';
import { createForum } from '../../../redux/slices/forum';
import { useSnackbar } from 'notistack';
import roundAddPhotoAlternate from '@iconify/icons-ic/round-add-photo-alternate';
// material
import { Box, Card, Button, TextField, IconButton } from '@mui/material';
import useAuth from '../../../hooks/useAuth';

// ----------------------------------------------------------------------

export default function ForumPostInput() {
  const { user } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [topic, setTopic] = useState('');
  const [message, setMessage] = useState('');

  const handleAttach = () => {
    fileInputRef.current?.click();
  };

  const postForum = async () => {
    try {
      await dispatch(createForum(user?.id, topic, message));
      enqueueSnackbar(`Forum berhasil dibuat`, { variant: 'success' });
      setTopic('');
      setMessage('');
    } catch (err) {
      console.error(err);
      enqueueSnackbar(`Gagal membuat forum, mohon dicoba lagi!`, { variant: 'error' });
    }
  };

  const handlePostForum = () => {
    if (message === '' || topic === '') {
      enqueueSnackbar(`Perlu mengisi topik dan isi forum`, { variant: 'error' });
    } else {
      postForum();
    }
  };

  return (
    <Card sx={{ p: 3 }}>
      <TextField
        fullWidth
        rows={1}
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        placeholder="Tulis topik di sini..."
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
        placeholder="Tulis apa yang ingin dibagikan di sini..."
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
        <Button onClick={() => handlePostForum()} variant="contained">
          Post
        </Button>
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
