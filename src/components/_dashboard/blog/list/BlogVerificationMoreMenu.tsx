import { Icon } from '@iconify/react';
// import { paramCase } from 'change-case';
import { useRef, useState } from 'react';
import editFill from '@iconify/icons-eva/edit-fill';
import { Link as RouterLink } from 'react-router-dom';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';
import checkmarkFill from '@iconify/icons-eva/checkmark-circle-2-fill';
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
// material
import {
  Menu,
  MenuItem,
  IconButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
  Button,
  DialogTitle,
  DialogContent
} from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
import { DialogAnimate } from '../../../../components/animate';

// ----------------------------------------------------------------------

type BlogVerificationMenuProps = {
  onDelete: VoidFunction;
  onVerify: VoidFunction;
  id: number;
};

export default function BlogVerificationMoreMenu({
  onDelete,
  onVerify,
  id
}: BlogVerificationMenuProps) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenModalDeleteBlog, setIsOpenModalDeleteBlog] = useState<boolean>(false);
  const [isOpenModalVerifyBlog, setIsOpenModalVerifyBlog] = useState<boolean>(false);

  const onClickDelete = () => {
    onDelete();
    setIsOpenModalDeleteBlog(!isOpenModalDeleteBlog);
  };

  const onClickVerify = () => {
    onVerify();
    setIsOpenModalVerifyBlog(!isOpenModalVerifyBlog);
  };

  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Icon icon={moreVerticalFill} width={20} height={20} />
      </IconButton>
      <DialogAnimate
        open={isOpenModalDeleteBlog}
        onClose={() => setIsOpenModalDeleteBlog(!isOpenModalDeleteBlog)}
      >
        <DialogTitle sx={{ pb: 1 }}>Delete Blog ?</DialogTitle>
        <DialogContent sx={{ overflowY: 'unset' }}>
          <Typography align={'justify'}>
            Blog yang sudah dihapus akan hilang selamanya ! Apakah anda tetap ingin menghapus Blog ?
          </Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-around',
              p: 1.5
            }}
          >
            <Button variant="contained" onClick={onClickDelete}>
              Delete
            </Button>
            <Button
              color="error"
              variant="contained"
              onClick={() => setIsOpenModalDeleteBlog(!isOpenModalDeleteBlog)}
            >
              Cancel
            </Button>
          </Box>
        </DialogContent>
      </DialogAnimate>
      <DialogAnimate
        open={isOpenModalVerifyBlog}
        onClose={() => setIsOpenModalVerifyBlog(!isOpenModalVerifyBlog)}
      >
        <DialogTitle sx={{ pb: 1 }}>Verify Blog ?</DialogTitle>
        <DialogContent sx={{ overflowY: 'unset' }}>
          <Typography align={'justify'}>
            Klik Verify untuk melakukan verifikasi pada blog, jika Blog sudah verified maka akan
            diubah ke tidak verified
          </Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-around',
              p: 1.5
            }}
          >
            <Button variant="contained" onClick={onClickVerify}>
              Verify
            </Button>
            <Button
              color="error"
              variant="contained"
              onClick={() => setIsOpenModalVerifyBlog(!isOpenModalVerifyBlog)}
            >
              Cancel
            </Button>
          </Box>
        </DialogContent>
      </DialogAnimate>
      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' }
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem
          onClick={() => setIsOpenModalDeleteBlog(!isOpenModalDeleteBlog)}
          sx={{ color: 'text.secondary' }}
        >
          <ListItemIcon>
            <Icon icon={trash2Outline} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Delete" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>

        <MenuItem
          component={RouterLink}
          to={`${PATH_DASHBOARD.root}/blogs/edit/${id}`}
          sx={{ color: 'text.secondary' }}
        >
          <ListItemIcon>
            <Icon icon={editFill} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Edit" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>

        <MenuItem
          onClick={() => setIsOpenModalVerifyBlog(!isOpenModalVerifyBlog)}
          sx={{ color: 'text.secondary' }}
        >
          <ListItemIcon>
            <Icon icon={checkmarkFill} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Verify" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
      </Menu>
    </>
  );
}
