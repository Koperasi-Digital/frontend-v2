import { filter } from 'lodash';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
// material
import { useTheme, styled } from '@mui/material/styles';
import {
  Box,
  Card,
  Table,
  TableRow,
  TableBody,
  TableCell,
  Container,
  IconButton,
  Typography,
  TableContainer,
  TablePagination,
  Grid
} from '@mui/material';
// utils
import { fCurrency } from '../../utils/formatNumber';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// @types
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import getOrders from 'utils/orders';
import { OrderCard } from 'components/_dashboard/e-commerce/order-history';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'order_id', label: 'ID', alignRight: false },
  { id: 'product_name', label: 'Produk', alignRight: false },
  { id: 'user_name', label: 'Pembeli', alignRight: false },
  { id: 'timestamp', label: 'Tanggal', alignRight: false },
  { id: 'quantity', label: 'Banyak', alignRight: false },
  { id: 'subtotal', label: 'Subtotal', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: '' }
];

const ThumbImgStyle = styled('img')(({ theme }) => ({
  width: 64,
  height: 64,
  objectFit: 'cover',
  margin: theme.spacing(0, 1),
  borderRadius: theme.shape.borderRadiusSm
}));

// ----------------------------------------------------------------------

function descendingComparator(a: Anonymous, b: Anonymous, orderBy: string) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Anonymous = Record<string | number, string>;

function getComparator(order: string, orderBy: string) {
  return order === 'desc'
    ? (a: Anonymous, b: Anonymous) => descendingComparator(a, b, orderBy)
    : (a: Anonymous, b: Anonymous) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array: any[], comparator: (a: any, b: any) => number, query: string) {
  const stabilizedThis = array.map((el, index) => [el, index] as const);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  if (query) {
    return filter(
      array,
      (_product) => _product.order_id.toString().toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }

  return stabilizedThis.map((el) => el[0]);
}

// ----------------------------------------------------------------------

export default function EcommerceProductList() {
  const theme = useTheme();

  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [orderBy, setOrderBy] = useState('createdAt');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchOrders() {
      const orderList = await getOrders();
      setOrders(orderList);
      setIsLoading(false);
    }
    fetchOrders();
  }, []);

  const handleRequestSort = (property: string) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (filterName: string) => {
    setFilterName(filterName);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - orders.length) : 0;

  const filteredOrders = applySortFilter(orders, getComparator(order, orderBy), filterName);

  const isProductNotFound = filteredOrders.length === 0;

  return (
    <Page title="Ecommerce: Order History | CoopChick">
      <Container maxWidth={false}>
        <HeaderBreadcrumbs
          heading="Order History"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            {
              name: 'E-Commerce',
              href: PATH_DASHBOARD.eCommerce.root
            },
            { name: 'Order History' }
          ]}
        />

        <Card sx={{ py: 2 }}>
          <Grid container spacing={3}>
            {orders.map((order) => (
              <Grid key={order} item xs={12}>
                <OrderCard order={order} />
              </Grid>
            ))}
          </Grid>

          <TablePagination
            rowsPerPageOptions={[10, 20, 30]}
            component="div"
            count={orders.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(event, value) => setPage(value)}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </Page>
  );
}
