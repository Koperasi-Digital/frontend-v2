import { Icon } from '@iconify/react';
import { Form, FormikProvider } from 'formik';
import closeFill from '@iconify/icons-eva/close-fill';
import roundClearAll from '@iconify/icons-ic/round-clear-all';
import roundFilterList from '@iconify/icons-ic/round-filter-list';
// material
import {
  Box,
  Radio,
  Stack,
  Button,
  Drawer,
  Divider,
  Checkbox,
  FormGroup,
  Typography,
  RadioGroup,
  FormControlLabel
} from '@mui/material';
// @types
import { FormikPropsShopView } from '../../../../@types/products';
//
import { MIconButton } from '../../../@material-extend';
import Scrollbar from '../../../Scrollbar';

// ----------------------------------------------------------------------

export const FILTER_GENDER_OPTIONS = ['Bandung', 'Jakarta', 'Surabaya', 'Pati', 'Semarang'];
export const FILTER_CATEGORY_OPTIONS = ['Ayam', 'Pakan', 'Infrastruktur'];
export const FILTER_PRICE_OPTIONS = [
  { value: '1', label: '< Rp 50.000' },
  { value: '2', label: 'Rp 50.000 - Rp 100.000' },
  { value: '3', label: '> Rp 100.000' }
];

// ----------------------------------------------------------------------

type ShopFilterSidebarProps = {
  onResetFilter: VoidFunction;
  onOpenFilter: VoidFunction;
  onCloseFilter: VoidFunction;
  isOpenFilter: boolean;
  formik: FormikPropsShopView;
};

export default function ShopFilterSidebar({
  isOpenFilter,
  onResetFilter,
  onOpenFilter,
  onCloseFilter,
  formik
}: ShopFilterSidebarProps) {
  const { values, getFieldProps } = formik;

  return (
    <>
      <Button
        disableRipple
        color="inherit"
        endIcon={<Icon icon={roundFilterList} />}
        onClick={onOpenFilter}
      >
        Filters&nbsp;
      </Button>

      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate>
          <Drawer
            anchor="right"
            open={isOpenFilter}
            onClose={onCloseFilter}
            PaperProps={{
              sx: { width: 280, border: 'none', overflow: 'hidden' }
            }}
          >
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{ px: 1, py: 2 }}
            >
              <Typography variant="subtitle1" sx={{ ml: 1 }}>
                Filters
              </Typography>
              <MIconButton onClick={onCloseFilter}>
                <Icon icon={closeFill} width={20} height={20} />
              </MIconButton>
            </Stack>

            <Divider />

            <Scrollbar>
              <Stack spacing={3} sx={{ p: 3 }}>
                <div>
                  <Typography variant="subtitle1" gutterBottom>
                    Kota
                  </Typography>
                  <FormGroup>
                    {FILTER_GENDER_OPTIONS.map((item) => (
                      <FormControlLabel
                        key={item}
                        control={
                          <Checkbox
                            {...getFieldProps('city')}
                            value={item}
                            checked={values.city.includes(item)}
                          />
                        }
                        label={item}
                      />
                    ))}
                  </FormGroup>
                </div>

                <div>
                  <Typography variant="subtitle1" gutterBottom>
                    Kategori
                  </Typography>
                  <RadioGroup {...getFieldProps('category')}>
                    {FILTER_CATEGORY_OPTIONS.map((item) => (
                      <FormControlLabel key={item} value={item} control={<Radio />} label={item} />
                    ))}
                  </RadioGroup>
                </div>

                <div>
                  <Typography variant="subtitle1" gutterBottom>
                    Harga
                  </Typography>
                  <RadioGroup {...getFieldProps('priceRange')}>
                    {FILTER_PRICE_OPTIONS.map((item) => (
                      <FormControlLabel
                        key={item.value}
                        value={item.value}
                        control={<Radio />}
                        label={item.label}
                      />
                    ))}
                  </RadioGroup>
                </div>
              </Stack>
            </Scrollbar>

            <Box sx={{ p: 3 }}>
              <Button
                fullWidth
                size="large"
                type="submit"
                color="inherit"
                variant="outlined"
                onClick={onResetFilter}
                startIcon={<Icon icon={roundClearAll} />}
              >
                Clear All
              </Button>
            </Box>
          </Drawer>
        </Form>
      </FormikProvider>
    </>
  );
}
