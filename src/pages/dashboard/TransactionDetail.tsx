import React, { useState } from 'react';
import { Stack, Grid, Container, Typography, Button, Card, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import Page from '../../components/Page';
import { fCurrency } from '../../../src/utils/formatNumber';
import { fDate } from '../../../src/utils/formatTime';
import { AnalyticsOrderTimeline } from '../../components/_dashboard/general-analytics';
import { random, sample } from 'lodash';
import mockData from 'utils/mock-data';

const ProductImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute'
});

const transaction = {
  id: '12392831-128312-mm1245-2345',
  date: new Date(),
  cover: mockData.image.cover(1),
  product: 'Ayam Potong Merah',
  seller: 'Toko Ternak Ayam Sejahtera',
  quantity: random(10),
  total: random(10) * 1000,
  status: sample(['Completed', 'Delivered', 'Pending'])
};

export default function TransactionDetail() {
  console.log(transaction);
  const { id, date, cover, product, seller, quantity, total, status } = transaction;
  return (
    <Page title="Detail Transaction">
      <Container>
        <Typography variant="h4" sx={{ mb: 2 }}>
          Detail Transaction #1
        </Typography>
        <Grid container>
          <Grid item xs={12} md={4}>
            <Card sx={{ mx: 2, px: 2, py: 2, maxHeight: '300px' }}>
              <Box sx={{ pt: '100%', position: 'relative' }}>
                <ProductImgStyle alt={product} src={cover} />
              </Box>
            </Card>
          </Grid>
          <Grid item xs={12} md>
            <Card sx={{ mx: 2, px: 2, py: 2 }}>
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography variant="subtitle1">ID Transaksi</Typography>
                <Typography>{id}</Typography>
              </Stack>
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography variant="subtitle1">Tanggal Pemesanan</Typography>
                <Typography>{fDate(date)}</Typography>
              </Stack>
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography variant="subtitle1">Nama Produk</Typography>
                <Typography>{product}</Typography>
              </Stack>
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography variant="subtitle1">Nama Penjual</Typography>
                <Typography>{seller}</Typography>
              </Stack>
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography variant="subtitle1">Quantity</Typography>
                <Typography>{quantity}</Typography>
              </Stack>
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography variant="subtitle1">Total</Typography>
                <Typography>{fCurrency(total)}</Typography>
              </Stack>
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography variant="subtitle1">Status</Typography>
                <Typography>{status}</Typography>
              </Stack>
            </Card>
            <Card sx={{ mx: 2, px: 2, py: 2, my: 2 }}>
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography variant="subtitle1">Kurir</Typography>
                <Typography>{seller}</Typography>
              </Stack>
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography variant="subtitle1">No Resi</Typography>
                <Typography>{id}</Typography>
              </Stack>
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography variant="subtitle1">Alamat</Typography>
                <Typography>Jalan Ganesha No. 10 Bandung</Typography>
              </Stack>
            </Card>
            <Box sx={{ mx: 2, my: 2 }}>
              <AnalyticsOrderTimeline />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
