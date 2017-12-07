import React from 'react'
//import { Line, Circle } from 'rc-progress'
import Link from 'gatsby-link'



function ListItem(props) {
  return <li>{props.value} {props.other}</li>;
}

 function Result(props) {
    const answers = props.quizStats;
    return (
      <div className="result">
       <h2> Result</h2>
       <h3> Your hair is: <strong>{props.quizResult}</strong></h3>

        <h2>Product recs</h2>
        <p>Right now we only have recs for low porosity, but check back later for recommendations for other porosities!</p>
        <ul>
          <li><Link to="/cg-lite/">Low porosity</Link></li>
        </ul>
      </div>
    );
  }

  Result.propTypes = {
    quizResult: React.PropTypes.string.isRequired,
  };

  export default Result;
