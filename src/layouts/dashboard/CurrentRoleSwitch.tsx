import { capitalize } from 'lodash';
import { Select, MenuItem, InputLabel, FormControl, SelectChangeEvent } from '@mui/material';
// hooks
import useAuth from 'hooks/useAuth';
// components
import { Role } from '../../@types/role';

// ----------------------------------------------------------------------

export default function CurrentRoleSwitch() {
  const { user, currentRole, setCurrentRole } = useAuth();
  const ownedRole: Role[] = user?.roles;

  const handleChange = (e: SelectChangeEvent) => {
    setCurrentRole(Number(e.target.value));
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="current-role-switch">Ganti Role</InputLabel>
      <Select
        labelId="current-role-switch"
        id="current-role-switch"
        label="Ganti Role"
        value={currentRole?.id.toString()}
        onChange={handleChange}
      >
        {ownedRole.map(({ id, name }) => (
          <MenuItem key={id} value={id}>
            {capitalize(name)}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
