import React from 'react';
import ResultListing from '../components/resultlisting';
import ProductListing from '../components/productlisting';
import Link from 'gatsby-link'
import Helmet from 'react-helmet'

import ReactGA from 'react-ga';


import { Button, Form, FormGroup, Label, Input, FormText, Card, CardTitle, CardText, CardSubtitle} from 'reactstrap';
// ingredients analysis includes

import cleaner from '../ingredients/cleaner';
import analyze from '../ingredients/analyze';
import detector from '../ingredients/detector';


import wax from '../ingredients/wax';
import alcohol from '../ingredients/alcohol';
import silicones from '../ingredients/silicones';
import sulfates from '../ingredients/sulfates';
import other from '../ingredients/other';


class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      results: '',
      unknownSiliconeResults: '',
      badSiliconeResults: '',
      goodSiliconeResults: '',
      unknownSulfateResults: '',
      badSulfateResults: '',
      goodSulfateResults: '',
      goodAlcoholResults: '',
      badAlcoholResults: '',
      unknownAlcoholResults: '',
      goodWaxOilResults: '',
      badWaxOilResults: '',
      unknownWaxOilResults: '',
      waterInsolubleResults: '',
      invalidInput: false,


      
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


 process(text){

    let notCG = false
    let unknownCG = false;
    let detectedSilicones = []


    //TODO ugh yeah this needs help
    let valid = cleaner(text);

    if (valid.length < 1){
      this.setState({invalidInput: true});
      return;

    }

   let results = analyze(text);



      if (results.silicones.good.length > 0) {
          this.setState({goodSiliconeResults: results.silicones.good
                    });
      }
      if (results.silicones.bad.length > 0) {
          notCG = true;
          this.setState({badSiliconeResults: results.silicones.bad
          });
      }

      if (results.silicones.unknown.length > 0) {
          unknownCG = true;
          this.setState({unknownSiliconeResults: results.silicones.unknown
          });
      }

      if (results.sulfates.bad.length > 0) {
          notCG = true;
          this.setState({badSulfateResults: results.sulfates.bad
          });
      }


      if (results.alcohol.good.length > 0) {
          this.setState({goodAlcoholResults: results.alcohol.good});
      }
      if (results.alcohol.bad.length > 0) {
          notCG = true;
          this.setState({badAlcoholResults: results.alcohol.bad
          });
      }

      if (results.alcohol.unknown.length > 0) {
          unknownCG = true;
          this.setState({unknownAlcoholResults: results.alcohol.unknown
          });
      }

      if (results.wax.good.length > 0) {
          this.setState({goodWaxOilResults: results.wax.good});
      }
      if (results.wax.bad.length > 0) {
          notCG = true;
          this.setState({badWaxOilResults: results.wax.bad
          });
      }

      if (results.wax.unknown.length > 0) {
          unknownCG = true;
          this.setState({unknownWaxOilResults: results.wax.unknown
          });
      }
      if (results.other.bad.length > 0) {
          notCG = true;
          this.setState({waterInsolubleResults: results.other.bad
          });
      }





    let detect = detector(results);

    if (detect == "bad") {
      this.setState({results: "not CG"});
    } else if (detect == "unknown") {
      this.setState({results: "unknown CG"});
    } else {
      this.setState({results: "CG"});
    }

      ReactGA.event({
        category: 'curlsbot',
        action: text,
        label: notCG
      });


  }


  handleChange(event) {
    this.setState({
      value: event.target.value,
      invalidInput: false,
      unknownSiliconeResults: '',
      badSiliconeResults: '',
      goodSiliconeResults: '',
      unknownSulfateResults: '',
      badSulfateResults: '',
      goodSulfateResults: '',
      unknownAlcoholResults: '',
      badAlcoholResults: '',
      goodAlcoholResults: '',
      unknownWaxOilResults: '',
      badWaxOilResults: '',
      goodWaxOilResults: '',
      waterInsolubleResults: '',
      results: '',


    });
  }

  handleSubmit(event) {
   this.process(this.state.value);

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
        <p>A lot of people are interested in properly caring for their naturally curly or wavy hair, but it can be confusing to find the right methods and products. CurlsBot aims to make it all easier by analyzing ingredient lists to see if they comply with the <a href="http://amzn.to/2nT3w1V">"curly girl" rules pioneered by Lorraine Massey</a>. We look for silicones, oils, and waxes that can build up, as well as harsh sulfates.</p>
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
        {this.state.badSiliconeResults.length > 0 &&
          <Card body outline color="danger">
            <CardTitle>Silicones Detected</CardTitle>
            <CardSubtitle>Yikes, it seems to me this product has these bad silicones, they can build up on your hair and mean this product is not curly girl approved. If you believe they might actually be water soluble <a href="http://m.me/curlsbot">message me - I'll take a personalized look and get back to you ASAP!</a>:</CardSubtitle>
            <CardText><ResultListing list={this.state.badSiliconeResults}/>

            </CardText>
           </Card>
   
         }

        {this.state.goodSiliconeResults.length > 0 &&
          <Card body outline color="success">
            <CardTitle>OK Silicones</CardTitle>
            <CardSubtitle>These look like 'good silicones' because they are water soluble, they are perfectly OK. You can tell these silicones are OK because they contain the prefixes ppg or peg:</CardSubtitle>
            <CardText><ResultListing list={this.state.goodSiliconeResults}/></CardText>
           </Card>
   
         }

        {this.state.unknownSiliconeResults.length > 0 &&
          <Card body outline color="warning">
            <CardTitle>Unknown Silicones</CardTitle>
            <CardSubtitle>I don't know these silicones yet, but if you <a href="http://m.me/curlsbot">message me I'll take a personalized look and get back to you ASAP!</a>:</CardSubtitle>
            <CardText>
                  <ResultListing list={this.state.unknownSiliconeResults}/>
            </CardText>
           </Card>
   
         }


        {this.state.badSulfateResults.length > 0 &&
          <Card body outline color="danger">
            <CardTitle>Harsh Sulfates Detected</CardTitle>
            <CardSubtitle>Yikes! These are either harsh sulfates or similar sulfer-based compounds which are not curly girl approved:</CardSubtitle>
            <CardText><ResultListing list={this.state.badSulfateResults}/>

            </CardText>
           </Card>
   
         }

        {this.state.goodSulfateResults.length > 0 &&
          <Card body outline color="success">
            <CardTitle>Curly Girl Approved Sulfates/Sulfate-like ingredients</CardTitle>
            <CardSubtitle>These are either gentle CG-approved sulfates or non-cleanser sulfates (like magnesium sulfate which is used to provide texture)</CardSubtitle>
            <CardText><ResultListing list={this.state.goodSulfateResults}/></CardText>
           </Card>
   
         }

        {this.state.unknownSulfateResults.length > 0 &&
          <Card body outline color="warning">
            <CardTitle>Unknown Sulfate-like Ingredients</CardTitle>
            <CardSubtitle>I can't tell you much about these sulfates or sulfate-like ingredients right now, but if you <a href="http://m.me/curlsbot">message me I'll take a personalized look and get back to you ASAP!</a></CardSubtitle>
            <CardText>
                  <ResultListing list={this.state.unknownSulfateResults}/>
            </CardText>
           </Card>
   
         }


        {this.state.badAlcoholResults.length > 0 &&
          <Card body outline color="danger">
            <CardTitle>Harsh Alcohols Detected</CardTitle>
            <CardSubtitle>These alcohols will dry out your hair, they are not curly girl approved:</CardSubtitle>
            <CardText><ResultListing list={this.state.badAlcoholResults}/>

            </CardText>
           </Card>
   
         }

        {this.state.goodAlcoholResults.length > 0 &&
          <Card body outline color="success">
            <CardTitle>Curly Girl Approved Alcohols</CardTitle>
            <CardSubtitle>These alcohols won't dry our your hair, they are curly girl approved:</CardSubtitle>
            <CardText><ResultListing list={this.state.goodAlcoholResults}/></CardText>
           </Card>
   
         }

        {this.state.unknownAlcoholResults.length > 0 &&
          <Card body outline color="warning">
            <CardTitle>Unknown Alcohols</CardTitle>
            <CardSubtitle>I don't know anything about these alcohols, but if you <a href="http://m.me/curlsbot">message me I'll take a personalized look and get back to you ASAP!</a></CardSubtitle>
            <CardText>
                  <ResultListing list={this.state.unknownAlcoholResults}/>
            </CardText>
           </Card>
   
         }

        {this.state.badWaxOilResults.length > 0 &&
          <Card body outline color="danger">
            <CardTitle>Non-Curly Girl Waxes and Oils Detected </CardTitle>
            <CardSubtitle>These waxes and oils can cause buildup that is difficult to remove and keeps your hair from absorbing moisture properly:</CardSubtitle>
            <CardText><ResultListing list={this.state.badWaxOilResults}/>

            </CardText>
           </Card>
   
         }

        {this.state.goodWaxOilResults.length > 0 &&
          <Card body outline color="success">
            <CardTitle>Ok Waxes & Oils</CardTitle>
            <CardSubtitle>These have been modified to make them water soluble: </CardSubtitle>
            <CardText><ResultListing list={this.state.goodWaxOilResults}/></CardText>
           </Card>
   
         }

        {this.state.unknownWaxOilResults.length > 0 &&
          <Card body outline color="warning">
            <CardTitle>Unknown Waxes and Oils</CardTitle>
            <CardSubtitle>These are some waxes and castor oil types I don't know about, but if you <a href="http://m.me/curlsbot">message me I'll take a personalized look and get back to you ASAP!</a> </CardSubtitle>
            <CardText>
                  <ResultListing list={this.state.unknownWaxOilResults}/>
            </CardText>
           </Card>
   
         }

        {this.state.waterInsolubleResults.length > 0 &&
          <Card body outline color="danger">
            <CardTitle>Other Water Insoluble Ingredients</CardTitle>
            <CardSubtitle>These ingredients are chemicals known to build up on hair: </CardSubtitle>
            <CardText><ResultListing list={this.state.waterInsolubleResults}/></CardText>
           </Card>
   
         }



      {this.state.results == "not CG" &&
        <Card body inverse color="danger">
            <CardTitle>Result: Not Curly Girl Approved</CardTitle>
           <CardText>My final verdict? Looks like this product is NOT curly girl approved. Try checking out one of our recommend products like  <ProductListing /> or take our  <Link to="/porosity/" className="btn btn-secondary">porosity quiz</Link> for customized recommendations.</CardText>
        </Card>
      }

      {this.state.results == "unknown CG" &&
        <Card body inverse color="warning">
          <CardTitle>Result: Unknown</CardTitle>
           <CardText>My final verdict? I can't say if this is approved or not, you'll need to do your own research by looking up the unknown ingredients or <a href="http://m.me/curlsbot">messaging us</a>. Try checking out one of our recommend products like  <ProductListing /> or take our  <Link to="/porosity/" className="btn btn-secondary">porosity quiz</Link> for customized recommendations. </CardText>
        </Card>
      }

      {this.state.results == "CG" &&
        <Card body inverse color="success">
            <CardTitle>Result: Curly Girl Approved</CardTitle>
           <CardText>Woohoo, I can't find anything wrong with this, looks like it's curly girl approved! But don't forget to read the label carefully and do a backup check yourself – ingredients listed online are not always accurate.</CardText>
        </Card>
      }

      {this.state.results &&
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
