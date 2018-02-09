import React from 'react';
import ResultListing from '../components/resultlisting';


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
"steardimonium hydroxypropyl panthenyl peg-7 dimethicone phosphate chloride",
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
  
      console.log(badList);

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


class Ingredients extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      results: '',
      unknownSiliconeResults: '',
      badSiliconeResults: '',
      goodSiliconeResults: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  containsAny(source,target){
    let result = source.filter(
      function(item){ 
       return target.some(function(ff) { 
            return item.indexOf(ff) > -1;
      
         });
      
      });   
      
    if (result.length > 0){
      return result
    }
 }  

  contains(source,target){
    let result = source.filter(
      function(item){ 
       return target.some(function(ff) { 
            return item == ff;
      
         });
      
      });   
    if (result.length > 0){
      return result
    }
}  


 removeDupe(list, toRemove){
      var result = list.filter( function( el ) {
    return toRemove.indexOf( el ) < 0;

} );
    console.log(result);
}

 process(text){

    let notCG = false
    let unknownCG = false;
    let detectedSilicones = []

    let ingredientsList = text.split(',').map(x => x.trim().toLowerCase());

    let siliconeAnalysis= analysis(ingredientsList, siliconeList, goodSiliconeList, badSiliconeList)
    console.log(siliconeAnalysis);

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

    /*/// test for silicone
       var badSilicones = this.contains(ingredientsList, badSiliconeList); 
       var goodSilicones = this.contains(ingredientsList, goodSiliconeList); 

      if (goodSilicones) {
        detectedSilicones.push(goodSilicones);
          this.setState({goodSiliconeResults: goodSilicones});
      }
      if (badSilicones) {
          detectedSilicones.push(badSilicones);

          notCG = true;
          this.setState({badSiliconeResults: badSilicones
          });
      }


      var someUnknowns = this.removeDupe(ingredientsList, detectedSilicones);
      console.log(someUnknowns);
   */


    

    if (notCG) {
      this.setState({results: "not CG"});
    } else if (unknownCG) {
      this.setState({results: "unknown CG"});
    } else {
      this.setState({results: "CG"});
    }


  }


  handleChange(event) {
    this.setState({
      value: event.target.value,
      unknownSiliconeResults: '',
      badSiliconeResults: '',
      goodSiliconeResults: '',
      results: ''
    });
  }

  handleSubmit(event) {
   this.process(this.state.value);




   // event.preventDefault();
  }



  render() {

    return (
      <div>
        <FormGroup >
          <Label for="exampleText">Curlsbot Alpha!</Label>
          <Input type="textarea" name="text" id="exampleText" placeholder="Paste an ingredient list here" onChange={this.handleChange} />
          <Button onClick={this.handleSubmit}>Submit</Button>
        </FormGroup>

        <h2>Results</h2>
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
            <CardTitle>OK Siliciones</CardTitle>
            <CardSubtitle>These look like 'good silicones' because they are water soluble, they are perfectly OK:</CardSubtitle>
            <CardText><ResultListing list={this.state.goodSiliconeResults}/>}</CardText>
           </Card>
   
         }

        {this.state.unknownSiliconeResults.length > 0 &&
          <Card body outline color="warning">
            <CardTitle>Unknown Siliciones</CardTitle>
            <CardSubtitle>I don't know these silicones yet, i'll take a note and try to find out more about them. In the meantime you should do your own research:</CardSubtitle>
            <CardText>
                  <ResultListing list={this.state.unknownSiliconeResults}/>
            </CardText>
           </Card>
   
         }


      {this.state.results == "not CG" &&
        <Card body inverse color="danger">
            <CardTitle>Result: Not Curly Girl Approved</CardTitle>
           <CardText>My final verdict? Looks like this product is NOT curly girl approved.</CardText>
        </Card>
      }

      {this.state.results == "unknown CG" &&
        <Card body inverse color="warning">
            <CardTitle>Result: Unknown</CardTitle>
           <CardText>My final verdict? I can't say if this is approved or not, you'll need to do your own research by looking up the unknown ingredients and asking around.</CardText>
        </Card>
      }

      {this.state.results == "CG" &&
        <Card body inverse color="success">
            <CardTitle>Result: Curly Girl Approved</CardTitle>
           <CardText>Woohoo, I can't find anything wrong with this, looks like it's curly girl approved! But don't forget to read the label carefully and do a backup check yourself – ingredients listed online are not always accurate.</CardText>
        </Card>
      }


       
      </div>
      
    );
  }
}


export default Ingredients;
