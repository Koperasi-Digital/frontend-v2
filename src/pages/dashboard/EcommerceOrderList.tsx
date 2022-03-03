import { filter } from 'lodash';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { paramCase, sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
// material
import { useTheme, styled } from '@mui/material/styles';
import {
  Box,
  Card,
  Table,
  TableRow,
  Checkbox,
  TableBody,
  TableCell,
  Container,
  IconButton,
  Typography,
  TableContainer,
  TablePagination
} from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getProducts } from '../../redux/slices/product';
// utils
import { fCurrency } from '../../utils/formatNumber';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// @types
import { Product, ProductState } from '../../@types/products';
// components
import Page from '../../components/Page';
import Label from '../../components/Label';
import Scrollbar from '../../components/Scrollbar';
import SearchNotFound from '../../components/SearchNotFound';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import {
  ProductListHead,
  ProductListToolbar
} from '../../components/_dashboard/e-commerce/product-list';
import getOrders from 'utils/orders';
import { fDate, fDateTime } from 'utils/formatTime';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
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
      (_product) => _product.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }

  return stabilizedThis.map((el) => el[0]);
}

// ----------------------------------------------------------------------

export default function EcommerceProductList() {
  const theme = useTheme();
  const dispatch = useDispatch();

  const linkTo = `${PATH_DASHBOARD.eCommerce.root}/order/`;
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [selected, setSelected] = useState<string[]>([]);
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

  const handleSelectAllClick = (checked: boolean) => {
    // if (checked) {
    //   const selected = orders.map((n) => n.product_name);
    //   setSelected(selected);
    //   return;
    // }
    setSelected([]);
  };

  const handleClick = (name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: string[] = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
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

  const isProductNotFound = orders.length === 0;

  return (
    <Page title="Ecommerce: Order List | CoopChick">
      <Container maxWidth={false}>
        <HeaderBreadcrumbs
          heading="Order List"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            {
              name: 'E-Commerce',
              href: PATH_DASHBOARD.eCommerce.root
            },
            { name: 'Order List' }
          ]}
        />

        <Card>
          <ProductListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <ProductListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={orders.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {!isLoading &&
                    filteredOrders
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row, index) => {
                        const {
                          order_id,
                          user_name,
                          timestamp,
                          product_name,
                          cover,
                          product_price,
                          quantity,
                          subtotal,
                          status
                        } = row;

                        const isItemSelected = selected.indexOf(product_name) !== -1;

                        return (
                          <TableRow
                            hover
                            key={order_id}
                            tabIndex={-1}
                            role="checkbox"
                            selected={isItemSelected}
                            aria-checked={isItemSelected}
                            onClick={() => handleClick(user_name)}
                          >
                            <TableCell padding="checkbox">
                              <Checkbox checked={isItemSelected} />
                            </TableCell>
                            <TableCell component="th" scope="row" padding="none">
                              <Box
                                sx={{
                                  py: 2,
                                  display: 'flex',
                                  alignItems: 'center'
                                }}
                              >
                                <ThumbImgStyle alt={product_name} src={cover} />
                                <Typography variant="subtitle2" noWrap>
                                  {product_name}
                                </Typography>
                              </Box>
                            </TableCell>
                            <TableCell style={{ minWidth: 100 }}>{user_name}</TableCell>
                            <TableCell style={{ minWidth: 100 }}>{fDateTime(timestamp)}</TableCell>
                            <TableCell style={{ minWidth: 60 }}>{quantity}</TableCell>
                            <TableCell style={{ minWidth: 100 }}>{fCurrency(subtotal)}</TableCell>
                            <TableCell style={{ minWidth: 100 }}>
                              <Label
                                variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                                color={(status === 'Dalam Pengiriman' && 'warning') || 'success'}
                              >
                                {status ? sentenceCase(status) : ''}
                              </Label>
                            </TableCell>
                            <TableCell align="right">
                              <IconButton>
                                <Link
                                  to={linkTo + paramCase(product_name) + '/edit'}
                                  color="inherit"
                                >
                                  <Icon icon={moreVerticalFill} width={20} height={20} />
                                </Link>
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
                {isProductNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6}>
                        <Box sx={{ py: 3 }}>
                          <SearchNotFound searchQuery={filterName} />
                        </Box>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

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
