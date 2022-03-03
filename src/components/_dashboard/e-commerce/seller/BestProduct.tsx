import PropTypes from 'prop-types';
import { Card, CardHeader, Stack, Typography } from '@mui/material';
import { fCurrency } from 'utils/formatNumber';
import { Product } from '../../../../@types/products';

// BestProduct.propTypes = {
//   summary: PropTypes.array.isRequired
// };

export default function BestProduct() {
  return (
    <Card>
      <CardHeader title="Top 3 Sales Product" />
      {/* {summary.map((row) => (
        <Card key={row.name} sx={{ mx: 1, py: 2, px: 2, my: 1 }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography variant="subtitle1">{row.name}</Typography>
            <Typography>{row.quantity}</Typography>
            <Typography>{fCurrency(row.total)}</Typography>
          </Stack>
        </Card>
      ))} */}
    </Card>
  );
}
