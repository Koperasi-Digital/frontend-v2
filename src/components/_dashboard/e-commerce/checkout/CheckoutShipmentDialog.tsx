import { Icon } from '@iconify/react';
import checkmarkCircle2Fill from '@iconify/icons-eva/checkmark-circle-2-fill';
// material
import { styled } from '@mui/material/styles';
import {
  Box,
  Grid,
  Radio,
  Typography,
  RadioGroup,
  FormControlLabel,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Button
} from '@mui/material';
// @types
import {
  PaymentFormikProps,
  ApplyShipping,
  ShipmentForm,
  ShipmentOptions,
  IconType
} from '../../../../@types/products';
import { fCurrency } from '../../../../utils/formatNumber';
import { MHidden } from 'components/@material-extend';
import { useEffect, useState } from 'react';
import { getCityIDByName } from 'components/_dashboard/user/cities';
import { getAllShipmentCost } from 'utils/checkoutAxios/shipment';

// ----------------------------------------------------------------------

const OptionStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 2.5),
  justifyContent: 'space-between',
  borderRadius: theme.shape.borderRadius,
  transition: theme.transitions.create('all'),
  border: `solid 1px ${theme.palette.grey[500_32]}`
}));

const icons: IconType = {
  tiki: '/static/icons/ic_tiki.png',
  jne: '/static/icons/ic_jne.png',
  pos: '/static/icons/ic_pos.png'
};

// ----------------------------------------------------------------------

type CheckoutShipmentDialogProps = {
  formik: PaymentFormikProps;
  cartID: number;
  origin: string;
  destination: string;
  weight: number;
  onApplyShipping: (shipping: ApplyShipping) => void;
  open: boolean;
  onClose: (value: boolean) => void;
  onReset: (value: number) => void;
};

export default function CheckoutShipmentDialog({
  formik,
  cartID,
  origin,
  destination,
  weight,
  onApplyShipping,
  open,
  onClose,
  onReset,
  ...other
}: CheckoutShipmentDialogProps) {
  const [deliveryOptions, setDeliveryOptions] = useState<ShipmentOptions[]>([]);
  const { values, setFieldValue } = formik;

  // Retrieve all delivery options
  useEffect(() => {
    const shipmentInfo: ShipmentForm = {
      origin: getCityIDByName(origin),
      destination: getCityIDByName(destination),
      weight: weight * 1000
    };
    const fetchShippingData = async (shipmentInfo: ShipmentForm) => {
      const response: ShipmentOptions[] = await getAllShipmentCost(shipmentInfo);
      setDeliveryOptions(response);
    };
    fetchShippingData(shipmentInfo);
  }, [origin, destination, weight]);

  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={() => onClose(false)}>
      <DialogTitle sx={{ mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="subtitle1">
            <h3>Pilih jenis pengiriman</h3>
          </Typography>
          <Button size="medium" variant="contained" sx={{ mr: 2 }} onClick={() => onReset(cartID)}>
            Clear
          </Button>
        </Box>
      </DialogTitle>
      <DialogContent>
        {deliveryOptions.length === 0 && (
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CircularProgress />
          </Box>
        )}
        <RadioGroup
          name="delivery"
          value={values.shipment}
          onChange={(event) => {
            const { value } = event.target;
            const [cost, service, cartID] = value.split(';');
            setFieldValue('shipment', value);
            const applyShippingItem = {
              chosenItem: Number(cartID),
              shipment: service,
              shipment_price: Number(cost)
            };
            onApplyShipping(applyShippingItem);
            onClose(false);
          }}
        >
          <Grid container spacing={2}>
            {deliveryOptions.length !== 0 &&
              deliveryOptions.map((delivery, index) => {
                const { code, costs } = delivery[0];
                return costs.map((shipmentDetail) => {
                  const { service, cost } = shipmentDetail;
                  return (
                    <Grid key={service} item xs={12}>
                      <OptionStyle
                        sx={{
                          ...(values.shipment ===
                            cost[0].value +
                              ';' +
                              code.toUpperCase() +
                              ' ' +
                              service +
                              ';' +
                              cartID && {
                            boxShadow: (theme) => theme.customShadows.z8
                          })
                        }}
                      >
                        <FormControlLabel
                          value={
                            cost[0].value + ';' + code.toUpperCase() + ' ' + service + ';' + cartID
                          }
                          control={<Radio checkedIcon={<Icon icon={checkmarkCircle2Fill} />} />}
                          label={
                            <Box sx={{ ml: 1 }}>
                              <Typography variant="subtitle2">
                                {code.toUpperCase()}&nbsp;{service}
                              </Typography>
                              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                {fCurrency(cost[0].value)}&nbsp;-&nbsp;{parseInt(cost[0].etd)} HARI
                              </Typography>
                            </Box>
                          }
                          sx={{ py: 3, flexGrow: 1, mr: 0 }}
                        />
                        <MHidden width="smDown">
                          <Box sx={{ flexShrink: 0, display: 'flex', alignItems: 'center' }}>
                            <Box
                              component="img"
                              alt="logo card"
                              src={icons[code as keyof IconType]}
                              sx={{ mr: 1, maxHeight: 40 }}
                            />
                          </Box>
                        </MHidden>
                      </OptionStyle>
                    </Grid>
                  );
                });
              })}
          </Grid>
        </RadioGroup>
      </DialogContent>
    </Dialog>
  );
}
