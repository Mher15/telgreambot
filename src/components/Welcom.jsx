import React, { useEffect, useState } from 'react'
import Beck from './Beck'
import Continue from './Continue'
import '../styles/welcome.css'
import Animation from './commands/Animation'
import StepRow from './StepRow'
import GeneralInfo from './GeneralInfo.jsx'
import Popaps from './Popaps.jsx'
import Health from './Health.jsx'
import Purpose from './Purpose.jsx'
import Preferences from './Preferences.jsx'
import Done from './Done.jsx'
import Statistic from './Statistic.jsx'
import StressAndLifeStyle from './StressAndLifeStyle.jsx'

const Welcom = () => {
  const [step, setStep] = useState(1)
  const [showpopUp1, setShowpopUp1] = useState(false)
  const [showpopUp2, setShowpopUp2] = useState(false)
  const [showpopUp3, setShowpopUp3] = useState(false)
  const [test, setTest] = useState(null)
  const [initData, setInitData] = useState(null)
// 963717429
 useEffect(() => {
   const initTelegram = () => {
     if (typeof window.Telegram !== 'undefined' && typeof window.Telegram.WebApp !== 'undefined') {
       window.Telegram.WebApp.expand();
       let initData = window.Telegram.WebApp.initData || '';
       setInitData(initData)
       let initDataUnsafe = window.Telegram.WebApp.initDataUnsafe || {};
       window.Telegram.WebApp.setBackgroundColor('#EFEEF4');
       window.Telegram.WebApp.ready();
       setTest(initDataUnsafe);
     }
   };

   // Check if the Telegram Web Apps API script is loaded
   if (typeof window.Telegram === 'undefined') {
     // Wait for the script to load
     const script = document.createElement('script');
     script.src = 'https://telegram.org/js/telegram-web-app.js';
     script.onload = initTelegram;
     document.head.appendChild(script);
   } else {
     initTelegram();
   }
 }, []);


  const onClickNextStep = ()=>{
    setStep(step + 1)
  }
  const onClickBeckStep = () => {
    setStep(step - 1)
  }

  const openPopupButton1 = () =>{
    setShowpopUp1(!showpopUp1)
  }
  const openPopupButton2 = () => {
    setShowpopUp2(!showpopUp2)
  }
  const openPopupButton3 = () => {
    setShowpopUp3(!showpopUp3)
  }
  
  const cloasePop = () => {
      setShowpopUp1(false)
      setShowpopUp2(false)
      setShowpopUp3(false)
  }


  const showContetn = ()=>{
        if (step === 1) {
    return (
      <>
      <div className="sliderTitle">
              {test ? (
        <div>
          <p>User ID: {test.user?.id}</p>
          <p>User{initData}</p>
          <p>Username: {test.user?.username}</p>
          <p>First Name: {test.user?.first_name}</p>
          <p>Last Name: {test.user?.last_name}</p>
        </div>
      ) : (
        <p>Loading user information...</p>
      )}

          <h1 className="greeting">Добро</h1>
          <h1 className="greeting">пожаловать</h1>
          <h2 className="under_greeting">Это <span
              className = 'purple_text'>EatSmart</span>,
          твой личный ИИ-гуру питания</h2>
      </div>
       <Animation / >
      </>)
    }
    else if(step === 2){
      return (
      <>
        <StepRow step={step} />
        <GeneralInfo 
        openPopupButton1={openPopupButton1} 
        openPopupButton2={openPopupButton2} 
        openPopupButton3={openPopupButton3} />
      </>
     )
    }
    else if(step === 3){
      return (
      <>
        <StepRow step={step} />
        <Health />
      </>
     )
    }
    else if(step === 4){
      return (
      <>
        <StepRow step={step} />
        <Purpose />
      </>
     )
    }
    else if(step === 5){
      return (
      <>
        <StepRow step={step} />
        <Preferences />
      </>
     )
    }
    else if(step === 6){
      return (
      <>
        <StepRow step={step} />
        <StressAndLifeStyle />
      </>
     )
    }
    else if(step === 7){
      return (
      <>
        <StepRow step={step} />
        <Done step={step} />
      </>
     )
    }
    else if(step === 8){
      return (
      <>
        <StepRow step={step} />
        <Statistic />
      </>
     )
    }

    else{
      return <></>
    }
  }

  {/* {
    "goal": ["набор массы": false, "снижение веса": 1, ...]
  } */}

  return (
    <div className='article'>
        <div>
            <Beck step={step} onClick={onClickBeckStep} />
           {
             showContetn()
           }
        </div>
        <Continue step={step} onClick={onClickNextStep}/>
       <Popaps showpopUp1={showpopUp1} showpopUp2={showpopUp2} showpopUp3={showpopUp3} cloasePop={cloasePop} />
    </div>
  )
}

export default Welcom