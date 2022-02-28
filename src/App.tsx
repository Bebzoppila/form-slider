import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import Radio from './components/Radio';
import SlideNextButton from './components/SlideNextButton';
import InputItem from './components/InputItem';
import useForm from './hooks/useForm';
import SlidePrefButton from './components/SlidePrefButton';
import { defaultState, inputEducations, inputFirm } from './components/formDefaultState'
function App() {

  const {
    allState,
    updateStateItem
  } = useForm(defaultState)


  const [activSlide, setActivSlide] = useState(0)


  const updateActivSlide = () => {
    switch (activSlide) {

      case 0:
        if (allState.city.length > 2) {
          setActivSlide(1)
        }
        break;

      case 1:
        if (/^[0-9]+$/.test(String(allState.age))) {
          allState.age < 20 ? setActivSlide(2) : setActivSlide(3)
        }
        break;

      case 2:
        const educationKeys = ['educationName', 'educationStart',] as Array<keyof typeof allState>
        if ((allState.educationNow || allState.educationEnd) && educationKeys.every(educationItem => String(allState[educationItem]).length > 0)) {
          setActivSlide(4)
        }
        break;

      case 3:
        const firmKeys = ['firmName', 'firmStart',] as Array<keyof typeof allState>
        if ((allState.firmNow || allState.firmEnd) && firmKeys.every(firmKey => String(allState[firmKey]).length > 0)) {
          setActivSlide(4)
        }
        break;

      case 4:
        if (allState.fullName.length > 0 && allState.phone.length > 0) {
          setActivSlide(5)
          fetch('/back', {
            method: 'POST',
            headers:{
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(allState)
          })
        }
        break;
    }

  }


  const cityOptions = ['Москва', 'Питер', 'Ростов']

  const ageOptions = ['16', '17', '18']

  return (
    <div className="App">
      <div className='wrapper'>

        <Swiper
          spaceBetween={50}
          slidesPerView={1}
          allowTouchMove={false}>

          <SwiperSlide>
            <Radio options={cityOptions} radioUpdate={(text: string) => updateStateItem('city', text)} />
          </SwiperSlide>

          <SwiperSlide>
            <Radio options={ageOptions} radioUpdate={(text: string) => updateStateItem('age', text)} />
          </SwiperSlide>

          <SwiperSlide>
            {
              inputEducations.map(educationItem =>
                <InputItem
                  type={educationItem.type}
                  key={educationItem.key}
                  onChange={(text: string) => updateStateItem(educationItem.key, text)} label={educationItem.label} />
              )
            }
          </SwiperSlide>

          <SwiperSlide>
            {
              inputFirm.map(firmItem =>
                <InputItem
                  key={firmItem.key}
                  onChange={(text: string) => updateStateItem(firmItem.key, text)}
                  type={firmItem.type} label={firmItem.label} />
              )
            }
          </SwiperSlide>

          <SwiperSlide>
            <InputItem onChange={(text: string) => updateStateItem('fullName', text)} label='Ваше имя' />
            <InputItem onChange={(text: string) => updateStateItem('phone', text)} label='Ваш телефон' />
          </SwiperSlide>

          <SwiperSlide>Спасибо за заявку</SwiperSlide>

          <SlideNextButton updateActivSlide={updateActivSlide} slideActive={activSlide} />
          {
            activSlide == 5 ? '' : <SlidePrefButton updateActivSlide={(indxSlide: number) => setActivSlide(indxSlide)} />
          }
        </Swiper>
      </div>
    </div>
  );
}

export default App;
