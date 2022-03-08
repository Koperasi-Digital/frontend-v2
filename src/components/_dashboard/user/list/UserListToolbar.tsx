import { useEffect } from 'react';
import { Icon } from '@iconify/react';
import searchFill from '@iconify/icons-eva/search-fill';
import trash2Fill from '@iconify/icons-eva/trash-2-fill';
import { capitalize } from 'lodash';
// material
import { useTheme, styled } from '@mui/material/styles';
import {
  Box,
  Toolbar,
  Tooltip,
  IconButton,
  Typography,
  OutlinedInput,
  InputAdornment,
  FormControl,
  InputLabel,
  MenuItem,
  Select
} from '@mui/material';
// redux
import { useDispatch, useSelector, RootState } from '../../../../redux/store';
import { getRoles } from '../../../../redux/slices/role';

// ----------------------------------------------------------------------

const RootStyle = styled(Toolbar)(({ theme }) => ({
  // height: 96,
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(2, 3, 2, 3)
}));

const SearchStyle = styled(OutlinedInput)(({ theme }) => ({
  width: '100%',
  transition: theme.transitions.create(['box-shadow', 'width'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter
  }),
  '&.Mui-focused': { boxShadow: theme.customShadows.z8 },
  '& fieldset': {
    borderWidth: `1px !important`,
    borderColor: `${theme.palette.grey[500_32]} !important`
  }
}));

const RoleFormControlStyle = styled(FormControl)(({ theme }) => ({
  width: 210,
  marginRight: 12,
  [theme.breakpoints.down('lg')]: {
    width: '100%'
  }
}));

const FilterContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  width: '100%',
  [theme.breakpoints.down('lg')]: {
    flexDirection: 'column',
    rowGap: 12
  }
}));

// ----------------------------------------------------------------------

type UserListToolbarProps = {
  numSelected: number;
  filterName: string;
  filterRole: string;
  onFilterName: (value: string) => void;
  onFilterRole: (value: string) => void;
};

export default function UserListToolbar({
  numSelected,
  filterName,
  filterRole,
  onFilterName,
  onFilterRole
}: UserListToolbarProps) {
  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';

  const dispatch = useDispatch();
  const { roles } = useSelector((state: RootState) => state.role);

  useEffect(() => {
    dispatch(getRoles());
  }, [dispatch]);

  return (
    <RootStyle
      sx={{
        ...(numSelected > 0 && {
          color: isLight ? 'primary.main' : 'text.primary',
          bgcolor: isLight ? 'primary.lighter' : 'primary.dark'
        })
      }}
    >
      {numSelected > 0 ? (
        <Typography component="div" variant="subtitle1">
          {numSelected} selected
        </Typography>
      ) : (
        <FilterContainer>
          <RoleFormControlStyle>
            <InputLabel id="role-filter-label">Role</InputLabel>
            <Select
              labelId="role-filter-label"
              id="role-filter"
              label="Role"
              value={filterRole}
              onChange={(e) => onFilterRole(e.target.value)}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {roles.map(({ id, name }) => (
                <MenuItem key={id} value={name}>
                  {capitalize(name)}
                </MenuItem>
              ))}
            </Select>
          </RoleFormControlStyle>
          <SearchStyle
            value={filterName}
            onChange={(e) => onFilterName(e.target.value)}
            placeholder="Search name or email..."
            startAdornment={
              <InputAdornment position="start">
                <Box component={Icon} icon={searchFill} sx={{ color: 'text.disabled' }} />
              </InputAdornment>
            }
          />
        </FilterContainer>
      )}

      {numSelected > 0 && (
        <Tooltip title="Delete">
          <IconButton>
            <Icon icon={trash2Fill} />
          </IconButton>
        </Tooltip>
      )}
    </RootStyle>
  );
}
