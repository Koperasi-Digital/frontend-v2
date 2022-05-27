import { Icon } from '@iconify/react';
import { paramCase } from 'change-case';
import { useRef, useState } from 'react';
import editFill from '@iconify/icons-eva/edit-fill';
import personFill from '@iconify/icons-eva/person-fill';
import { Link as RouterLink } from 'react-router-dom';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
// material
import {
  Menu,
  MenuItem,
  IconButton,
  ListItemIcon,
  ListItemText,
  Box,
  Button,
  DialogContent,
  DialogTitle,
  Typography
} from '@mui/material';
// components
import { DialogAnimate } from 'components/animate';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';

// ----------------------------------------------------------------------

type UserMoreMenuProps = {
  onDelete: VoidFunction;
  userName: string;
};

export default function UserMoreMenu({ onDelete, userName }: UserMoreMenuProps) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);

  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Icon icon={moreVerticalFill} width={20} height={20} />
      </IconButton>

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
          component={RouterLink}
          to={`${PATH_DASHBOARD.user.root}/${paramCase(userName)}/detail`}
          sx={{ color: 'text.secondary' }}
        >
          <ListItemIcon>
            <Icon icon={personFill} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Detail" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>

        <MenuItem
          component={RouterLink}
          to={`${PATH_DASHBOARD.user.root}/${paramCase(userName)}/edit`}
          sx={{ color: 'text.secondary' }}
        >
          <ListItemIcon>
            <Icon icon={editFill} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Edit" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>

        <MenuItem onClick={() => setIsOpenDeleteModal(true)} sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <Icon icon={trash2Outline} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Hapus" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
      </Menu>

      <DialogAnimate open={isOpenDeleteModal} onClose={() => setIsOpenDeleteModal(false)}>
        <DialogTitle sx={{ pb: 1 }}>Hapus Pengguna?</DialogTitle>
        <DialogContent sx={{ overflowY: 'unset' }}>
          <Typography align={'justify'}>
            Pengguna yang sudah dihapus akan hilang selamanya! Apakah Anda tetap ingin menghapus
            pengguna?
          </Typography>
          <Box display="flex" justifyContent="end" gap={2} pt={2} pb={1}>
            <Button variant="contained" onClick={onDelete} color="error">
              Hapus
            </Button>
            <Button variant="contained" onClick={() => setIsOpenDeleteModal(false)}>
              Batal
            </Button>
          </Box>
        </DialogContent>
      </DialogAnimate>
    </>
  );
}
