import React, { useState, useEffect } from 'react';
import Home from './components/Home';
import IntakeForm from './components/IntakeForm';
import ConsentForm from './components/ConsentForm';
import Questions from './components/Questions';
import FourteenQ from './components/FourteenQ';
import { intakeUser, postAnswer, updatedAnswer } from './services/apiHelper';
import { withRouter } from 'react-router-dom';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css';


function App(props) {
  const [userId, setUserId] = React.useState(2); //future connect to websocket call receive user id
  const [userInfo, setUserInfo] = React.useState(''); // connect to user intake form
  const [questionId, setQuestionId] = React.useState(0); // question ->url

  const handleRegister = async(userInfo) => {
    console.log(userInfo);
    try {
      const resp = await intakeUser(userInfo)
    } catch (error) {
      console.log(error);
    }
    props.history.push(`/question/${questionId}`);
  }

  const handleNext = async(userAnswers) => {
    // const userId = await localStorage.getItem('userId');
    const id = 2; //change this from after pulling userId from websocket
    try {
      if (userId == id) {
      await updatedAnswer(userId, userAnswers)
    } else {
      await postAnswer(userId, userAnswers)
    }} catch (error) {
    console.log(error);
   }
   let increment = 1;
   setQuestionId(questionId + increment);
   if((questionId + increment) == 13) {
     props.history.push('/14')
  } else { props.history.push(`/question/${questionId + increment}`);
 }
}

  const handleConsent = () => {
    props.history.push('/intake');
  }


  return (
   <div className="App">

     <Route exact path='/' render={Home} />

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

      <Route path={'/question/:questionId'} render={props => (
      <Questions
        userId={userId}
        questionId={props.match.params.questionId}
        handleNext={handleNext}
       />
     )}/>

     <Route path='/14' render={FourteenQ} />

    </div>
  );
};

export default withRouter(App);
