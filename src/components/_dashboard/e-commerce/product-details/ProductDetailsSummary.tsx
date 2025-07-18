import { Icon } from '@iconify/react';
import { paramCase, sentenceCase } from 'change-case';
import { useNavigate } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';

import plusFill from '@iconify/icons-eva/plus-fill';
import minusFill from '@iconify/icons-eva/minus-fill';
import { useFormik, Form, FormikProvider, useField } from 'formik';
import roundAddShoppingCart from '@iconify/icons-ic/round-add-shopping-cart';
// material
import { useTheme, styled } from '@mui/material/styles';
import { Box, Grid, Link, Button, Divider, Typography, FormHelperText } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// utils
import { fCurrency } from '../../../../utils/formatNumber';
//
import Label from '../../../Label';
import { MIconButton } from '../../../@material-extend';
import { Product, CartItem } from '../../../../@types/products';
import editFill from '@iconify/icons-eva/edit-fill';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(3),
  [theme.breakpoints.up(1368)]: {
    padding: theme.spacing(5, 8)
  }
}));

// ----------------------------------------------------------------------

const Incrementer = ({ name, available }: { name: string; available: number }) => {
  const [field, , helpers] = useField(name);
  const { value } = field;
  const { setValue } = helpers;

  const incrementQuantity = () => {
    setValue(value + 1);
  };
  const decrementQuantity = () => {
    setValue(value - 1);
  };

  return (
    <Box
      sx={{
        py: 0.5,
        px: 0.75,
        border: 1,
        lineHeight: 0,
        borderRadius: 1,
        display: 'flex',
        alignItems: 'center',
        borderColor: 'grey.50032'
      }}
    >
      <MIconButton size="small" color="inherit" disabled={value <= 1} onClick={decrementQuantity}>
        <Icon icon={minusFill} width={16} height={16} />
      </MIconButton>
      <Typography
        variant="body2"
        component="span"
        sx={{
          width: 40,
          textAlign: 'center',
          display: 'inline-block'
        }}
      >
        {value}
      </Typography>
      <MIconButton
        size="small"
        color="inherit"
        disabled={value >= available}
        onClick={incrementQuantity}
      >
        <Icon icon={plusFill} width={16} height={16} />
      </MIconButton>
    </Box>
  );
};

type ProductDetailsSumaryprops = {
  product: Product;
  cart: CartItem[];
  onAddCart: (cartItem: CartItem) => void;
  onGotoStep: (step: number) => void;
  isSeller: boolean;
};

export default function ProductDetailsSummary({
  product,
  cart,
  onAddCart,
  onGotoStep,
  isSeller,
  ...other
}: ProductDetailsSumaryprops) {
  const theme = useTheme();
  const navigate = useNavigate();
  const { id, name, category, price, available, cover, status, store, weight } = product;
  const storeName = store.name || null;
  const storeCity = store.city || null;
  const linkTo = `${PATH_DASHBOARD.eCommerce.seller.root}/product/${paramCase(id.toString())}/edit`;

  const alreadyProduct = cart.map((item) => item.id).includes(id);
  const isMaxQuantity =
    cart.filter((item) => item.id === id).map((item) => item.quantity)[0] >= available;

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id,
      name,
      cover,
      available,
      price,
      quantity: available < 1 ? 0 : 1
    },
    onSubmit: async (values, { setSubmitting }) => {
      try {
        let subtotal = values.price * values.quantity;
        let weightTotal = weight * values.quantity;
        if (!alreadyProduct) {
          onAddCart({
            ...values,
            weight: weightTotal,
            subtotal: subtotal,
            store_name: storeName,
            store_city: storeCity,
            shipment: null,
            shipment_price: null
          });
        }
        setSubmitting(false);
        onGotoStep(0);
        navigate(PATH_DASHBOARD.eCommerce.checkout);
      } catch (error) {
        setSubmitting(false);
      }
    }
  });

  const { values, touched, errors, handleSubmit } = formik;

  const handleAddCart = async () => {
    try {
      let subtotal = values.price * values.quantity;
      let weightTotal = weight * values.quantity;
      onAddCart({
        ...values,
        weight: weightTotal,
        subtotal: subtotal,
        store_name: storeName,
        store_city: storeCity,
        shipment: null,
        shipment_price: null
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <RootStyle {...other}>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Box display="flex" justifyContent="space-between">
            <Box>
              <Label
                variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                color={status === 'Active' ? 'success' : 'error'}
                sx={{ textTransform: 'uppercase' }}
              >
                {sentenceCase(status || '')}
              </Label>

              <Typography variant="h5" paragraph>
                {name}
              </Typography>
            </Box>
            {isSeller && (
              <Box>
                <Link
                  to={linkTo}
                  color="inherit"
                  component={RouterLink}
                  style={{
                    textDecoration: 'none'
                  }}
                >
                  <Button size="medium" variant="contained" startIcon={<Icon icon={editFill} />}>
                    Edit Product
                  </Button>
                </Link>
              </Box>
            )}
          </Box>

          <Typography variant="h4" sx={{ mb: 3 }}>
            {fCurrency(price)}
          </Typography>

          <Divider sx={{ borderStyle: 'dashed' }} />

          <Box
            sx={{
              mb: 2,
              display: 'flex',
              justifyContent: 'space-between'
            }}
          >
            <Typography variant="subtitle1" sx={{ mt: 0.5 }}>
              Toko
            </Typography>
            <Typography sx={{ mt: 0.5 }}>{storeName}</Typography>
          </Box>

          <Box
            sx={{
              mb: 2,
              display: 'flex',
              justifyContent: 'space-between'
            }}
          >
            <Typography variant="subtitle1" sx={{ mt: 0.5 }}>
              Lokasi
            </Typography>
            <Typography sx={{ mt: 0.5 }}>{store.city}</Typography>
          </Box>

          <Box
            sx={{
              mb: 2,
              display: 'flex',
              justifyContent: 'space-between'
            }}
          >
            <Typography variant="subtitle1" sx={{ mt: 0.5 }}>
              Kategori
            </Typography>
            <Typography sx={{ mt: 0.5 }}>{category}</Typography>
          </Box>

          <Box
            sx={{
              mb: 2,
              display: 'flex',
              justifyContent: 'space-between'
            }}
          >
            <Typography variant="subtitle1" sx={{ mt: 0.5 }}>
              Berat per Item
            </Typography>
            <Typography sx={{ mt: 0.5 }}>{weight} gram</Typography>
          </Box>

          <Box
            sx={{
              mb: 2,
              display: 'flex',
              justifyContent: 'space-between'
            }}
          >
            <Typography variant="subtitle1" sx={{ mt: 0.5 }}>
              Jumlah
            </Typography>

            <div>
              <Incrementer name="quantity" available={available} />
              <Typography
                variant="caption"
                sx={{
                  mt: 1,
                  display: 'block',
                  textAlign: 'right',
                  color: 'text.secondary'
                }}
              >
                Tersedia: {available}
              </Typography>

              <FormHelperText error>{touched.quantity && errors.quantity}</FormHelperText>
            </div>
          </Box>

          <Divider sx={{ borderStyle: 'dashed' }} />

          <Box sx={{ mt: 5 }}>
            {available === 0 || isSeller ? (
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Typography>
                  Produk tidak tersedia. {isSeller && 'Anda adalah penjual dari produk ini.'}
                </Typography>
              </Box>
            ) : (
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Button
                    fullWidth
                    disabled={isMaxQuantity}
                    size="large"
                    type="button"
                    color="warning"
                    variant="contained"
                    startIcon={<Icon icon={roundAddShoppingCart} />}
                    onClick={handleAddCart}
                    sx={{ whiteSpace: 'nowrap' }}
                  >
                    Add to Cart
                  </Button>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Button fullWidth size="large" type="submit" variant="contained">
                    Buy Now
                  </Button>
                </Grid>
              </Grid>
            )}
          </Box>
        </Form>
      </FormikProvider>
    </RootStyle>
  );
}
