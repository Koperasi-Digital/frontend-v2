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
  FormHelperText,
  FormControlLabel
} from '@mui/material';
// @types
import { PaymentOption, PaymentFormikProps } from '../../../../@types/products';
//
import { MHidden } from '../../../@material-extend';

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

// ----------------------------------------------------------------------

type CheckoutPaymentMethodsProps = {
  formik: PaymentFormikProps;
  paymentOptions: PaymentOption[];
};

export default function CheckoutPaymentMethods({
  paymentOptions,
  formik
}: CheckoutPaymentMethodsProps) {
  const { errors, touched, values, getFieldProps } = formik;

  return (
    <Card sx={{ my: 3 }}>
      <CardHeader title="Metode Pembayaran" />
      <CardContent>
        <RadioGroup row {...getFieldProps('payment')}>
          <Grid container spacing={2}>
            {paymentOptions.map((method) => {
              const { value, title, icons, description } = method;
              const hasChildren = value === 'OTHER';

              return (
                <Grid key={title} item xs={12}>
                  <OptionStyle
                    sx={{
                      ...(values.payment === value && {
                        boxShadow: (theme) => theme.customShadows.z8
                      }),
                      ...(hasChildren && { flexWrap: 'wrap' })
                    }}
                  >
                    <FormControlLabel
                      value={value}
                      control={<Radio checkedIcon={<Icon icon={checkmarkCircle2Fill} />} />}
                      label={
                        <Box sx={{ ml: 1 }}>
                          <Typography variant="subtitle2">{title}</Typography>
                          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            {description}
                          </Typography>
                        </Box>
                      }
                      sx={{ flexGrow: 1, py: 3 }}
                    />
                    <MHidden width="smDown">
                      <Box sx={{ flexShrink: 0, display: 'flex', alignItems: 'center' }}>
                        {icons.map((icon, index) => (
                          <Box
                            key={icon}
                            component="img"
                            alt="logo card"
                            src={icon}
                            sx={{
                              ...(index === 0 && { mr: 1 })
                            }}
                          />
                        ))}
                      </Box>
                    </MHidden>
                  </OptionStyle>
                </Grid>
              );
            })}
          </Grid>
        </RadioGroup>

        {errors.payment && (
          <FormHelperText error>
            <Box component="span" sx={{ px: 2 }}>
              {touched.payment && errors.payment}
            </Box>
          </FormHelperText>
        )}
      </CardContent>
    </Card>
  );
}
