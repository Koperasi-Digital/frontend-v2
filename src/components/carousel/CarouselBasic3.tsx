import Slider from 'react-slick';
import { useRef } from 'react';
// material
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
// utils
import mockData from '../../utils/mock-data'; //
import { CarouselControlsPaging2, CarouselControlsArrowsBasic2 } from './controls';

// ----------------------------------------------------------------------

const MOCK_CAROUSELS = [...Array(5)].map((_, index) => ({
  id: mockData.id(index),
  title: mockData.text.title(index),
  image: mockData.image.feed(index),
  description: mockData.text.description(index)
}));

const RootStyle = styled(Box)(({ theme }) => ({
  position: 'relative',
  '& .slick-list': {
    boxShadow: theme.customShadows.z16,
    borderRadius: theme.shape.borderRadiusMd
  }
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
    <Box
      component="img"
      alt={title}
      src={image}
      sx={{ width: '100%', height: 480, objectFit: 'cover' }}
    />
  );
}

export default function CarouselBasic3() {
  const carouselRef = useRef<Slider | null>(null);

  const settings = {
    dots: true,
    arrows: false,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    ...CarouselControlsPaging2({
      sx: { mt: 3 }
    })
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
