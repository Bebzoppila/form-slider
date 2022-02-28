import { FC, useEffect } from 'react';
import { useSwiper } from 'swiper/react';

type SlideNextButtonProps = {
  slideActive: number,
  updateActivSlide: () => void
}
const SlideNextButton:FC<SlideNextButtonProps> = ({slideActive, updateActivSlide}) => {
  const swiper = useSwiper();

  const goToNextSlide = () => {
    // swiper.slideTo(slideActive)
    updateActivSlide()
  }

  useEffect(() => {
    swiper.slideTo(slideActive)
  },[slideActive])

  return (
    <button onClick={() => goToNextSlide()}>Следующий слайд</button>
  );
}
export default SlideNextButton