import { Paper, PaperProps, Typography } from '@mui/material';

// ----------------------------------------------------------------------

interface SearchNotFoundProps extends PaperProps {
  searchQuery?: string;
}

export default function SearchNotFound({ searchQuery = '', ...other }: SearchNotFoundProps) {
  return (
    <Paper {...other}>
      <Typography gutterBottom align="center" variant="subtitle1">
        Tidak ditemukan
      </Typography>
      <Typography variant="body2" align="center">
        Tidak ada hasil yang ditemukan untuk &nbsp;
        <strong>&quot;{searchQuery}&quot;</strong>. Coba periksa kesalahan ketik atau gunakan
        kata-kata yang lengkap..
      </Typography>
    </Paper>
  );
}
