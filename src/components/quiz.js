import React from 'react'
import Question from '../components/question'
import QuestionCount from '../components/questioncount'
import AnswerOption from '../components/answeroption'



function Quiz(props) {


  function renderAnswerOptions(key) {
    return (
      <AnswerOption
        key={key.content}
        answerContent={key.content}
        answerType={key.type}
        points={key.points}
        answer={props.answer}
        questionId={props.questionId}
        onAnswerSelected={props.onAnswerSelected}
      />
    );
  }

  return (

      <div key={props.questionId}>
        <QuestionCount
          counter={props.questionId}
          total={props.questionTotal}
        />
        <Question content={props.question} />
        <ul className="answerOptions">
          {props.answerOptions.map(renderAnswerOptions)}
        </ul>
      </div>

  );
}

Quiz.propTypes = {
  answer: React.PropTypes.number.isRequired,
  answerOptions: React.PropTypes.array.isRequired,
  counter: React.PropTypes.number.isRequired,
  points: React.PropTypes.number,
  question: React.PropTypes.string.isRequired,
  questionId: React.PropTypes.number.isRequired,
  questionTotal: React.PropTypes.number.isRequired,
  onAnswerSelected: React.PropTypes.func.isRequired
};

export default Quiz;