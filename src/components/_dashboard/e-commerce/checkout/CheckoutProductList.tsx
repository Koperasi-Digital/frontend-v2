import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import minusFill from '@iconify/icons-eva/minus-fill';
import trash2Fill from '@iconify/icons-eva/trash-2-fill';
// material
import { styled } from '@mui/material/styles';
import {
  Box,
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  Typography,
  TableContainer
} from '@mui/material';
// utils
import { fCurrency } from '../../../../utils/formatNumber';
// @types
import { CartItem } from '../../../../@types/products';
//
import { MIconButton } from '../../../@material-extend';

// ----------------------------------------------------------------------

const IncrementerStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: theme.spacing(0.5),
  padding: theme.spacing(0.5, 0.75),
  borderRadius: theme.shape.borderRadius,
  border: `solid 1px ${theme.palette.grey[500_32]}`
}));

const ThumbImgStyle = styled('img')(({ theme }) => ({
  width: 64,
  height: 64,
  objectFit: 'cover',
  marginRight: theme.spacing(2),
  borderRadius: theme.shape.borderRadiusSm
}));

// ----------------------------------------------------------------------

type IncrementerProps = {
  available: number;
  quantity: number;
  onIncrease: VoidFunction;
  onDecrease: VoidFunction;
};

function Incrementer({ available, quantity, onIncrease, onDecrease }: IncrementerProps) {
  return (
    <Box sx={{ width: 96, textAlign: 'right' }}>
      <IncrementerStyle>
        <MIconButton size="small" color="inherit" onClick={onDecrease} disabled={quantity <= 1}>
          <Icon icon={minusFill} width={16} height={16} />
        </MIconButton>
        {quantity}
        <MIconButton
          size="small"
          color="inherit"
          onClick={onIncrease}
          disabled={quantity >= available}
        >
          <Icon icon={plusFill} width={16} height={16} />
        </MIconButton>
      </IncrementerStyle>
      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
        tersedia: {available}
      </Typography>
    </Box>
  );
}

type CheckoutProductListProps = {
  products: CartItem[];
  onDelete: (id: string) => void;
  onDecreaseQuantity: (id: string) => void;
  onIncreaseQuantity: (id: string) => void;
};

export default function CheckoutProductList({
  products,
  onDelete,
  onIncreaseQuantity,
  onDecreaseQuantity
}: CheckoutProductListProps) {
  return (
    <TableContainer sx={{ minWidth: 720 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Produk</TableCell>
            <TableCell align="left">Harga</TableCell>
            <TableCell align="left">Jumlah</TableCell>
            <TableCell align="right">Subtotal</TableCell>
            <TableCell align="right" />
          </TableRow>
        </TableHead>

        <TableBody>
          {products.map((product) => {
            const { id, name, price, cover, quantity, available } = product;
            return (
              <TableRow key={id}>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <ThumbImgStyle alt="product image" src={cover} />
                    <Box>
                      <Typography noWrap variant="subtitle2" sx={{ maxWidth: 240 }}>
                        {name}
                      </Typography>

                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center'
                        }}
                      ></Box>
                    </Box>
                  </Box>
                </TableCell>

                <TableCell align="left">{fCurrency(price)}</TableCell>

                <TableCell align="left">
                  <Incrementer
                    quantity={quantity}
                    available={available}
                    onDecrease={() => onDecreaseQuantity(id)}
                    onIncrease={() => onIncreaseQuantity(id)}
                  />
                </TableCell>

                <TableCell align="right">{fCurrency(price * quantity)}</TableCell>

                <TableCell align="right">
                  <MIconButton onClick={() => onDelete(id)}>
                    <Icon icon={trash2Fill} width={20} height={20} />
                  </MIconButton>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
