import React, { useState, useEffect } from 'react';
import questions from './questionsList';
import { postAnswer} from '../services/apiHelper';

function Questions(props) {
const {handleNext, questionId, userId} = props
const [answers, setAnswers] = React.useState({
  'answer_breaking': 0,
  'answer_building': 0,
  'answer_with_it': 0,
  'answer_against_it': 0,
  'answer_intuition': 0,
  'answer_intention': 0
});

 const handleSubmit = async (e) => {
  e.preventDefault()
  const input = document.querySelector('input[name="answer"]:checked');
  const answerIndex = parseInt(input.getAttribute("data-answer-index"));
  let newAnswers = answers;
  questions.questions[questionId].answers[answerIndex].scores.forEach((score) => {
    newAnswers = {
      ...newAnswers,
      [score.catagory] : newAnswers[score.catagory] + parseFloat(score.value)
    }
  })
  setAnswers(newAnswers);
  const submit = handleNext;
   submit(newAnswers);
 }

 // useEffect(() => {
 //     postAnswer(userId, answers)
 //   }, []);

 return (
  <>
   <div className='div-title'>
    <h1 className='general-title'>Quesion no. {questions.questions[questionId].number}</h1>
   </div>

   <div>
    <h2>{questions.questions[questionId].title}</h2>
   </div>

  <div>
   <form className='form-q' onSubmit={handleSubmit}>
  {
   questions.questions[questionId].answers.map((answer, index) => {
     return (
      <div key={answer.text}>
       <input data-answer-index={index} data-catagory={answer.scores.catagory} value={answer.scores.value} type='radio' name='answer' required/>
        {answer.text}
      </div>
     )
    })
   }
    <button className='btn' type='submit'>Next</button>
   </form>

  </div>

  </>
  );
 };

export default Questions;
