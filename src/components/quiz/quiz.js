import React from 'react'
import Question from './question'
import QuestionCount from './questioncount'
import AnswerOption from './answeroption'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';


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

      <Form key={props.questionId}>
        <FormGroup tag="fieldset">
        <QuestionCount
          counter={props.questionId}
          total={props.questionTotal}
        />
        <Question content={props.question} />
        <div className="answerOptions">
          {props.answerOptions.map(renderAnswerOptions)}
        </div>
        </FormGroup>
      </Form>

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