import Slider from 'react-slick';
import { useRef } from 'react';
import { Icon } from '@iconify/react';
import { Link as RouterLink } from 'react-router-dom';
import arrowForwardFill from '@iconify/icons-eva/arrow-forward-fill';
// material
import { alpha, styled } from '@mui/material/styles';
import { Box, Paper, Link, Typography, CardContent } from '@mui/material';
// utils
import mockData from '../../utils/mock-data'; //
import { CarouselControlsArrowsBasic2 } from './controls';

// ----------------------------------------------------------------------

const MOCK_CAROUSELS = [...Array(5)].map((_, index) => ({
  id: mockData.id(index),
  title: mockData.text.title(index),
  image: mockData.image.feed(index),
  description: mockData.text.description(index)
}));

const RootStyle = styled(Box)(({ theme }) => ({
  overflow: 'hidden',
  position: 'relative',
  '&:before, &:after': {
    top: 0,
    left: 0,
    zIndex: 8,
    width: 48,
    content: "''",
    height: '100%',
    display: 'none',
    position: 'absolute',
    backgroundImage: 'linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)',
    [theme.breakpoints.up(480)]: {
      display: 'block'
    }
  },
  '&:after': {
    right: 0,
    left: 'auto',
    transform: 'scaleX(-1)'
  }
}));

const CarouselImgStyle = styled('img')(({ theme }) => ({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
  transition: theme.transitions.create('all')
}));

// ----------------------------------------------------------------------

type CarouselItemProps = {
  title: string;
  description: string;
  image: string;
};

function CarouselItem({ item }: { item: CarouselItemProps }) {
  const { image, title } = item;

  return (
    <Paper
      sx={{
        mx: 1,
        borderRadius: 2,
        overflow: 'hidden',
        paddingTop: 'calc(16 /9 * 100%)',
        position: 'relative',
        '&:hover img': {
          width: '120%',
          height: '120%'
        }
      }}
    >
      <CarouselImgStyle alt={title} src={image} />
      <CardContent
        sx={{
          bottom: 0,
          zIndex: 9,
          width: '100%',
          textAlign: 'left',
          position: 'absolute',
          color: 'common.white',
          backgroundImage: (theme) =>
            `linear-gradient(to top, ${theme.palette.grey[900]} 0%,${alpha(
              theme.palette.grey[900],
              0
            )} 100%)`
        }}
      >
        <Typography variant="h4" paragraph>
          {title}
        </Typography>
        <Link
          to="#"
          color="inherit"
          variant="overline"
          component={RouterLink}
          sx={{
            opacity: 0.72,
            alignItems: 'center',
            display: 'inline-flex',
            transition: (theme) => theme.transitions.create('opacity'),
            '&:hover': { opacity: 1 }
          }}
        >
          learn More
          <Box component={Icon} icon={arrowForwardFill} sx={{ width: 16, height: 16, ml: 1 }} />
        </Link>
      </CardContent>
    </Paper>
  );
}

export default function CarouselCenterMode() {
  const carouselRef = useRef<Slider | null>(null);

  const settings = {
    slidesToShow: 3,
    centerMode: true,
    centerPadding: '60px',
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 }
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 2 }
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1, centerPadding: '0' }
      }
    ]
  };

  const handlePrevious = () => {
    carouselRef.current?.slickPrev();
  };

  const handleNext = () => {
    carouselRef.current?.slickNext();
  };

  return (
    <RootStyle>
      <Slider ref={carouselRef} {...settings}>
        {MOCK_CAROUSELS.map((item) => (
          <CarouselItem key={item.id} item={item} />
        ))}
      </Slider>
      <CarouselControlsArrowsBasic2 onNext={handleNext} onPrevious={handlePrevious} />
    </RootStyle>
  );
}
