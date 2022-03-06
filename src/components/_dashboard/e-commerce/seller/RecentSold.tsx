import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Card, CardHeader, styled } from '@mui/material';
import mockData from 'utils/mock-data';
import { fDate, fTimestamp } from 'utils/formatTime';

function createData(
  image: string,
  name: string,
  category: string,
  date: Date,
  buyer: string,
  status: string
) {
  return { image, name, category, date, buyer, status };
}

const root = '/static/mock-images/products/';

const image_src = [
  root + 'product_1.jpg',
  root + 'product_2.jpg',
  root + 'product_3.jpg',
  root + 'product_4.jpg',
  root + 'product_5.jpg'
];

const rows = [
  createData(
    image_src[0],
    'Ayam Petelur Utuh',
    'Hewan',
    mockData.time(0),
    'Michael Hans',
    'Delivered'
  ),
  createData(
    image_src[1],
    'Ayam Petelur Utuh',
    'Hewan',
    mockData.time(1),
    'Michael Hans',
    'Delivered'
  ),
  createData(
    image_src[2],
    'Ayam Petelur Utuh',
    'Hewan',
    mockData.time(2),
    'Michael Hans',
    'Delivered'
  ),
  createData(
    image_src[3],
    'Ayam Petelur Utuh',
    'Hewan',
    mockData.time(3),
    'Michael Hans',
    'Delivered'
  ),
  createData(
    image_src[4],
    'Ayam Petelur Utuh',
    'Hewan',
    mockData.time(4),
    'Michael Hans',
    'Delivered'
  )
];

const ProductImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute'
});

export default function BasicTable() {
  return (
    <Card>
      <CardHeader title="Recent Sold" />
      <TableContainer component={Paper} sx={{ mx: 1, py: 2, px: 2, my: 1 }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right">Image</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Category</TableCell>
              <TableCell align="right">Date</TableCell>
              <TableCell align="right">Time</TableCell>
              <TableCell align="right">Buyer</TableCell>
              <TableCell align="right">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  <Box sx={{ pt: '100%', position: 'relative' }}>
                    <ProductImgStyle src={row.image} />
                  </Box>
                </TableCell>
                <TableCell align="right">{row.name}</TableCell>
                <TableCell align="right">{row.category}</TableCell>
                <TableCell align="right">{fDate(row.date)}</TableCell>
                <TableCell align="right">{fTimestamp(row.date)}</TableCell>
                <TableCell align="right">{row.buyer}</TableCell>
                <TableCell align="right">{row.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
}
