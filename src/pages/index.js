import React from 'react';
import ResultListing from '../components/analyzer/resultlisting';
import ProductListing from '../components/analyzer/productlisting';
import Results from '../components/analyzer/results';
import Verdict from '../components/analyzer/verdict';

import Link from 'gatsby-link'
import Helmet from 'react-helmet'

import ReactGA from 'react-ga';


import { Button, Form, FormGroup, Label, Input, FormText, Card, CardTitle, CardText, CardSubtitle} from 'reactstrap';
// ingredients analysis includes

import analyze from '../ingredients/analyze';
import detector from '../ingredients/detector';
import cleaner from '../ingredients/cleaner';



class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      result: analyze(''),
      invalidInput: false,
      verdict: '',
      done: false



    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }



  handleChange(event) {
    this.setState({
      value: event.target.value,
      invalidInput: false,


    });
  }

  handleSubmit(event) {

   if(cleaner(this.state.value) < 1 ){
      this.setState({invalidInput: true});
      this.setState({result: analyze('')});
      this.setState({verdict: ''});


   } else {
      this.setState({done: true});

      let results = analyze(this.state.value);
      this.setState({result: results});
      let verdict = detector(results);
      this.setState({verdict: verdict});

   }
    event.preventDefault();
  }



  render() {

    return (
      <div>
      <Helmet
      title="Curlsbot: Ingredients Analysis"
      meta={[
        { name: 'description', content: 'See if ingredients meet the curly hair standard' },
        { name: 'keywords', content: 'products, curly hair, sulfates, silicones, waxes, oils, hair' },
        {
          property: 'og:image',
          content: 'http://www.curlsbot.com/img/icon.png'
        }
        ]}
        />
        <h1>Curlsbot Ingredients Analyzer</h1>

        <p>A lot of people are interested in properly caring for their naturally curly or wavy hair, but it can be confusing to find the right methods and products. CurlsBot aims to make it all easier by analyzing ingredient lists to see if they contain ingredients many people with curly hair like to avoid. We look for silicones, oils, and waxes that can build up, as well as harsh sulfates. <Link to="/howitworks/" >Click here for our disclaimer and info on how it works.</Link> </p>
        <FormGroup >
          <Label for="exampleText">Curlsbot Beta!</Label>
          <Input type="textarea" name="text" id="exampleText" placeholder="Paste an ingredient list here- we recommend finding the list on the brand's website or ulta and pasting it here rather than trying to type yourself. Typing yourself may result in inaccuracies." onChange={this.handleChange} rows="10" />
          <Button onClick={this.handleSubmit}>Submit</Button>
        </FormGroup>

        <h2>Results</h2>

        {this.state.invalidInput &&
          <Card body outline color="warning">
            <CardTitle>Hmm is this an ingredient list?</CardTitle>
            <CardSubtitle>I can't process this because it's either not an ingredient list or the ingredients aren't seperated by commas</CardSubtitle>
           </Card>

         }
      <Results data={this.state.result}/>
      <Verdict data={this.state.verdict}/>



    





      </div>

    );
  }
}


export default Index;
