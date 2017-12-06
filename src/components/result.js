import React from 'react'
import { Line, Circle } from 'rc-progress'


function ListItem(props) {
  return <li>{props.value} {props.other}</li>;
}

 function Result(props) {
    const answers = props.quizStats;
    return (
      <div className="result">
        Your hair is: <strong>{props.quizResult}</strong>!
          <Line percent="10"  strokeColor="#b44d12" />
            <ul>
      {Object.keys(answers).map((keyName, keyIndex) =>
        <ListItem key={keyIndex}
                  value={answers[keyName]}
                  other= {keyName} />
      )}
    </ul>
      </div>
    );
  }

  Result.propTypes = {
    quizResult: React.PropTypes.string.isRequired,
    quizStats: React.PropTypes.object.isRequired
  };

  export default Result;
