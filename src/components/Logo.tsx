// material
import { Box, BoxProps } from '@mui/material';

// ----------------------------------------------------------------------

export default function Logo({ sx }: BoxProps) {
  return (
    <Box
      sx={{ width: 40, height: 40, ...sx }}
      component="img"
      alt="coopchick logo"
      src={'/favicon/icon-512x512.png'}
    />
  );
}
