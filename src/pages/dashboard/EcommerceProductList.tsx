import { filter } from 'lodash';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { paramCase, sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
import editFill from '@iconify/icons-eva/edit-fill';
import trash2Fill from '@iconify/icons-eva/trash-2-fill';
// material
import { useTheme, styled } from '@mui/material/styles';
import {
  Box,
  Card,
  DialogTitle,
  DialogContent,
  Table,
  TableRow,
  TableBody,
  TableCell,
  Container,
  IconButton,
  Typography,
  TableContainer,
  TablePagination,
  Button
} from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { deleteProduct, getProductsBySeller } from '../../redux/slices/product';
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
import useAuth from 'hooks/useAuth';
import { DialogAnimate } from '../../components/animate';
import { useSnackbar } from 'notistack';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Produk', alignRight: false },
  { id: 'sku', label: 'SKU', alignRight: false },
  { id: 'available', label: 'Persediaan', alignRight: false },
  { id: 'price', label: 'Harga Jual', alignRight: false },
  { id: 'productionCost', label: 'Harga Beli', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: '' }
];

const ThumbImgStyle = styled('img')(({ theme }) => ({
  width: 64,
  height: 64,
  objectFit: 'cover',
  margin: theme.spacing(0, 2),
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

function applySortFilter(array: Product[], comparator: (a: any, b: any) => number, query: string) {
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

  const linkTo = `${PATH_DASHBOARD.eCommerce.seller.root}/product/`;
  const { products } = useSelector((state: { product: ProductState }) => state.product);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [orderBy, setOrderBy] = useState('created_at');
  const [isOpenModalDeleteProduct, setIsOpenModalDeleteProduct] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<string>('');
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useAuth();

  const handleOpenModalDeleteProduct = (value: string) => {
    setSelectedProduct(value);
    setIsOpenModalDeleteProduct(!isOpenModalDeleteProduct);
  };

  const handleDeleteProduct = async () => {
    setIsOpenModalDeleteProduct(!isOpenModalDeleteProduct);
    try {
      await dispatch(deleteProduct(selectedProduct));
      await dispatch(getProductsBySeller(user?.id));
      enqueueSnackbar(`Produk berhasil dihapus`, { variant: 'success' });
    } catch (err) {
      enqueueSnackbar(`Gagal menghapus Produk, mohon dicoba lagi!`, { variant: 'error' });
    }
  };

  useEffect(() => {
    dispatch(getProductsBySeller(user?.id));
  }, [dispatch, user]);

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

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - products.length) : 0;

  const filteredProducts = applySortFilter(products, getComparator(order, orderBy), filterName);

  const isProductNotFound = filteredProducts.length === 0;

  return (
    <Page title="Ecommerce: Product List | CoopChick">
      <Container maxWidth={false}>
        <HeaderBreadcrumbs
          heading="Product List"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            {
              name: 'Seller Center',
              href: PATH_DASHBOARD.eCommerce.seller.root
            },
            { name: 'Product List' }
          ]}
        />

        <Card>
          <ProductListToolbar filterName={filterName} onFilterName={handleFilterByName} />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <ProductListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  onRequestSort={handleRequestSort}
                />
                <TableBody>
                  {filteredProducts
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      const { id, name, cover, price, productionCost, sku, available, status } =
                        row;

                      return (
                        <TableRow hover key={id} tabIndex={-1}>
                          <TableCell component="th" scope="row" padding="none">
                            <Box
                              sx={{
                                py: 2,
                                display: 'flex',
                                alignItems: 'center'
                              }}
                            >
                              <ThumbImgStyle alt={name} src={cover} />
                              <Typography variant="subtitle2" noWrap>
                                {name}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell style={{ minWidth: 100 }}>{sku}</TableCell>
                          <TableCell style={{ minWidth: 100 }}>{available}</TableCell>
                          <TableCell style={{ minWidth: 120 }}>{fCurrency(price)}</TableCell>
                          <TableCell style={{ minWidth: 120 }}>
                            {fCurrency(productionCost)}
                          </TableCell>
                          <TableCell style={{ minWidth: 100 }}>
                            <Label
                              variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                              color={
                                (status === 'Inactive' && 'error') ||
                                (status === 'Low Stock' && 'warning') ||
                                'success'
                              }
                            >
                              {status ? sentenceCase(status) : ''}
                            </Label>
                          </TableCell>
                          <TableCell align="right">
                            <IconButton>
                              <Link
                                to={linkTo + paramCase(id.toString()) + '/edit'}
                                color="inherit"
                              >
                                <Icon icon={editFill} width={20} height={20} />
                              </Link>
                            </IconButton>
                            <IconButton>
                              <Icon
                                icon={trash2Fill}
                                width={20}
                                height={20}
                                onClick={() => handleOpenModalDeleteProduct(id)}
                              />
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
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={products.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(event, value) => setPage(value)}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
          <DialogAnimate
            open={isOpenModalDeleteProduct}
            onClose={() => setIsOpenModalDeleteProduct(!isOpenModalDeleteProduct)}
          >
            <DialogTitle sx={{ pb: 1 }}>Hapus Produk ?</DialogTitle>
            <DialogContent sx={{ overflowY: 'unset' }}>
              <Typography align={'justify'}>
                Produk yang sudah dihapus akan hilang selamanya! Apakah anda tetap ingin menghapus
                produk ini?
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-around',
                  p: 1.5
                }}
              >
                <Button variant="contained" onClick={() => handleDeleteProduct()}>
                  Hapus
                </Button>
                <Button
                  color="error"
                  variant="contained"
                  onClick={() => setIsOpenModalDeleteProduct(!isOpenModalDeleteProduct)}
                >
                  Batal
                </Button>
              </Box>
            </DialogContent>
          </DialogAnimate>
        </Card>
      </Container>
    </Page>
  );
}
