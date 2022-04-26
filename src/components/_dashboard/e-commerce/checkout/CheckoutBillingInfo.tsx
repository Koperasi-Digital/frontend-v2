import { Icon } from '@iconify/react';
import editFill from '@iconify/icons-eva/edit-fill';
// material
import { Card, Button, Typography, CardHeader, CardContent, Box } from '@mui/material';
// @types
import { ProductState } from '../../../../@types/products';
// redux
import { useSelector } from '../../../../redux/store';

// ----------------------------------------------------------------------

type CheckoutBillingInfoProps = {
  onBackStep: VoidFunction;
};

export default function CheckoutBillingInfo({ onBackStep }: CheckoutBillingInfoProps) {
  const { checkout } = useSelector((state: { product: ProductState }) => state.product);
  const { billing } = checkout;

  return (
    <Card sx={{ mb: 3 }}>
      <CardHeader
        title="Billing Address"
        action={
          <Button
            size="small"
            type="button"
            startIcon={<Icon icon={editFill} />}
            onClick={onBackStep}
          >
            Edit
          </Button>
        }
      />
      <CardContent>
        <Typography variant="body2" gutterBottom>
          <Box sx={{ fontWeight: 'bold' }}>Alamat:</Box>
          {`${billing?.address}, ${billing?.city}, ${billing?.state}, ${billing?.country} ${billing?.zipCode}`}
        </Typography>
        <Typography variant="body2" gutterBottom>
          <Box sx={{ fontWeight: 'bold', display: 'inline' }}>No. Telepon:{` `}</Box>
          {billing?.phoneNumber}
        </Typography>
      </CardContent>
    </Card>
  );
}
