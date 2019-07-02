import React, { useState } from 'react';
import Home from './components/Home';
import IntakeForm from './components/IntakeForm';
import ConsentForm from './components/ConsentForm';
import Questions from './components/Questions';
import { intakeUser, postAnswer } from './services/apiHelper';
import { withRouter } from 'react-router-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './App.css';


function App(props) {
  const [userId, setUserId] = React.useState(''); //future connect to websocket call receive user id
  const [userInfo, setUserInfo] = React.useState(''); // connect to user intake form
  const [userAnswers, setUserAnswers] = React.useState(''); // connect to user answers
  const [qIndex, setQIndex] = React.useState(0); // question ->url

  const handleRegister = async(userInfo) => {
    console.log(userInfo);
    try {
      const resp = await intakeUser(userInfo)
    } catch (error) {
      console.log(error);
    }
    props.history.push(`/${qIndex}`);
  }

  const handleNext = async(userAnswers) => {
    console.log(userAnswers, 'from app29');
    try {
    // const id = await localStorage.getItem('id');
    const userId = 2; //change this from after pulling user id from websocket
    await postAnswer(userId, userAnswers);
    } catch (error) {
    console.log(error);
   }
   const increamentPage = qIndex++
   setQIndex(increamentPage);
   props.history.push(`/${qIndex}`)
  }

  const handleConsent = () => {
    props.history.push('/intake');
  }

  return (
   <div className="App">

     <Route exact path='/' render={Home}/>

       <Route path='/welcome' render={props => (
        <ConsentForm
         {...props}
        handleConsent={handleConsent}

        />
       )}/>

      <Route path='/intake' render={props => (
      <IntakeForm
        userInfo={userInfo}
        handleRegister={handleRegister}
       />
     )}/>

      <Route path=`/${qIndex}` render={props => (
      <Questions
        userAnswers={userAnswers}
        handleNext={handleNext}
       />
     )}/>

    </div>
  );
};

export default withRouter(App);
