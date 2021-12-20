// material
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Card,
  Table,
  Avatar,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  CardHeader,
  Typography,
  TableContainer
} from '@mui/material';
// utils
import mockData from '../../../utils/mock-data';
//
import Label from '../../Label';
import Scrollbar from '../../Scrollbar';
import { random } from 'lodash';

// ----------------------------------------------------------------------

const PRODUCT_NAME = [
  'Ayam Petelur Utuh',
  'Telur Ayam Petelur',
  'Ayam Potong Utuh',
  'Itik Ayam',
  'Vaksin N.C.D'
];

const CATEGORY = ['Pakan', 'Infrastruktur', 'Telur', 'Ayam Ekor', 'Ayam Potong'];

const MOCK_SALES = [...Array(5)].map((_, index) => ({
  id: mockData.id(index),
  avatar: mockData.image.product(index),
  product: PRODUCT_NAME[index],
  category: CATEGORY[index],
  amount: random(10),
  date: '20 Desember 2021',
  buyer: mockData.name.fullName(index),
  status: 'Delivered'
}));

// ----------------------------------------------------------------------

export default function EcommerceRecentSold() {
  const theme = useTheme();
  console.log(MOCK_SALES);

  return (
    <Card sx={{ pb: 3 }}>
      <CardHeader title="Recent Solds" sx={{ mb: 3 }} />
      <Scrollbar>
        <TableContainer sx={{ minWidth: 720 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Product</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Buyer</TableCell>
                <TableCell align="right">Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {MOCK_SALES.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar alt={row.product} src={row.avatar} />
                      <Box sx={{ ml: 2 }}>
                        <Typography variant="body2"> {row.product}</Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>{row.category}</TableCell>
                  <TableCell>{row.amount}</TableCell>
                  <TableCell>{row.date}</TableCell>
                  <TableCell>{row.buyer}</TableCell>
                  <TableCell align="right">
                    <Label
                      variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                      color={
                        (row.status === 'Pending' && 'primary') ||
                        (row.status === 'Ongoing' && 'info') ||
                        (row.status === 'Delivered' && 'success') ||
                        'error'
                      }
                    >
                      {row.status}
                    </Label>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Scrollbar>
    </Card>
  );
}
