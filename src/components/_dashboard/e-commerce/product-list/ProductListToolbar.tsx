import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import searchFill from '@iconify/icons-eva/search-fill';
import plusFill from '@iconify/icons-eva/plus-fill';
// material
import { styled } from '@mui/material/styles';
import { Box, Toolbar, InputAdornment, OutlinedInput, Button } from '@mui/material';
import { PATH_DASHBOARD } from 'routes/paths';

// ----------------------------------------------------------------------

const RootStyle = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1, 0, 3)
}));

const SearchStyle = styled(OutlinedInput)(({ theme }) => ({
  width: 240,
  transition: theme.transitions.create(['box-shadow', 'width'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter
  }),
  '&.Mui-focused': { width: 320, boxShadow: theme.customShadows.z8 },
  '& fieldset': {
    borderWidth: `1px !important`,
    borderColor: `${theme.palette.grey[500_32]} !important`
  }
}));

// ----------------------------------------------------------------------

type ProductListToolbarProps = {
  filterName: string;
  onFilterName: (value: string) => void;
};

export default function ProductListToolbar({ filterName, onFilterName }: ProductListToolbarProps) {
  const linkTo = `${PATH_DASHBOARD.eCommerce.seller.root}/product/new`;

  return (
    <RootStyle>
      <SearchStyle
        value={filterName}
        onChange={(e) => onFilterName(e.target.value)}
        placeholder="Cari produk..."
        startAdornment={
          <InputAdornment position="start">
            <Box component={Icon} icon={searchFill} sx={{ color: 'text.disabled' }} />
          </InputAdornment>
        }
      />

      <Link to={linkTo} color="inherit" style={{ textDecoration: 'none' }}>
        <Button size="medium" variant="contained" startIcon={<Icon icon={plusFill} />}>
          Add New Product
        </Button>
      </Link>
    </RootStyle>
  );
}
