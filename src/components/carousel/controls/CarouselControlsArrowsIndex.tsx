import { Icon } from '@iconify/react';
import arrowLeftFill from '@iconify/icons-eva/arrow-left-fill';
import arrowRightFill from '@iconify/icons-eva/arrow-right-fill';
import roundKeyboardArrowLeft from '@iconify/icons-ic/round-keyboard-arrow-left';
import roundKeyboardArrowRight from '@iconify/icons-ic/round-keyboard-arrow-right';
// material
import { alpha, styled } from '@mui/material/styles';
import { Typography, Box, BoxProps } from '@mui/material';
//
import { MIconButton } from '../../@material-extend';

// ----------------------------------------------------------------------

const ICON_SIZE = {
  width: 20,
  height: 20
};

const RootStyle = styled(Box)(({ theme }) => ({
  zIndex: 9,
  display: 'flex',
  alignItems: 'center',
  position: 'absolute',
  bottom: theme.spacing(2),
  right: theme.spacing(2),
  color: theme.palette.common.white,
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.grey[900], 0.48)
}));

const ArrowStyle = styled(MIconButton)(({ theme }) => ({
  padding: 6,
  opacity: 0.48,
  color: theme.palette.common.white,
  '&:hover': { opacity: 1 }
}));

// ----------------------------------------------------------------------

interface CarouselControlsArrowsIndexProps extends BoxProps {
  arrowLine?: boolean;
  index: number;
  total: number;
  onNext?: VoidFunction;
  onPrevious?: VoidFunction;
}

export default function CarouselControlsArrowsIndex({
  arrowLine,
  index,
  total,
  onNext,
  onPrevious,
  ...other
}: CarouselControlsArrowsIndexProps) {
  return (
    <RootStyle {...other}>
      <ArrowStyle size="small" onClick={onPrevious}>
        {arrowLine ? (
          <Icon icon={roundKeyboardArrowLeft} {...ICON_SIZE} />
        ) : (
          <Icon icon={arrowLeftFill} {...ICON_SIZE} />
        )}
      </ArrowStyle>

      <Typography variant="subtitle2">
        {index + 1}/{total}
      </Typography>

      <ArrowStyle size="small" onClick={onNext}>
        {arrowLine ? (
          <Icon icon={roundKeyboardArrowRight} {...ICON_SIZE} />
        ) : (
          <Icon icon={arrowRightFill} {...ICON_SIZE} />
        )}
      </ArrowStyle>
    </RootStyle>
  );
}
