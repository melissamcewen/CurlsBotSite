import React from 'react';
import ResultListing from '../components/resultlisting';
import ProductListing from '../components/productlisting';
import Link from 'gatsby-link'
import Helmet from 'react-helmet'

import ReactGA from 'react-ga';


import { Button, Form, FormGroup, Label, Input, FormText, Card, CardTitle, CardText, CardSubtitle} from 'reactstrap';


//TODO refactor this

const siliconeList = [
  "cone",
  "dimethicon"
];


const badSiliconeList = [
  "dimethicone",
  "bisaminopropyl dimethicone",
  "cetearyl methicone",
  "cetyl dimethicone",
  "cyclopentasiloxane",
  "stearoxy dimethicone",
  "stearyl dimethicone",
  "trimethylsilylamodimethicone",
  "amodimethicone",
  "dimethiconol",
  "behenoxy dimethicone",
  "phenyl trimethicone",
  "aminopropyl triethoxysilane",
  "silicone"
];

const goodSiliconeList =  [
  "peg-dimethicone",
  "dimethicone copolyol",
  "dimethicone-pg diethylmonium chloride",
  "pg-dimethicone", 
  "glycidoxy dimethicone crosspolymer", 
  "dimethicone hydroxypropyl trimonium chloride", 
  "hydroxyethyl acetomonium pg-dimethicone", 
  "stearalkonium dimethicone peg-8 phthalate", 
  "steardimonium hydroxypropyl panthenyl peg-7 dimethicone phosphate chloride"
];

const sulfateList = [
  "sulfate",
  "sulfo",
  "sarcosinate"

]

const goodSulfateList = [
  "behentrimonium methosulfate",
  "disodium laureth sulfosuccinate",
  "magnesium sulfate",
  "sodium lauroyl sarcosinate",
  "sodium laurylglucosides hydroxypropylsulfonate"
];

const badSulfateList = [
  "alkylbenzene sulfonate",
  "alkyl benzene sulfonate",
  "ammonium laureth sulfate",
  "ammonium lauryl sulfate",
  "ammonium xylenesulfonate",
  "sodium cocoyl sarcosinate",
  "sodium laureth sulfate",
  "sodium lauryl sulfate",
  "sodium lauryl sulfoacetate",
  "sodium myreth sulfate",
  "sodium xylenesulfonate",
  "tea-dodecylbenzenesulfonate",
  "ethyl peg-15 cocamine sulfate",
  "dioctyl sodium sulfosuccinate",
  "sodium coco-sulfate"
];

var alcoholList = [
  "alcohol"
];

var badAlcoholList = [
  "denatured alcohol",
  "sd alcohol 40",
  "witch hazel",
  "isopropanol",
  "ethanol",
  "sd alcohol",
  "propanol",
  "propyl alcohol",
  "isopropyl alcohol",
  "alcohol denat."
];

var goodAlcoholList = [
  "behenyl alcohol",
  "cetearyl alcohol",
  "ceteryl alcohol",
  "cetyl alcohol",
  "isocetyl alcohol",
  "isostearyl alcohol",
  "lauryl alcohol",
  "myristyl alcohol",
  "stearyl alcohol",
  "c30-50 alcohols",
  "lanolin alcohol",
  "benzyl alcohol",
  "stearyl alcohol",
  "aminomethyl propanol",
  "oleyl alcohol",
  "brassica alcohol"
];

var waxOilList = [
  "castor",
  "wax"
]

var badWaxOilList = [
  "mineral oil",
  "huile minerale",
  "parrifidium liquidium",
  "petrolatum",
  "bees wax",
  "beeswax",
  "candelia wax",
  "cire dabeille",
  "cera alba",
  "paraffinum liquidum (mineral oil)",
  "microcrystalline wax" 
];


var goodWaxOilList = [
  "PEG-Hydrogenated Castor Oil"
];

function analysis(source, unknown, good, bad){
    let detected = [];
    let goodList = source.filter( function( el ) {
       return good.includes( el );
    } ); 
    detected = detected.concat(goodList);  
    
    let badList= source.filter( function( el ) {
       return bad.includes( el );
    } ); 
  

    detected= detected.concat(badList);
  
    let unknownList = source.filter( function( el ) {
      return detected.indexOf( el ) < 0;
      } ).filter( function( el ) {
        return unknown.some(function(ff) { 
            return el.indexOf(ff) > -1;
      
         });
    }); 
  

  
  let results = {
    good: goodList,
    bad: badList,
    unknown: unknownList
  }

  return results;
  
} 


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
      invalidInput: false,


      
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


 process(text){

    let notCG = false
    let unknownCG = false;
    let detectedSilicones = []

    let ingredientsList = text.split(',');

    function isBelowThreshold(currentValue) {
      console.log("testing" + currentValue);
      if (/^(?:\w+:)?\/\/([^\s\.]+\.\S{2}|localhost[\:?\d]*)\S*$/.test(currentValue)){
        console.log("URL detected");
        return false
      }
      else if (currentValue.length > 150) {
        return false
      }

      return true

    }

    if (!ingredientsList.every(isBelowThreshold)){
      this.setState({invalidInput: true});
      return;

    }


    ingredientsList= ingredientsList.map(x => x.trim().toLowerCase().replace(/[^0-9A-Za-z\s+()-]/g, ''));


    let siliconeAnalysis= analysis(ingredientsList, siliconeList, goodSiliconeList, badSiliconeList);

    let sulfateAnalysis= analysis(ingredientsList, sulfateList, goodSulfateList, badSulfateList);


    let alcoholAnalysis= analysis(ingredientsList, alcoholList, goodAlcoholList, badAlcoholList);

    let waxOilAnalysis= analysis(ingredientsList, waxOilList, goodWaxOilList, badWaxOilList);


    if (siliconeAnalysis.good.length > 0) {
          this.setState({goodSiliconeResults: siliconeAnalysis.good});
      }
      if (siliconeAnalysis.bad.length > 0) {
        console.log("bad")
          notCG = true;
          this.setState({badSiliconeResults: siliconeAnalysis.bad
          });
      }

      if (siliconeAnalysis.unknown.length > 0) {
          unknownCG = true;
          this.setState({unknownSiliconeResults: siliconeAnalysis.unknown
          });
      }

    if (sulfateAnalysis.good.length > 0) {
          this.setState({goodSulfateResults: sulfateAnalysis.good});
      }
      if (sulfateAnalysis.bad.length > 0) {
          notCG = true;
          this.setState({badSulfateResults: sulfateAnalysis.bad
          });
      }

      if (sulfateAnalysis.unknown.length > 0) {
          unknownCG = true;
          this.setState({unknownSulfateResults: sulfateAnalysis.unknown
          });
      }

      if (alcoholAnalysis.good.length > 0) {
          this.setState({goodAlcoholResults: alcoholAnalysis.good});
      }
      if (alcoholAnalysis.bad.length > 0) {
          notCG = true;
          this.setState({badAlcoholResults: alcoholAnalysis.bad
          });
      }

      if (alcoholAnalysis.unknown.length > 0) {
          unknownCG = true;
          this.setState({unknownAlcoholResults: alcoholAnalysis.unknown
          });
      }

      if (waxOilAnalysis.good.length > 0) {
          this.setState({goodWaxOilResults: waxOilAnalysis.good});
      }
      if (waxOilAnalysis.bad.length > 0) {
          notCG = true;
          this.setState({badWaxOilResults: waxOilAnalysis.bad
          });
      }

      if (waxOilAnalysis.unknown.length > 0) {
          unknownCG = true;
          this.setState({unknownWaxOilResults: waxOilAnalysis.unknown
          });
      }




    

    if (notCG) {
      this.setState({results: "not CG"});
    } else if (unknownCG) {
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
      results: ''

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
            <CardSubtitle>Yikes, it seems to me this product has these bad silicones, they can build up on your hair and mean this product is not curly girl approved:</CardSubtitle>
            <CardText><ResultListing list={this.state.badSiliconeResults}/>

            </CardText>
           </Card>
   
         }

        {this.state.goodSiliconeResults.length > 0 &&
          <Card body outline color="success">
            <CardTitle>OK Silicones</CardTitle>
            <CardSubtitle>These look like 'good silicones' because they are water soluble, they are perfectly OK:</CardSubtitle>
            <CardText><ResultListing list={this.state.goodSiliconeResults}/></CardText>
           </Card>
   
         }

        {this.state.unknownSiliconeResults.length > 0 &&
          <Card body outline color="warning">
            <CardTitle>Unknown Silicones</CardTitle>
            <CardSubtitle>I don't know these silicones yet, but if you <a href="http://m.me/curlsbot">message me I'll take a personalized look and get back to you ASAP!</a>.:</CardSubtitle>
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
            <CardSubtitle>I can't tell you much about these sulfates or sulfate-like ingredients right now, but if you <a href="http://m.me/curlsbot">message me I'll take a personalized look and get back to you ASAP!</a>:</CardSubtitle>
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
            <CardTitle>Ok Oils</CardTitle>
            <CardSubtitle>Castor oil is known to build up but if it has PEG in front of it, that means it has been modified so as not to cause buildup: </CardSubtitle>
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

            <Button href="http://m.me/curlsbot">Message me</Button>
            <CardText></CardText>
        </Card>
   
      }




       
      </div>
      
    );
  }
}


export default Index;
