import React from 'react'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

function AnswerOption(props) {
    return (
      <FormGroup check className="answerOption">
        <Label check>
        <Input
          type="radio"
          className="radioCustomButton"
          name="radioGroup"
          checked={props.answerType === props.answer}
          id={props.answerType}
          value={props.points}
          disabled={props.answer}
          onChange={props.onAnswerSelected}
        />
        <span className="radioCustomLabel" htmlFor={props.answerType}>
          {props.answerContent}
        </span>
        </Label>

      </FormGroup >
    );
  }

AnswerOption.propTypes = {
    answerType: React.PropTypes.string.isRequired,
    answerContent: React.PropTypes.string.isRequired,
    answer: React.PropTypes.number.isRequired,
    points: React.PropTypes.number,

    onAnswerSelected: React.PropTypes.func.isRequired
};

export default AnswerOption;