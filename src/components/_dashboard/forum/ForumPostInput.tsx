import { useEffect, useRef, useState } from 'react';
import { Icon } from '@iconify/react';
import { useDispatch } from '../../../redux/store';
import { createForum } from '../../../redux/slices/forum';
import { useSnackbar } from 'notistack';
import roundAddPhotoAlternate from '@iconify/icons-ic/round-add-photo-alternate';
// material
import { Box, Card, Button, TextField, IconButton, Stack } from '@mui/material';
import useAuth from '../../../hooks/useAuth';
import { handleUploadFile } from 'utils/bucket';
import { fTimestamp } from 'utils/formatTime';

// ----------------------------------------------------------------------

export default function ForumPostInput() {
  const { user } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [topic, setTopic] = useState('');
  const [message, setMessage] = useState('');
  const [image, setImage] = useState<File>();
  const [preview, setPreview] = useState('');

  const handleAttach = () => {
    fileInputRef.current?.click();
  };

  useEffect(() => {
    if (image) {
      setPreview(URL.createObjectURL(image));
    }
  }, [image]);

  const postForum = async () => {
    try {
      let uploadFileMessage = '';
      if (image) {
        uploadFileMessage = await handleUploadFile(
          image,
          'forum',
          image?.name + fTimestamp(new Date())
        );
      }
      await dispatch(createForum(user?.id, topic, message, uploadFileMessage));
      enqueueSnackbar(`Forum berhasil dibuat`, { variant: 'success' });
      setTopic('');
      setMessage('');
      setImage(undefined);
      setPreview('');
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
        <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
          <Box sx={{ display: 'flex' }}>
            <IconButton size="small" onClick={handleAttach} sx={{ mr: 1 }}>
              <Icon icon={roundAddPhotoAlternate} width={24} height={24} />
            </IconButton>
          </Box>
          <Box
            component="img"
            alt="preview"
            src={preview}
            sx={{
              height: 100,
              borderRadius: 1,
              visibility: preview ? undefined : 'hidden'
            }}
          />
        </Stack>
        <Button onClick={() => handlePostForum()} variant="contained">
          Post
        </Button>
      </Box>

      <input
        ref={fileInputRef}
        onChange={(e) => setImage(e.currentTarget.files ? e.currentTarget.files[0] : undefined)}
        type="file"
        accept="image/png, image/jpeg"
        style={{ display: 'none' }}
      />
    </Card>
  );
}
