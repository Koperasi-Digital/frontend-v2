import { Icon } from '@iconify/react';
import checkmarkCircle2Fill from '@iconify/icons-eva/checkmark-circle-2-fill';
// material
import { styled } from '@mui/material/styles';
import {
  Box,
  Card,
  Grid,
  Radio,
  Typography,
  RadioGroup,
  CardHeader,
  CardContent,
  FormControlLabel,
  CircularProgress
} from '@mui/material';
// @types
import { PaymentFormikProps, ShipmentOptions } from '../../../../@types/products';
import { fCurrency } from '../../../../utils/formatNumber';
import { MHidden } from 'components/@material-extend';

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

type IconType = { tiki: string; jne: string; pos: string };
const icons: IconType = {
  tiki: '/static/icons/ic_tiki.png',
  jne: '/static/icons/ic_jne.png',
  pos: '/static/icons/ic_pos.png'
};

// ----------------------------------------------------------------------

type CheckoutDeliveryProps = {
  formik: PaymentFormikProps;
  deliveryOptions: ShipmentOptions[];
  onApplyShipping: (shipping: number) => void;
};

export default function CheckoutDelivery({
  formik,
  deliveryOptions,
  onApplyShipping,
  ...other
}: CheckoutDeliveryProps) {
  const { values, setFieldValue } = formik;

  return (
    <Card {...other}>
      <CardHeader title="Delivery options" />
      {deliveryOptions.length === 0 && (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
      )}
      <CardContent>
        <RadioGroup
          name="delivery"
          value={Number(values.delivery)}
          onChange={(event) => {
            const { value } = event.target;
            setFieldValue('delivery', Number(value));
            onApplyShipping(Number(value));
          }}
        >
          <Grid container spacing={2}>
            {deliveryOptions.length !== 0 &&
              deliveryOptions.map((delivery, index) => {
                const { code, costs } = delivery[0];
                return costs.map((shipmentDetail) => {
                  const { service, cost } = shipmentDetail;
                  return (
                    <Grid key={index} item xs={12}>
                      <OptionStyle
                        sx={{
                          ...(values.delivery === index && {
                            boxShadow: (theme) => theme.customShadows.z8
                          })
                        }}
                      >
                        <FormControlLabel
                          value={index}
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
      </CardContent>
    </Card>
  );
}
