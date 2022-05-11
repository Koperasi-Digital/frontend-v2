import { filter } from 'lodash';
import { Icon } from '@iconify/react';
import roundClearAll from '@iconify/icons-ic/round-clear-all';
// material
import { styled } from '@mui/material/styles';
import { Chip, Typography, Stack, Button } from '@mui/material';
//
import { ProductFilter, FormikPropsShopView } from '../../../../@types/products';

// ----------------------------------------------------------------------

const RootStyle = styled('div')({
  flexGrow: 1,
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center'
});

const WrapperStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  overflow: 'hidden',
  alignItems: 'stretch',
  margin: theme.spacing(0.5),
  borderRadius: theme.shape.borderRadius,
  border: `solid 1px ${theme.palette.divider}`
}));

const LabelStyle = styled((props) => (
  <Typography component="span" variant="subtitle2" {...props} />
))(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  color: theme.palette.text.secondary,
  backgroundColor: theme.palette.background.neutral,
  borderRight: `solid 1px ${theme.palette.divider}`
}));

// ----------------------------------------------------------------------

function labelPriceRange(range: string) {
  if (range === 'below') {
    return '< Rp 50.000';
  }
  if (range === 'between') {
    return 'Rp 50.000 - Rp 100.000';
  }
  return '> Rp 100.000';
}

type ShopTagFilteredProps = {
  formik: FormikPropsShopView;
  filters: ProductFilter;
  isShowReset: boolean;
  isDefault: boolean;
  onResetFilter: VoidFunction;
};

export default function ShopTagFiltered({
  formik,
  filters,
  isShowReset,
  onResetFilter,
  isDefault
}: ShopTagFilteredProps) {
  const { values, handleSubmit, setFieldValue, initialValues } = formik;
  const { city, category, priceRange } = filters;
  const isShow = values !== initialValues && !isShowReset;

  const handleRemoveGender = (value: string) => {
    const newValue = filter(city, (_item) => _item !== value);
    handleSubmit();
    setFieldValue('city', newValue);
  };

  const handleRemoveCategory = () => {
    handleSubmit();
    setFieldValue('category', '');
  };

  const handleRemovePrice = () => {
    handleSubmit();
    setFieldValue('priceRange', '');
  };

  return (
    <RootStyle>
      {city.length > 0 && (
        <WrapperStyle>
          <LabelStyle>Kota:</LabelStyle>
          <Stack direction="row" flexWrap="wrap" sx={{ p: 0.75 }}>
            {city.map((_city) => (
              <Chip
                key={_city}
                label={_city}
                size="small"
                onDelete={() => handleRemoveGender(_city)}
                sx={{ m: 0.5 }}
              />
            ))}
          </Stack>
        </WrapperStyle>
      )}

      {category !== '' && (
        <WrapperStyle>
          <LabelStyle>Kategori:</LabelStyle>
          <Stack direction="row" flexWrap="wrap" sx={{ p: 0.75 }}>
            <Chip size="small" label={category} onDelete={handleRemoveCategory} sx={{ m: 0.5 }} />
          </Stack>
        </WrapperStyle>
      )}

      {priceRange && (
        <WrapperStyle>
          <LabelStyle>Harga:</LabelStyle>
          <Stack direction="row" flexWrap="wrap" sx={{ p: 0.75 }}>
            <Chip
              size="small"
              label={labelPriceRange(priceRange)}
              onDelete={handleRemovePrice}
              sx={{ m: 0.5 }}
            />
          </Stack>
        </WrapperStyle>
      )}

      {isShow && !isDefault && (
        <Button
          color="error"
          size="small"
          type="button"
          onClick={onResetFilter}
          startIcon={<Icon icon={roundClearAll} />}
        >
          Clear All
        </Button>
      )}
    </RootStyle>
  );
}
