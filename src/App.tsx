import { useEffect, useState } from 'react';
import { Swiper } from 'swiper';
import Radio from './components/Radio';
import InputItem from './components/InputItem';
import useForm from './hooks/useForm';
import { defaultState, inputEducations, inputFirm } from './components/formDefaultState'
function App() {
  const [swipperState, setSwipperState] = useState<Swiper | null>(null)
  const {
    allState,
    updateStateItem
  } = useForm(defaultState)


  const [activSlide, setActivSlide] = useState('city')


  const updateActivSlide = () => {
    switch (activSlide) {
      case 'city':
        if (allState.city.length > 2) {
          swipperState?.slideNext()
          setActivSlide('age')
        }
        break;

      case 'age': 
        if (/^[0-9]+$/.test(String(allState.age))) {
          swipperState?.slideNext()
          allState.age > 20 ? setActivSlide('firm') : setActivSlide('education')
        }
        break;

      case 'education':
        const educationKeys = ['educationName', 'educationStart',] as Array<keyof typeof allState>
        if ((allState.educationNow || allState.educationEnd) && educationKeys.every(educationItem => String(allState[educationItem]).length > 0)) {
          setActivSlide('name')
          swipperState?.slideNext()
        }
        break;

      case 'firm':
        const firmKeys = ['firmName', 'firmStart',] as Array<keyof typeof allState>
        if ((allState.firmNow || allState.firmEnd) && firmKeys.every(firmKey => String(allState[firmKey]).length > 0)) {
          setActivSlide('name')
          swipperState?.slideNext()
        }
        break;

      case 'name':
        if (allState.fullName.length > 0 && allState.phone.length > 0) {
          setActivSlide('result')
          swipperState?.slideNext()
          fetch('/back', {
            method: 'POST',
            headers: {
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

  useEffect(() => {

    setSwipperState(new Swiper('.swiper', {
      speed: 400,
      spaceBetween: 100,
      allowTouchMove: false
    }))
  }, [])

  return (
    <div className="App">
      <div className='wrapper'>
        <div className="swiper">
          <div className="swiper-wrapper">
            <div className="swiper-slide">
              <Radio options={cityOptions} radioUpdate={(text: string) => updateStateItem('city', text)} />
            </div>
            <div className="swiper-slide">
              <Radio options={ageOptions} radioUpdate={(text: string) => updateStateItem('age', text)} />
            </div>
            {
              activSlide === 'education' ? <div className="swiper-slide">
                {
                  inputEducations.map(educationItem =>
                    <InputItem
                      type={educationItem.type}
                      key={educationItem.key}
                      onChange={(text: string) => updateStateItem(educationItem.key, text)} label={educationItem.label} />
                  )
                }
              </div> : <div className="swiper-slide">
                {
                  inputFirm.map(firmItem =>
                    <InputItem
                      key={firmItem.key}
                      onChange={(text: string) => updateStateItem(firmItem.key, text)}
                      type={firmItem.type} label={firmItem.label} />
                  )
                }
              </div>
            }



            <div className="swiper-slide">
              <InputItem onChange={(text: string) => updateStateItem('fullName', text)} label='Ваше имя' />
              <InputItem onChange={(text: string) => updateStateItem('phone', text)} label='Ваш телефон' />
            </div>
            <div className='swiper-slide'>
                <p>Спасибо!!!!!!!!</p>
            </div>
          </div>
          {
            activSlide !== 'result' 
            &&  
            <button onClick={() => swipperState?.slidePrev()} className="swiper-button-prev">Назад</button>
          }
          <button onClick={() => updateActivSlide()} className="swiper-button-next">Далее</button>

        </div>
      </div>
    </div>
    // <div className="App">
    //   <div className='wrapper'>

    //     <Swiper
    //       spaceBetween={50}
    //       slidesPerView={1}
    //       allowTouchMove={false}>

    //       <SwiperSlide>
    //         <Radio options={cityOptions} radioUpdate={(text: string) => updateStateItem('city', text)} />
    //       </SwiperSlide>

    //       <SwiperSlide>
    //         <Radio options={ageOptions} radioUpdate={(text: string) => updateStateItem('age', text)} />
    //       </SwiperSlide>
    //       {
    //         allState.age > 20 ?
    //           <SwiperSlide>
    //             {
    //               inputFirm.map(firmItem =>
    //                 <InputItem
    //                   key={firmItem.key}
    //                   onChange={(text: string) => updateStateItem(firmItem.key, text)}
    //                   type={firmItem.type} label={firmItem.label} />
    //               )
    //             }
    //           </SwiperSlide>
    //           :
    //           <SwiperSlide>
    //             {
    //               inputEducations.map(educationItem =>
    //                 <InputItem
    //                   type={educationItem.type}
    //                   key={educationItem.key}
    //                   onChange={(text: string) => updateStateItem(educationItem.key, text)} label={educationItem.label} />
    //               )
    //             }
    //           </SwiperSlide>

    //       }
    //       <SwiperSlide>
    //         <InputItem onChange={(text: string) => updateStateItem('fullName', text)} label='Ваше имя' />
    //         <InputItem onChange={(text: string) => updateStateItem('phone', text)} label='Ваш телефон' />
    //       </SwiperSlide>

    //       <SwiperSlide>Спасибо за заявку</SwiperSlide>

    //       <SlideNextButton updateActivSlide={updateActivSlide} slideActive={activSlide} />
    //       {
    //         activSlide == 4 ? '' : <SlidePrefButton updateActivSlide={(indxSlide: number) => setActivSlide(indxSlide)} />
    //       }
    //     </Swiper>
    //   </div>
    // </div>
  );
}

export default App;
