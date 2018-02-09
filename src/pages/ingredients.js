import React from 'react'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

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




class Ingredients extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'Please write an essay about your favorite DOM element.',
      results: '',
      unknownSiliconeResults: '',
      badSiliconeResults: '',
      goodSiliconeResults: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  containsAny(source,target){
    var result = source.filter(
      function(item){ 
       return target.some(function(ff) { 
            return item.indexOf(ff) > -1;
      
         });
      
      });   
      
    if (result.length > 0){
      return result
    }
 }  


 process(text){

    let notCG = false
    let unknownCG = false;

    let ingredientsList = text.split(',').map(x => x.trim().toLowerCase());

    /// test for silicone
    let silicones = this.containsAny(ingredientsList, siliconeList);    

    if(silicones){
      let badSilicones = this.containsAny(ingredientsList, badSiliconeList); 
      let goodSilicones = this.containsAny(ingredientsList, goodSiliconeList); 
      if (goodSilicones) {
          this.setState({goodSiliconeResults: goodSilicones});
      }
      if (badSilicones) {
          notCG = true;
          this.setState({badSiliconeResults: badSilicones
          });
      }
      if(!badSilicones && !goodSilicones){
        unknownCG = true;
          this.setState({unknownSiliconeResults: silicones

          });

      }
    }


    if (notCG) {
      this.setState({results: "not CG"});
    } else if (unknownCG) {
      this.setState({results: "unknown CG"});
    } else {
      this.setState({results: " CG"});
    }


  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
   this.process(this.state.value);




   // event.preventDefault();
  }



  render() {

    return (
      <div>

        <FormGroup >
          <Label for="exampleText">Text Area</Label>
          <Input type="textarea" name="text" id="exampleText" value={this.state.value} onChange={this.handleChange} />

                  <Button onClick={this.handleSubmit}>Submit</Button>

        </FormGroup>
        {this.state.badSiliconeResults.length > 0 &&
            <div>This follow bad siliciones: {this.state.badSiliconeResults}</div>
   
      }

       {this.state.results}
       
      </div>
      
    );
  }
}


export default Ingredients;
