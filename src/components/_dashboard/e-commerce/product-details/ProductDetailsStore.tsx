import { Box, Typography } from '@mui/material';
import { Store } from '../../../../@types/store';

// ----------------------------------------------------------------------

type ProductDetailsSumaryprops = {
  store: Store;
};

export default function ProductDetailsStore({ store, ...other }: ProductDetailsSumaryprops) {
  const { name, description, phoneNumber, address, city, state, country, zipCode } = store;

  return (
    <Box>
      <Box
        sx={{
          mb: 1,
          display: 'flex',
          justifyContent: 'space-between'
        }}
      >
        <Typography variant="subtitle1" sx={{ mt: 0.5 }}>
          Toko
        </Typography>
        <Typography sx={{ mt: 0.5 }}>{name}</Typography>
      </Box>

      <Box
        sx={{
          mb: 1,
          display: 'flex',
          justifyContent: 'space-between'
        }}
      >
        <Typography variant="subtitle1" sx={{ mt: 0.5 }}>
          Nomor Telepon
        </Typography>
        <Typography sx={{ mt: 0.5 }}>{phoneNumber}</Typography>
      </Box>

      <Box
        sx={{
          mb: 1,
          display: 'flex',
          justifyContent: 'space-between'
        }}
      >
        <Typography variant="subtitle1" sx={{ mt: 0.5 }}>
          Lokasi
        </Typography>
        <Typography sx={{ mt: 0.5 }}>{description}</Typography>
      </Box>

      <Box
        sx={{
          mb: 1,
          display: 'flex',
          justifyContent: 'space-between'
        }}
      >
        <Typography variant="subtitle1" sx={{ mt: 0.5 }}>
          Kategori
        </Typography>
        <Typography
          sx={{ mt: 0.5 }}
        >{`${address}, ${city}, ${state}, ${country} ${zipCode}`}</Typography>
      </Box>
    </Box>
  );
}
