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
  "silicone",
  "bis-aminopropyl dimethicone",
  "polysilicone-22",
  "trimethylsiloxyamodimethicone",
  "silica dimethicone silylate",
  "cetrimonium dimethicone peg-8 olivate."
];

/// todo refactor to detect quart and peg silicone better
const goodSiliconeList =  [
  "peg-dimethicone",
  "peg-8 distearmonium chloride pg-dimethicone",
  "dimethicone copolyol",
  "dimethicone-pg diethylmonium chloride",
  "pg-dimethicone", 
  "glycidoxy dimethicone crosspolymer", 
  "dimethicone hydroxypropyl trimonium chloride", 
  "hydroxyethyl acetomonium pg-dimethicone", 
  "stearalkonium dimethicone peg-8 phthalate", 
  "steardimonium hydroxypropyl panthenyl peg-7 dimethicone phosphate chloride",
  "silicone quaternium-1", 
  "silicone quaternium-2", 
  "silicone quaternium-2 panthenol succinate", 
  "silicone quaternium-3", 
  "silicone quaternium-4", 
  "silicone quaternium-5", 
  "silicone quaternium-6", 
  "silicone quaternium-7", 
  "silicone quaternium-8", 
  "silicone quaternium-9", 
  "silicone quaternium-10", 
  "silicone quaternium-11", 
  "silicone quaternium-12", 
  "silicone quaternium-15", 
  "silicone quaternium-16", 
  "silicone quaternium-16",
  "silicone quaternium 2", 
  "silicone quaternium 2 panthenol succinate", 
  "silicone quaternium 3", 
  "silicone quaternium 4", 
  "silicone quaternium 5", 
  "silicone quaternium 6", 
  "silicone quaternium 7", 
  "silicone quaternium 8", 
  "silicone quaternium 9", 
  "silicone quaternium 10", 
  "silicone quaternium 11", 
  "silicone quaternium 12", 
  "silicone quaternium 15", 
  "silicone quaternium 16", 
  "silicone quaternium 16",
  "silicone quaternium-18", 
  "silicone quaternium-19", 
  "silicone quaternium-20", 
  "silicone quaternium-21",
  "silicone quaternium 18", 
  "silicone quaternium 19", 
  "silicone quaternium 20", 
  "silicone quaternium 21",
  "peg-8 dimethicone",
  "peg-12 dimethicone",
  "peg-14 dimethicone",
  "peg-20 dimethicone",
  "peg-15 dimethicone"
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
  "sodium laurylglucosides hydroxypropylsulfonate",
  "isostearamidopropyl ethyldimonium ethosulfate",
  "disodium distyrylbiphenyl disulfonate",
  "cocotrimonium methosulfate",
  "sodium laneth-40 maleatestyrene sulfonate copolymer",
  "isoalkylamidopropylethyldimonium ethosulfate"
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
  "alcohol",
  "witch"
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
  "alcohol denat.",
  "sd alcohol 40-b",
  "alcohol denat",
  "sd alcohol 40b",
  "alcohol",
  "hamamellis virginiana (witch hazel) extract",
  "ethyl alcohol"
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
  "brassica alcohol",
  "cetyl alcohol2 polysorbate 60",
  "benzyl alcohol",
  "arachidyl alcohol"
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
  "microcrystalline wax" ,
  "myrica pubescens fruit wax",
  "synthetic beeswax",
  "euphorbia cerifera (candelilla) wax",
  "ricinus communis (castor) seed oil",
  "stearoxytrimethyl silane and stearyl alcohol (silky wax)"
];

// hmm maybe I need to refactor to remove hyphens haha
var goodWaxOilList = [
  "peg-hydrogenated castor oil",
  "peg-8 beeswax",
  "peg-60-hydrogenated castor oil",
  "peg-40 hydrogenated castor oil",
  "peg-40 castor oil"
];

var waterInsoluble = [
  "isohexadecane", 
  "dimethcione", 
  "stearoxytrimethyl silane",
  "cyclopentasiloxane"
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

function simpleAnalysis (source, find){
      return source.filter( function( el ) {
       return find.includes( el );
    } ); 
  
}


function isBelowThreshold(currentValue) {
  if (/^(?:\w+:)?\/\/([^\s\.]+\.\S{2}|localhost[\:?\d]*)\S*$/.test(currentValue)){
    return false
  }
  else if (currentValue.length > 150) {
    return false
  }

  return true

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

    let ingredientsList = text.split(',');



    if (!ingredientsList.every(isBelowThreshold)){
      this.setState({invalidInput: true});
      return;

    }


    ingredientsList= ingredientsList.map(x => x.trim().toLowerCase().replace(/[^0-9A-Za-z\s+()-]/g, ''));


    let siliconeAnalysis= analysis(ingredientsList, siliconeList, goodSiliconeList, badSiliconeList);

    let sulfateAnalysis= analysis(ingredientsList, sulfateList, goodSulfateList, badSulfateList);

    let alcoholAnalysis= analysis(ingredientsList, alcoholList, goodAlcoholList, badAlcoholList);

    let waxOilAnalysis= analysis(ingredientsList, waxOilList, goodWaxOilList, badWaxOilList);

    let waterInsolubleAnalysis = simpleAnalysis(ingredientsList, waterInsoluble); 

    console.log(waterInsolubleAnalysis);
    console.log(ingredientsList);

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

      if (waterInsolubleAnalysis.length > 0) {
        console.log("water insoluble");
          notCG = true;
          this.setState({waterInsolubleResults: waterInsolubleAnalysis
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

            <Button href="http://m.me/curlsbot">Message me</Button>
            <CardText></CardText>
        </Card>
   
      }




       
      </div>
      
    );
  }
}


export default Index;
