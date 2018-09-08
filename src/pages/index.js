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
        { name: 'description', content: 'See if ingredients meet the curly girl standard' },
        { name: 'keywords', content: 'products, curly girl, sulfates, silicones, waxes, oils, hair' },
        {
          property: 'og:image',
          content: 'http://www.curlsbot.com/img/icon.png'
        }
        ]}
        />
        <h1>Curlsbot Ingredients Analyzer</h1>

        <p>A lot of people are interested in properly caring for their naturally curly or wavy hair, but it can be confusing to find the right methods and products. CurlsBot aims to make it all easier by analyzing ingredient lists to see if they comply with the <a href="http://amzn.to/2nT3w1V">"curly girl" rules pioneered by Lorraine Massey</a>. We look for silicones, oils, and waxes that can build up, as well as harsh sulfates. <Link to="/howitworks/" >Click here for our disclaimer and info on how it works.</Link> </p>
        <FormGroup >
          <Label for="exampleText">Curlsbot Beta!</Label>
          <Input type="textarea" name="text" id="exampleText" placeholder="Paste an ingredient list here" onChange={this.handleChange} rows="10" />
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



      {this.state.done &&
        <Card body outline color="success">
            <CardTitle>Questions? Concerns?</CardTitle>

            <Button href="https://www.facebook.com/groups/1804576666517325">Start a discussion at our group</Button>
            <CardText></CardText>
        </Card>
   
      }




       
      </div>
      
    );
  }
}


export default Index;
