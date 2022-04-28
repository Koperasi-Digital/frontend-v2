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
import { DialogAnimate } from '../../../animate';

// ----------------------------------------------------------------------

type CourseAdminMenuProps = {
  onDelete: VoidFunction;
  onPublish: VoidFunction;
  id: number;
};

export default function CourseAdminMoreMenu({ onDelete, onPublish, id }: CourseAdminMenuProps) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenModalDeleteCourse, setIsOpenModalDeleteCourse] = useState<boolean>(false);
  const [isOpenModalPublishCourse, setIsOpenModalPublishCourse] = useState<boolean>(false);

  const onClickDelete = () => {
    onDelete();
    setIsOpenModalDeleteCourse(!isOpenModalDeleteCourse);
  };

  const onClickPublish = () => {
    onPublish();
    setIsOpenModalPublishCourse(!isOpenModalPublishCourse);
  };

  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Icon icon={moreVerticalFill} width={20} height={20} />
      </IconButton>
      <DialogAnimate
        open={isOpenModalDeleteCourse}
        onClose={() => setIsOpenModalDeleteCourse(!isOpenModalDeleteCourse)}
      >
        <DialogTitle sx={{ pb: 1 }}>Delete Course ?</DialogTitle>
        <DialogContent sx={{ overflowY: 'unset' }}>
          <Typography align={'justify'}>
            Course yang sudah dihapus akan hilang selamanya ! Apakah anda tetap ingin menghapus
            Course ?
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
              onClick={() => setIsOpenModalDeleteCourse(!isOpenModalDeleteCourse)}
            >
              Cancel
            </Button>
          </Box>
        </DialogContent>
      </DialogAnimate>
      <DialogAnimate
        open={isOpenModalPublishCourse}
        onClose={() => setIsOpenModalPublishCourse(!isOpenModalPublishCourse)}
      >
        <DialogTitle sx={{ pb: 1 }}>Publish Course ?</DialogTitle>
        <DialogContent sx={{ overflowY: 'unset' }}>
          <Typography align={'justify'}>
            Klik Publish untuk melakukan publikasi pada Course, jika Course sudah di publikasi maka
            akan diubah ke tidak published
          </Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-around',
              p: 1.5
            }}
          >
            <Button variant="contained" onClick={onClickPublish}>
              Publish
            </Button>
            <Button
              color="error"
              variant="contained"
              onClick={() => setIsOpenModalPublishCourse(!isOpenModalPublishCourse)}
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
          onClick={() => setIsOpenModalDeleteCourse(!isOpenModalDeleteCourse)}
          sx={{ color: 'text.secondary' }}
        >
          <ListItemIcon>
            <Icon icon={trash2Outline} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Delete" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>

        <MenuItem
          component={RouterLink}
          to={`${PATH_DASHBOARD.general.courseManagement}/edit/${id}`}
          sx={{ color: 'text.secondary' }}
        >
          <ListItemIcon>
            <Icon icon={editFill} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Edit" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>

        <MenuItem
          onClick={() => setIsOpenModalPublishCourse(!isOpenModalPublishCourse)}
          sx={{ color: 'text.secondary' }}
        >
          <ListItemIcon>
            <Icon icon={checkmarkFill} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Publish" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
      </Menu>
    </>
  );
}
