import { Icon } from '@iconify/react';
import editFill from '@iconify/icons-eva/edit-fill';
// material
import {
  Box,
  Card,
  Stack,
  Button,
  Divider,
  CardHeader,
  Typography,
  CardContent
} from '@mui/material';
// utils
import { fCurrency } from '../../../../utils/formatNumber';

// ----------------------------------------------------------------------

type CheckoutSummaryProps = {
  total: number;
  subtotal: number;
  shipping?: number;
  onEdit?: VoidFunction;
  enableEdit?: boolean;
};

export default function CheckoutSummary({
  total,
  onEdit,
  subtotal,
  shipping,
  enableEdit = false
}: CheckoutSummaryProps) {
  const displayShipping = shipping !== null ? fCurrency(0) : '-';

  return (
    <Card sx={{ mb: 3 }}>
      <CardHeader
        title="Rangkuman Pesanan"
        action={
          enableEdit && (
            <Button
              size="small"
              type="button"
              onClick={onEdit}
              startIcon={<Icon icon={editFill} />}
            >
              Edit
            </Button>
          )
        }
      />

      <CardContent>
        <Stack spacing={2}>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Sub Total
            </Typography>
            <Typography variant="subtitle2">{fCurrency(subtotal)}</Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Harga Ongkos Kirim
            </Typography>
            <Typography variant="subtitle2">
              {shipping ? fCurrency(shipping) : displayShipping}
            </Typography>
          </Stack>
          <Divider />
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="subtitle1">Total</Typography>
            <Box sx={{ textAlign: 'right' }}>
              <Typography variant="subtitle1" sx={{ color: 'error.main' }}>
                {fCurrency(subtotal + (shipping ? shipping : 0))}
              </Typography>
              <Typography variant="caption" sx={{ fontStyle: 'italic' }}>
                (Termasuk harga PPN)
              </Typography>
            </Box>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
