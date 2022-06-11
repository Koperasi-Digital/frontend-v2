import * as Yup from 'yup';
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  Grid,
  Container,
  Typography,
  Card,
  Box,
  styled,
  TextField
} from '@mui/material';
import { fDateTime } from 'utils/formatTime';
import { fCurrency } from 'utils/formatNumber';
import { OrderDetails, OrderDetailsLog } from '../../../../@types/order';
// import { DialogAnimate } from '../../../../components/animate';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { Form, FormikProvider, useFormik } from 'formik';
import OrderDetailsTimeline from './OrderDetailsTimeline';
import { useDispatch } from '../../../../redux/store';
// import useAuth from 'hooks/useAuth';
import { createOrderDetailsLog, updateOrderDetails } from '../../../../redux/slices/order';
import { LoadingButton } from '@mui/lab';

const ProductImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute'
});

type OrderDetailsUpdateStatusValues = {
  description: string;
  newStatus: string;
};

type OrderDetailsSummaryProps = {
  orderDetails: OrderDetails;
  orderDetailsLog: OrderDetailsLog[];
  isSeller: boolean;
};

function getNextStatus(status: string) {
  if (status === 'LUNAS') {
    return 'DALAM PENGIRIMAN';
  } else if (status === 'DALAM PENGIRIMAN') {
    return 'SELESAI';
  } else {
    return 'NONE';
  }
}

interface ConfirmationFormDialogProps {
  id: string;
  isOpenModalUpdateStatus: boolean;
  setIsOpenModalUpdateStatus: (value: boolean) => void;
  nextStatus: string;
}

function ConfirmationFormDialog({
  id,
  isOpenModalUpdateStatus,
  setIsOpenModalUpdateStatus,
  nextStatus
}: ConfirmationFormDialogProps) {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const UpdateStatusSchema = Yup.object().shape({
    description: Yup.string().required('Description is required'),
    newStatus: Yup.string()
  });

  const formik = useFormik<OrderDetailsUpdateStatusValues>({
    initialValues: {
      description: '',
      newStatus: nextStatus
    },
    validationSchema: UpdateStatusSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        dispatch(updateOrderDetails(id, values.newStatus));
        dispatch(createOrderDetailsLog(id, values.newStatus, values.description));
        resetForm();
        setSubmitting(false);
        setIsOpenModalUpdateStatus(!setIsOpenModalUpdateStatus);
        enqueueSnackbar(`Status pesanan berhasil diperbaharui`, { variant: 'success' });
      } catch (error) {
        setSubmitting(false);
        enqueueSnackbar(`Gagal memperbaharui status`, { variant: 'error' });
      }
    }
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <Dialog open={isOpenModalUpdateStatus} onClose={() => setIsOpenModalUpdateStatus(false)}>
      <DialogTitle sx={{ pb: 1 }}>Update Status ?</DialogTitle>
      <DialogContent sx={{ overflowY: 'unset' }}>
        <FormikProvider value={formik}>
          <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <Typography sx={{ my: 2 }}>
              Anda akan mengubah status pesanan menjadi {nextStatus}.
            </Typography>
            <TextField
              fullWidth
              label="Deskripsi"
              {...getFieldProps('description')}
              error={Boolean(touched.description && errors.description)}
              helperText={touched.description && errors.description}
            />
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-around',
                p: 1.5
              }}
            >
              <LoadingButton variant="contained" type="submit" loading={isSubmitting}>
                Update
              </LoadingButton>
              <Button
                color="error"
                variant="contained"
                onClick={() => setIsOpenModalUpdateStatus(false)}
              >
                Cancel
              </Button>
            </Box>
          </Form>
        </FormikProvider>
      </DialogContent>
    </Dialog>
  );
}

export default function OrderDetailsSummary({
  orderDetails,
  orderDetailsLog,
  isSeller
}: OrderDetailsSummaryProps) {
  const { id, order, product, quantity, subtotal, status, shipment, shipment_price } = orderDetails;

  const summaryInfo = [
    ['ID Transaksi', id],
    ['Tanggal Pemesanan', fDateTime(order.timestamp)],
    ['Nama Produk', product.name],
    ['Nama Toko', product.store.name],
    ['Nama Pembeli', order.user.displayName],
    ['Jumlah', quantity],
    ['Total', fCurrency(subtotal)],
    ['Status', status]
  ];

  const shipmentInfo = [
    ['Jenis Pengiriman', shipment],
    ['Ongkos Kirim', fCurrency(shipment_price)],
    ['Alamat', order.address || '-']
  ];

  const [isOpenModalUpdateStatus, setIsOpenModalUpdateStatus] = useState<boolean>(false);
  const nextStatus = getNextStatus(status);

  // const { currentRole, user } = useAuth();

  const handleOpenModalUpdateStatus = () => {
    setIsOpenModalUpdateStatus(!isOpenModalUpdateStatus);
  };

  return (
    <Container>
      <Grid container>
        <Grid item xs={12} md={4}>
          <Card sx={{ mx: 2, px: 2, py: 2, maxHeight: '300px' }}>
            <Box sx={{ pt: '100%', position: 'relative' }}>
              <ProductImgStyle alt={product.name} src={product.cover} />
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12} md>
          <Card sx={{ mx: 2, px: 2, py: 2 }}>
            {summaryInfo.map((item, index) => (
              <Stack key={index} direction="row" alignItems="center" justifyContent="space-between">
                <Typography variant="subtitle1">{item[0]}</Typography>
                <Typography>{item[1]}</Typography>
              </Stack>
            ))}
          </Card>
          <Card sx={{ mx: 2, px: 2, py: 2, my: 2 }}>
            {shipmentInfo.map((item, index) => (
              <Stack key={index} direction="row" alignItems="center" justifyContent="space-between">
                <Typography variant="subtitle1">{item[0]}</Typography>
                <Typography>{item[1]}</Typography>
              </Stack>
            ))}
          </Card>
          <Box sx={{ my: 2, mx: 2 }}>
            <OrderDetailsTimeline
              orderDetailsLog={orderDetailsLog}
              timestamp={order.timestamp}
              status={status}
            ></OrderDetailsTimeline>
          </Box>
          {isSeller && nextStatus !== 'NONE' && (
            <Button
              size="medium"
              variant="contained"
              sx={{ float: 'right', mx: 2, px: 2 }}
              onClick={() => handleOpenModalUpdateStatus()}
            >
              KONFIRMASI {nextStatus}
            </Button>
          )}
        </Grid>
      </Grid>
      <ConfirmationFormDialog
        id={id}
        isOpenModalUpdateStatus={isOpenModalUpdateStatus}
        setIsOpenModalUpdateStatus={setIsOpenModalUpdateStatus}
        nextStatus={nextStatus}
      />
    </Container>
  );
}
