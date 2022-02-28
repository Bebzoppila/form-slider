import { FC } from 'react';
import { useSwiper } from 'swiper/react';
type SlidePrefButtonProps = {
  updateActivSlide: (indxSlide: number) => void
}

const SlidePrefButton:FC<SlidePrefButtonProps> = ({updateActivSlide}) => {
  const swiper = useSwiper();

  const onSliderPref = () => {
    updateActivSlide(swiper.realIndex - 1)
  }

  return (
    <button onClick={() => onSliderPref()}>Предыдущий слайд</button>
  );
}

export default SlidePrefButton