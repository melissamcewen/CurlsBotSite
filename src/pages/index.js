import React from 'react';
import ResultListing from '../components/analyzer/resultlisting';
import ProductListing from '../components/analyzer/productlisting';
import Results from '../components/analyzer/results';
import Verdict from '../components/analyzer/verdict';

import Link from 'gatsby-link'
import Helmet from 'react-helmet'

import ReactGA from 'react-ga';


import { Button, Form, FormGroup, Label, Input, FormText, Card, CardTitle, CardText, CardSubtitle, Alert} from 'reactstrap';
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
      done: false,
      email: '',
      subscribeStatus: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleSubscribe = this.handleSubscribe.bind(this);
  }

  handleEmailChange(event) {
    this.setState({ email: event.target.value });
  }

  handleSubscribe(event) {
    event.preventDefault();
    const form = document.createElement('form');
    form.setAttribute('action', 'https://twitter.us14.list-manage.com/subscribe/post');
    form.setAttribute('method', 'POST');
    form.setAttribute('target', '_blank');

    // Add hidden fields
    const userInput = document.createElement('input');
    userInput.setAttribute('type', 'hidden');
    userInput.setAttribute('name', 'u');
    userInput.setAttribute('value', 'dbc1f6ce69d9c1d849eaa642e');
    form.appendChild(userInput);

    const idInput = document.createElement('input');
    idInput.setAttribute('type', 'hidden');
    idInput.setAttribute('name', 'id');
    idInput.setAttribute('value', 'cd0a9d8b8e');
    form.appendChild(idInput);

    // Add email input
    const emailInput = document.createElement('input');
    emailInput.setAttribute('type', 'email');
    emailInput.setAttribute('name', 'EMAIL');
    emailInput.setAttribute('value', this.state.email);
    form.appendChild(emailInput);

    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);

    this.setState({
      email: '',
      subscribeStatus: 'Thanks for subscribing! Please check your email to confirm.'
    });
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

        <Alert color="info">
          After an embarrasingly long time, Curlsbot is being updated to be more accurate and useful. You can see a preview of the new Alpha version <a href="https://curls-bot-site.vercel.app/">here</a>.
        </Alert>

        <Card body className="mb-4">
          <CardTitle tag="h3">Subscribe for Updates</CardTitle>
          <CardText>Stay informed about new features and improvements to Curlsbot!</CardText>
          <Form onSubmit={this.handleSubscribe} inline>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
              <Label for="subscribeEmail" className="mr-sm-2">Email</Label>
              <Input
                type="email"
                name="email"
                id="subscribeEmail"
                placeholder="your@email.com"
                value={this.state.email}
                onChange={this.handleEmailChange}
                required
              />
            </FormGroup>
            <Button color="primary">Subscribe</Button>
          </Form>
          {this.state.subscribeStatus &&
            <Alert color="success" className="mt-3">
              {this.state.subscribeStatus}
            </Alert>
          }
        </Card>

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
