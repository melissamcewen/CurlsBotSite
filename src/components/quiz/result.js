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
          <li><Link to="/cg-lite/">Low porosity product recommendations</Link>: If you're low porosity, you're probably prone to build up. Products that are too heavy (in oils or butters) or used in excessive amounts can weigh your hair down. Use heavy products sparingly or use lighter products to keep your hair from getting limp. Cleansing with a low-poo (sulfate free shampoo) can also prevent your hair from getting weighed down.</li>
          <li><Link to="/high-porosity/">High porosity recommendations</Link> If you are high porosity, your hair benefits from a lot of nourishment and moisture. Use rich creamy products to help give your hair shine and lock in moisture. Your hair is vulnerable to damage (or is damaged) so handle with care. Swap your shampoo for a gentle co-wash (a cleansing conditioner). </li>
          <li><Link to="/normal-porosity/">Normal porosity recommendations</Link>: If you have normal porosity your hair is healthy and easy to work with. Products that are balanced with moisture can help your hair remain healthy. You may want to alternate co-wash and low-poo for balance.</li>
        </ul>
      </div>
    );
  }

  Result.propTypes = {
    quizResult: React.PropTypes.string.isRequired,
  };

  export default Result;
